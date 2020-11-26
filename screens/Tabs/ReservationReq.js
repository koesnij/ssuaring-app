import React , { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import {StyleSheet, Image, ScrollView,FlatList, TouchableOpacity, TouchableWithoutFeedback, Platform,ToastAndroid,
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,} from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Button from '../../components/Button'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonMore from '../../components/ButtonMore';
import useInput from '../../hooks/useInput';
import { categoryConfig, periodConfig } from '../../screens/Tabs/NewPost/pickerConfig';
import RNPickerSelect from 'react-native-picker-select';


const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const TextInput = styled.TextInput`
  padding: 10px 0px;
  font-size: 16px;
  /* background-color: green; */
`;

const Text = styled.Text``;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems:'stretch'
  },
  Footer: {
      height: '100%',
      width:'100%',
      backgroundColor: '#ff0000',
   },
});

  const showToast = () => {
    ToastAndroid.show("예약이 완료되었습니다.", ToastAndroid.SHORT);
  };


export default ({ navigation }) => {
 const captionInput = useInput('');
  const priceInput = useInput('');
const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    //setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setShow(false);
    console.log(selectedDate)
  };
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

   const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
  <View style={styles.container}>
  <ScrollView  style={{ height:'100%',width:"100%",resizeMode:"stretch",backgroundColor:'white',alignContent:'center'}}>
    <Image
              style={{ height: 250,width:"100%",resizeMode:"stretch"}}
              source={{uri: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"}}/> 
    <Divider style={{ marginTop: 5, height: 5,backgroundColor:'#ffffff' }} />
    <Text style={{  marginLeft: 10, marginTop: 10,fontSize:22,fontWeight: 'bold'}}>캠핑 용품 빌려드립니다</Text>
   <Calendar
    markingType={'period'}
    markedDates={{
    '2020-11-15': {marked: true, dotColor: '#50cebb'},
    '2020-11-16': {marked: true, dotColor: '#50cebb'},
    '2020-11-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
    '2020-11-22': {color: '#70d7c7', textColor: 'white'},
    '2020-11-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
    '2020-11-24': {color: '#70d7c7', textColor: 'white'},
    '2020-11-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
  }}
  style={{ marginLeft:80,height: 330,width:'65%'}}
/>
 <Divider style={{ marginTop: 5, height: 0.4,backgroundColor:'#000000' }} />
<View style={{ flexDirection:'row' }}>
  <ButtonMore
  onPress={() =>  showDatepicker()} 
  style={{ align:'center'}}
  text="11-21 (목) 10:00"
/>
<Text style={{ marginTop:10,marginLeft: 140,fontSize:17,}}></Text>
  <ButtonMore
  onPress={() =>  showDatepicker()} 
  style={{ align:'center'}}
  text="11-25 (수) 10:00"
/>

 </View>
<Text style={{backgroundColor:'gray',marginTop:20, fontSize:24,color:'green',textAlign:'center'}}>총 3일 사용</Text> 

 <View style={{ flexDirection:'row' }}>
  <Text style={{marginLeft: -130,marginTop:10, fontSize:20,fontWeight:'bold'}}>예상 가격</Text>
  <Text style={{ marginTop:10,marginLeft:10,fontSize:17,}}></Text> 
 <TextInput
              style={{marginTop:10}}
              onChangeText={priceInput.onChange}
              value={priceInput.value}
              keyboardType="numeric"
              placeholder="가격 입력"
            />
            <Text style={{ marginTop:10,marginLeft:10,fontSize:17,}}> 원</Text>
 </View>

<Divider style={{ marginTop: 10, height: 0.4,backgroundColor:'#000000' }} />
<View style={{ flexDirection:'row' }}>
  <Text style={{marginLeft: -150,marginTop:10, fontSize:20,fontWeight:'bold'}}>대여 위치</Text>
 {/* <Text style={{ marginTop:10,marginLeft: 50,fontSize:17,}}>숭실대학교 정문</Text> */}
 <Text style={{ marginTop:10,marginLeft:10,fontSize:17,}}></Text> 
  <TextInput
            style={{marginTop:10}}
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            multiline={true}
            placeholder="위치 입력"
          />
 </View>
 <View>
   {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
</View>
<Divider style={{ marginTop: 10, height: 0.4,backgroundColor:'#000000' }} />
 <View>
<Button style={{ marginTop:20,marginLeft:100, width: 100, height: 100,}} text="예약 신청" onPress={() =>   showToast()}/>
 </View>
  </ScrollView>
</View>
);
};
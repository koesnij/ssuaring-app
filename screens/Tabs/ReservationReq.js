import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/Button';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonMore from '../../components/ButtonMore';
import useInput from '../../hooks/useInput';

import Loader from '../../components/Loader';
import constants from '../../constants';
import styles from '../../styles';

const View = styled.View`
  background-color: white;
  flex: 1;
`;

const ReservationMainArea = styled.View`
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const PostTitle = styled.Text`
  padding: 10px;
  font-size: 22;
  font-weight: bold;
`;
const Period = styled.View`
  padding: 3px;
  align-items: center;
  background-color: ${styles.lightGreyColor};
`;
const PeriodText = styled.Text`
  font-size: 17;
  font-weight: 500;
  color: ${styles.blueColor};
`;

const ReservationMeta = styled.View`
  flex-direction: ${(props) => props.type || 'row'};
  align-items: ${(props) =>
    props.type === 'column' ? 'flex-start' : 'center'};
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const MetaTitle = styled.Text`
  font-size: 17;
  font-weight: 600;
  padding: 12px;
`;
const MetaContent = styled.Text`
  font-size: 16;
  font-weight: 400;
  padding: 0px 15px;
`;
const Space = styled.View`
  height: 20px;
`;

const Footer = styled.View`
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 85px;
  padding-bottom: 20px;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const {
    otherParams: { title, area, caption, price, files },
  } = route.params;

  const captionInput = useInput('');
  const priceInput = useInput('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    //setShow(Platform.OS === 'ios');
    if (event.type == 'set') {
      setShow(false);
      if (btntype == 'startingDay') {
        startingDay = selectedDate;
      }
    } else if (event.type == 'dismissed') {
      setShow(true);
    } else {
      setDate(currentDate);
    }
    //setShow(false);
    //changeText(selectedDate);
    console.log(selectedDate);
    console.log(event);
  };
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  var startingDay = '11-21 (목)';
  var startingTime = '10:00';
  var endingDay = '11-21 (목)';
  var endingTime = '10:00';
  var btntype = '';

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

  const loading = false;

  const handleReserve = () => {
    Toast.show({ topOffset: 50, text1: '예약 신청이 완료되었습니다.' });
  };
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <Image
              style={{
                height: constants.width,
                width: '100%',
                resizeMode: 'cover',
                backgroundColor: styles.lightGreyColor,
              }}
              source={{ uri: files[0].url }}
            />
            <ReservationMainArea>
              <PostTitle>{title}</PostTitle>
              <Calendar
                markingType={'period'}
                markedDates={{
                  '2020-11-15': { marked: true, dotColor: '#50cebb' },
                  '2020-11-16': { marked: true, dotColor: '#50cebb' },
                  '2020-11-21': {
                    startingDay: true,
                    color: '#50cebb',
                    textColor: 'white',
                  },
                  '2020-11-22': { color: '#70d7c7', textColor: 'white' },
                  '2020-11-23': {
                    color: '#70d7c7',
                    textColor: 'white',
                    marked: true,
                    dotColor: 'white',
                  },
                  '2020-11-24': { color: '#70d7c7', textColor: 'white' },
                  '2020-11-25': {
                    endingDay: true,
                    color: '#50cebb',
                    textColor: 'white',
                  },
                }}
                style={{ marginLeft: 80, height: 330, width: '65%' }}
              />
              <View style={{ flexDirection: 'row' }}>
                <ButtonMore
                  onPress={() => {
                    showDatepicker(), (btntype = 'startingDay');
                  }}
                  style={{ align: 'center' }}
                  text={startingDay}
                />
                <Text
                  style={{ marginTop: 10, marginLeft: 140, fontSize: 17 }}
                ></Text>
                <ButtonMore
                  onPress={() => {
                    showDatepicker(), (btntype = 'endingDay');
                  }}
                  style={{ align: 'center' }}
                  text={endingDay}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <ButtonMore
                  onPress={() => {
                    showTimepicker(), (btntype = 'startingTime');
                  }}
                  style={{ align: 'center' }}
                  text={startingTime}
                />
                <Text
                  style={{ marginTop: 0, marginLeft: 140, fontSize: 17 }}
                ></Text>
                <ButtonMore
                  onPress={() => {
                    showTimepicker(), (btntype = 'endingTime');
                  }}
                  style={{ align: 'center' }}
                  text={endingTime}
                />
              </View>
              <Period>
                <PeriodText>총 3일 사용</PeriodText>
              </Period>
            </ReservationMainArea>
            <ReservationMeta>
              <MetaTitle>예상 가격</MetaTitle>
              <MetaContent>{price} 원</MetaContent>
            </ReservationMeta>
            <ReservationMeta>
              <MetaTitle>대여 지역</MetaTitle>
              <MetaContent>{area}</MetaContent>
            </ReservationMeta>
            <ReservationMeta type="column">
              <MetaTitle>대여 주의사항</MetaTitle>
              <MetaContent>{caption}</MetaContent>
              <Space />
            </ReservationMeta>
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
          </ScrollView>
          <Footer>
            <Button onPress={handleReserve} text="예약 신청" size={340} />
          </Footer>
        </>
      )}
    </View>
  );
};

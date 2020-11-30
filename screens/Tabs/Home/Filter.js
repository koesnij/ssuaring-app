import React, { useEffect,Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
import RNPickerSelect from 'react-native-picker-select';
import usePicker from '../../../hooks/usePicker'
import { categoryConfig, periodConfig , filterConfig} from '../../../screens/Tabs/NewPost/pickerConfig';

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  console.log(navigation);
  useEffect(() => {
    return () => navigation.setParams({ filter: '카테고리' });
  }, []);
  const categoryPicker = usePicker(null);
  return (
    <View style={{ height:'100%',width:"100%",resizeMode:"stretch",backgroundColor:'white',alignContent:'center'}}>
       <RNPickerSelect {...categoryPicker} {...filterConfig} />
        <RNPickerSelect {...categoryPicker} {...categoryConfig} />
    </View>
  );
};

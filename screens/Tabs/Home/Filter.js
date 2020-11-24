import React, { useEffect,Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
//import { CheckBox } from 'react-native-elements'
//import CheckBox from '../../components/CheckBox'

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

  return (
    <View>
        {/* <CheckBox></CheckBox> */}
    </View>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const phoneNumberInput = useInput('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { value } = phoneNumberInput;
    if (value === '') {
      return Alert.alert('전화번호를 입력하세요.');
    }
    try {
      setLoading(true);
      // const {
      //   data: { requestSecret },
      // } = await requestSecretMutation();
      // if (requestSecret) {
      if (true) {
        navigation.navigate('Confirm');
        return;
      }
    } catch (e) {
      Alert.alert("Can't log in.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Input
          {...phoneNumberInput} /*value랑 onChange를 리턴함*/
          placeholder="전화번호 입력"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
          keyboardType="numeric"
        />
        <Button onPress={handleLogin} text="인증문자 받기" />
      </View>
    </TouchableWithoutFeedback>
  );
};

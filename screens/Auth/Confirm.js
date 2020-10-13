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

export default () => {
  const confirmInput = useInput('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === '') {
      return Alert.alert('인증번호를 입력하세요.');
    }
    try {
      // setLoading(true);
      // const {
      //   data: { confirmSecret },
      // } = await confirmSecretMutation();
      // if (confirmSecret) {
      //   logIn(confirmSecret);
      // } else {
      //   Alert.alert('Wrong Secret!');
      // }
      if (true) {
        // navigation.navigate('Confirm');
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
          {...confirmInput} /*value랑 onChange를 리턴함*/
          placeholder="인증번호 입력"
          onSubmitEditing={handleConfirm}
          keyboardType="numeric"
          autoCapitalize="none"
        />
        <Button onPress={handleConfirm} text="시작하기" />
      </View>
    </TouchableWithoutFeedback>
  );
};

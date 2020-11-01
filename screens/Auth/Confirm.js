import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';
import { useLogIn } from '../../AuthContext';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Title = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;
const Form = styled.View`
  flex: 2;
  align-items: center;
  justify-content: flex-start;
`;
const Text = styled.Text`
  font-size: 24px;
`;

export default () => {
  const confirmInput = useInput('');
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === '') {
      return Alert.alert('인증번호를 입력하세요.');
    }
    try {
      setLoading(true);
      // const {
      //   data: { confirmSecret },
      // } = await confirmSecretMutation();
      // if (confirmSecret) {
      logIn();
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
        <Title>
          <Text>메시지를 확인하세요</Text>
        </Title>
        <Form>
          <Input
            {...confirmInput} /*value랑 onChange를 리턴함*/
            placeholder="인증번호 입력"
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <Button
            disabled={confirmInput.length < 6 || confirmInput.length > 7}
            loading={loading}
            onPress={handleConfirm}
            text="시작하기"
          />
        </Form>
      </View>
    </TouchableWithoutFeedback>
  );
};

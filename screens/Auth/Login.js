import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';
import { LOG_IN } from './AuthQueries';

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

export default ({ navigation }) => {
  const phoneInput = useInput('01020867353');
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { phoneNumber: phoneInput.value },
  });

  const handleLogin = async () => {
    const { value } = phoneInput;
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      if (requestSecret) {
        navigation.navigate('Confirm', { phoneNumber: value });
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
          <Text>전화번호를 인증하세요</Text>
        </Title>
        <Form>
          <Input
            {...phoneInput} /*value랑 onChange를 리턴함*/
            placeholder="전화번호 입력"
            autoCorrect={false}
            keyboardType="numeric"
          />
          <Button
            disabled={phoneInput.length < 10 || phoneInput.length > 11}
            loading={loading}
            onPress={handleLogin}
            text="인증문자 받기"
          />
        </Form>
      </View>
    </TouchableWithoutFeedback>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';
import { LOG_IN } from './AuthQueries';
import Toast from 'react-native-toast-message';

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
  const phoneInput = useInput('');
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
        Toast.show({
          topOffset: 50,
          text1: '인증번호 전송 완료!',
          text2: '메시지함을 확인해주세요.',
        });
        navigation.navigate('Confirm', { phoneNumber: value });
        return;
      }
    } catch (e) {
      Alert.alert('에러!');
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
            placeholder="핸드폰번호 입력"
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

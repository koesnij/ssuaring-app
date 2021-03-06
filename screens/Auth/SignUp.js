/**
 * 입력 안했을 때,
 * 이메일, 닉네임 중복 등 처리 필요
 */
import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';

import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { CREATE_ACCOUNT } from './AuthQueries';
import { useMutation } from 'react-apollo-hooks';
import { useLogIn } from '../../AuthContext';
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

export default ({ route }) => {
  const phoneNumber = route.params?.phoneNumber;

  const phoneInput = useInput(phoneNumber);
  const nameInput = useInput('');
  const nicknameInput = useInput('');
  const emailInput = useInput('');
  const areaInput = useInput('');

  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      phoneNumber,
      name: nameInput.value,
      nickname: nicknameInput.value,
      email: emailInput.value,
      area: '-',
    },
  });

  const logIn = useLogIn();
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        console.log(createAccount);
        if (createAccount === false) {
          Alert.alert('중복되는 항목이 있습니다.');
        } else {
          Toast.show({
            topOffset: 50,
            text1: '회원가입 성공!',
            text2: '지역 설정 화면으로 이동합니다.',
          });
          logIn(createAccount);
        }
      } else {
        Alert.alert('에러!');
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
        <KeyboardAvoidingView behavior="padding">
          <Title>
            <Text>회원가입이 필요합니다</Text>
          </Title>
          <Form>
            <Input
              {...phoneInput} /*value랑 onChange를 리턴함*/
              placeholder="전화번호 입력"
              autoCorrect={false}
              keyboardType="numeric"
              editable={false}
            />
            <Input
              {...nameInput} /*value랑 onChange를 리턴함*/
              placeholder="이름 입력"
              returnKeyType="next"
            />
            <Input
              {...nicknameInput} /*value랑 onChange를 리턴함*/
              placeholder="별명 입력"
              returnKeyType="next"
            />
            <Input
              {...emailInput} /*value랑 onChange를 리턴함*/
              placeholder="이메일 입력"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Button loading={loading} onPress={handleSignUp} text="회원가입" />
          </Form>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

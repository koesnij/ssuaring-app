import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { CREATE_ACCOUNT } from './AuthQueries';
import { useMutation } from '@apollo/react-hooks';
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

export default ({ route }) => {
  const phoneNumber = route.params?.phoneNumber;

  const phoneInput = useInput(phoneNumber);
  const nameInput = useInput('문진석');
  const nicknameInput = useInput('moonzzin');
  const emailInput = useInput('m_jinseok@naver.com');
  const areaInput = useInput('서울');

  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      phoneNumber,
      name: nameInput.value,
      nickname: nicknameInput.value,
      email: emailInput.value,
      area: areaInput.value,
    },
  });

  const logIn = useLogIn();
  const handleSignUp = async () => {
    /** 입력 안 했을 때 처리 */

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
        <Title>
          <Text>회원가입이 필요합니다</Text>
        </Title>
        <Form>
          <Input
            {...phoneInput} /*value랑 onChange를 리턴함*/
            placeholder="전화번호 입력"
            autoCorrect={false}
            keyboardType="numeric"
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
          <Input
            {...areaInput} /*value랑 onChange를 리턴함*/
            placeholder="지역 선택"
            autoCorrect={false}
            returnKeyType="done"
          />
          <Button loading={loading} onPress={handleSignUp} text="회원가입" />
        </Form>
      </View>
    </TouchableWithoutFeedback>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

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
  const phoneInput = useInput(navigation.getParam('phone', ''));
  const nameInput = useInput('');
  const nicknameInput = useInput('');
  const emailInput = useInput('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => null;

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            returnKeyType="done"
          />
          <Button
            disabled={phoneInput.length < 10 || phoneInput.length > 11}
            loading={loading}
            onPress={handleSignUp}
            text="회원가입"
          />
        </Form>
      </TouchableWithoutFeedback>
    </View>
  );
};

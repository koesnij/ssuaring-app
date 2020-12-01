import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';
import Input from '../../components/Input';
import { Header, HeaderLink } from '../../components/HeaderItem';
import constants from '../../constants';
// import { gql, useMutation } from '@apollo/react-hooks';
import useInput from '../../hooks/useInput';
import styles from '../../styles';

const View = styled.View`
  flex: 1;
  padding: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
`;
const Title = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 20px;
`;
const Container = styled.View`
  /* background-color: red; */
  flex: 4;
`;
const Text = styled.Text`
  font-size: 26px;
  font-weight: 300;
  padding: 2px 0px;
`;
const Caution = styled.Text`
  font-size: 14px;
  color: ${styles.darkGreyColor};
  font-weight: 300;
  padding: 60px 0px;
  align-self: center;
`;

// const UPLOAD_REPORT = gql``;

export default ({ navigation, route }) => {
  const { type, user, post, chat } = route.params;
  let headerTitle;
  let subTitle;
  if (type === 'user') {
    headerTitle = '사용자 신고하기';
    subTitle = '해당 사용자를 🚨';
  } else if (type === 'post') {
    headerTitle = '게시물 신고하기';
    subTitle = '해당 게시물을 🚨';
  } else {
    headerTitle = '채팅 신고하기';
    subTitle = '해당 채팅방을 🚨';
  }

  const textInput = useInput('');
  const [loading, setLoading] = useState(false);
  //   const [uploadReportMutation] = useMutation(UPLOAD_REPORT);

  const handleSubmit = () => {
    Alert.alert(
      headerTitle,
      //   '이대로 제출하시겠습니까?',
      '신고사유가 올바르지 않을 경우,\n해당 신고는 처리되지 않습니다.',
      [
        {
          text: '취소',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: '제출',
          onPress: uploadReport,
        },
      ]
    );
  };

  const uploadReport = async () => {
    console.log('uploadReport');
    try {
      setLoading(true);
      //   const {
      //     data: { uploadReport },
      //   } = await uploadReportMutation({
      //     variables: {
      //       text: textInput.value,
      //     },
      //   });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerRight: () => (
        <Header>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <HeaderLink str={'제출'} onPress={handleSubmit} />
          )}
        </Header>
      ),
    });
  }, [navigation, loading]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <View>
          <Title>
            <Text>{subTitle}</Text>
            <Text>신고하는 이유를 알려주세요. </Text>
          </Title>
          <Container>
            <Input
              height={300}
              width={constants.width - 40}
              multiline={true}
              {...textInput}
            />
          </Container>

          {/* {'신고사유가 올바르지 않을 경우,\n해당 신고는 처리되지 않습니다.'} */}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

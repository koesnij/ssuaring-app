import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Keyboard, KeyboardAvoidingView, Picker } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import styles from '../../../styles';
import TabIcon from '../../../components/TabIcon';
import useInput from '../../../hooks/useInput';
import usePicker from '../../../hooks/usePicker';
import pickerConfig from './pickerConfig';
import { Header, HeaderLink } from '../../../components/HeaderItem';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const MainArea = styled.ScrollView`
  flex: 10;
`;

const Row = styled.View`
  justify-content: center;
  /* background-color: red; */
  height: 70px;
  margin: 0px 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const CaptionContainer = styled.View`
  flex: 1;
  /* justify-content: flex-end; */
  margin: 20px 12px;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 15px;
  padding-top: 7px;
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
`;

const UPLOAD_POST = gql`
  mutation uploadPost(
    $area: String!
    $title: String!
    $caption: String!
    $price: String!
    $files: [String!]!
  ) {
    uploadPost(
      area: $area
      title: $title
      caption: $caption
      price: $price
      files: $files
    ) {
      id
    }
  }
`;

export default ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Header>
          <HeaderLink str={'완료'} onPress={handleUpload} />
        </Header>
      ),
    });
  }, [navigation]);

  const titleInput = useInput('');
  const priceInput = useInput('');
  const captionInput = useInput('');
  const categoryPicker = usePicker(null);

  const [loading, setLoading] = useState(false);
  const [uploadPostMutation] = useMutation(UPLOAD_POST);

  const handleUpload = async () => {
    console.log('upload');
    try {
      setLoading(true);
      const {
        data: { uploadPost },
      } = await uploadPostMutation({
        variables: {
          area: '서울',
          title: '테스트123',
          caption: '헬로 Hello World',
          price: '1000',
          files: [
            'http://www.hyulimbook.co.kr/files/attach/images/645103/142/746/d36b1201eef214657245b52032f658d8.jpg',
          ],
        },
      });
      console.log(uploadPost);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <MainArea>
        <Row>
          <Text>이미지 선택</Text>
        </Row>
        <Row>
          <TextInput
            onChangeText={titleInput.onChange}
            value={titleInput.value}
            placeholder={'제목 입력'}
            onSubmitEditing={() => categoryPicker.onValueChange(1)}
          />
        </Row>
        <Row>
          <RNPickerSelect {...categoryPicker} {...pickerConfig} />
        </Row>
        <Row>
          <TextInput
            onChangeText={priceInput.onChange}
            value={priceInput.value}
            keyboardType="numeric"
            placeholder="가격 입력"
          />
        </Row>
        <CaptionContainer>
          <TextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            multiline={true}
            placeholder={'설명 입력'}
          />
        </CaptionContainer>
      </MainArea>
      <Footer>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TabIcon name="arrow-down" />
        </TouchableWithoutFeedback>
      </Footer>
    </KeyboardAvoidingView>
  );
};
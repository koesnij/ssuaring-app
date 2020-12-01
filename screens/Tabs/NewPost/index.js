import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

import styles from '../../../styles';
import options, { ServerURI } from '../../../apollo';
import TabIcon from '../../../components/TabIcon';
import useInput from '../../../hooks/useInput';
import usePicker from '../../../hooks/usePicker';
import { categoryConfig, periodConfig } from './pickerConfig';
import { Header, HeaderLink } from '../../../components/HeaderItem';
import { SEEALLPOST } from '../PostDetailQueries';

const MainArea = styled.ScrollView`
  flex: 10;
`;

const Row = styled.View`
  align-items: center;
  /* background-color: red; */
  height: 70px;
  margin: 0px 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
  flex-direction: row;
`;

const Column = styled.View`
  padding-right: 5px;
  flex-direction: row;
  align-items: center;
  /* padding: 5px; */
  /* background-color: red; */
`;

const CaptionContainer = styled.View`
  flex: 1;
  margin: 20px 12px;
`;

const TextInput = styled.TextInput`
  padding: 10px 0px;
  font-size: 16px;
  /* background-color: green; */
`;

const Touchable = styled.TouchableOpacity``;

const Text = styled.Text`
  padding: 10px 0px;
  /* background-color: red; */
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
    $category: Int!
    $caption: String!
    $price: String!
    $period: Int!
    $files: [String!]!
  ) {
    uploadPost(
      area: $area
      title: $title
      category: $category
      caption: $caption
      price: $price
      period: $period
      files: $files
    ) {
      id
    }
  }
`;

export default ({ navigation }) => {
  const titleInput = useInput('');
  const priceInput = useInput('');
  const captionInput = useInput('');
  const categoryPicker = usePicker(null);
  const periodPicker = usePicker(null);

  const [img, setImg] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadPostMutation] = useMutation(UPLOAD_POST, {
    refetchQueries: () => [{ query: SEEALLPOST }],
  });

  const pickImage = async () => {
    try {
      setImgLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log(result.uri);
        setImg(result.uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImgLoading(false);
    }
  };

  const recommendCategory = async () => {
    if (titleInput.value === '') {
      Alert.alert('제목을 입력하세요');
    } else {
      try {
        setCategoryLoading(true);
        const { data } = await axios.get(`${ServerURI}/api/recommender`, {
          params: { title: titleInput.value },
        });
        console.log(data);
        if (data.accuracy > 0.5) {
          categoryConfig.items.forEach((item) => {
            if (item.label === data.title) {
              categoryPicker.onValueChange(item.value);
            }
          });
        } else {
          categoryPicker.onValueChange(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCategoryLoading(false);
      }
    }
  };

  const handleSubmit = () => {
    Alert.alert('게시물 업로드', '게시물을 이대로 제출하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '승인',
        onPress: uploadPost,
      },
    ]);
  };

  const uploadPost = async () => {
    if (
      img === null ||
      titleInput.value === '' ||
      priceInput.value === '' ||
      captionInput.value === '' ||
      categoryPicker.value === null ||
      periodPicker.value === null
    ) {
      console.log(
        img,
        titleInput.value,
        priceInput.value,
        captionInput.value,
        categoryPicker.value,
        periodPicker.value
      );
      Alert.alert('모든 항목을 입력해야 합니다.');
    } else {
      const formData = new FormData();
      formData.append('file', { name: 'postImage', type: 'jpg', uri: img });
      try {
        setSubmitLoading(true);
        const {
          data: { location },
        } = await axios.post(`${ServerURI}/api/upload`, formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });
        const {
          data: { uploadPost },
        } = await uploadPostMutation({
          variables: {
            area: '서울',
            title: titleInput.value,
            category: Number(categoryPicker.value),
            caption: captionInput.value,
            price: priceInput.value,
            period: Number(periodPicker.value),
            files: [location],
          },
        });
        if (uploadPost.id) {
          navigation.navigate('TabNavigation');
        }
        console.log(uploadPost);
      } catch (e) {
        Alert.alert('Cannot Upload', 'Try later.');
        console.log(e);
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Header>
          {submitLoading ? (
            <ActivityIndicator />
          ) : (
            <HeaderLink str={'완료'} onPress={handleSubmit} />
          )}
        </Header>
      ),
    });
  }, [
    navigation,
    img,
    submitLoading,
    titleInput.value,
    priceInput.value,
    captionInput.value,
    categoryPicker.value,
  ]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <MainArea>
        <Row>
          <Touchable onPress={pickImage}>
            {img === null ? (
              imgLoading ? (
                <ActivityIndicator />
              ) : (
                <Text>이미지 선택</Text>
              )
            ) : (
              <Image
                source={{ uri: img }}
                style={{
                  height: 60,
                  width: 60,
                  marginRight: 30,
                  borderRadius: 10,
                }}
              />
            )}
          </Touchable>
        </Row>
        <Row>
          <TextInput
            onChangeText={titleInput.onChange}
            value={titleInput.value}
            placeholder="제목 입력"
            onSubmitEditing={recommendCategory}
          />
        </Row>
        <Row>
          {categoryLoading ? (
            <ActivityIndicator />
          ) : (
            <RNPickerSelect {...categoryPicker} {...categoryConfig} />
          )}
        </Row>
        <Row>
          <Column>
            <RNPickerSelect {...periodPicker} {...periodConfig} />
            <Text> 당 </Text>
          </Column>
          <Column>
            <TextInput
              onChangeText={priceInput.onChange}
              value={priceInput.value}
              keyboardType="numeric"
              placeholder="가격 입력"
            />
            <Text> 원</Text>
          </Column>
        </Row>
        <CaptionContainer>
          <TextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            multiline={true}
            placeholder="설명 입력"
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

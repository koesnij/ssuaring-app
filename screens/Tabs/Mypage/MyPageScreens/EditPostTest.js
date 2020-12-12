import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

import styles from "../../../../styles";
import options, { ServerURI } from "../../../../apollo";
import TabIcon from "../../../../components/TabIcon";
import useInput from "../../../../hooks/useInput";
import usePicker from "../../../../hooks/usePicker";
import { categoryConfig, periodConfig } from "../../NewPost/pickerConfig";
import { Header, HeaderLink } from "../../../../components/HeaderItem";
import { SEEALLPOST } from "../../PostDetailQueries";
import { EDIT_POST, ME } from "../MyPageQueries";

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

export default ({ route, navigation }) => {
  const {
    otherParams: { id, title, price, caption, period, category },
  } = route.params;

  const titleInput = useInput(title);
  const priceInput = useInput(price);
  const captionInput = useInput(caption);
  const categoryPicker = usePicker(null);
  const periodPicker = usePicker(null);

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [editPostMutation] = useMutation(EDIT_POST, {
    refetchQueries: () => [{ query: [SEEALLPOST, ME] }],
  });

  const recommendCategory = async () => {
    if (titleInput.value === "") {
      Alert.alert("제목을 입력하세요");
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

  const handleSubmit = async () => {
    Alert.alert("게시물 업데이트", "게시물을 이대로 업데이트?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "승인",
        onPress: editPostHandler,
      },
    ]);
  };
  const editPostHandler = async () => {
    if (
      titleInput.value === "" ||
      priceInput.value === "" ||
      captionInput.value === "" ||
      categoryPicker.value === null ||
      periodPicker.value === null
    ) {
      console.log(
        titleInput.value,
        priceInput.value,
        captionInput.value,
        categoryPicker.value,
        periodPicker.value
      );
      Alert.alert("모든 항목을 입력해야 합니다.");
    } else {
      try {
        setSubmitLoading(true);

        const {
          data: { editedPost },
        } = await editPostMutation({
          variables: {
            id: id,
            title: titleInput.value,
            category: Number(categoryPicker.value),
            caption: captionInput.value,
            price: priceInput.value,
            period: Number(periodPicker.value),
          },
        });
        if (editedPost.title) {
          navigation.navigate("MyPage");
        }
        console.log(editedPost);
      } catch (e) {
        Alert.alert("Cannot Update", "Try later.");
        console.log(e);
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Header>
          {submitLoading ? (
            <ActivityIndicator />
          ) : (
            <HeaderLink str={"완료"} onPress={handleSubmit} />
          )}
        </Header>
      ),
    });
  }, [
    navigation,
    submitLoading,
    titleInput.value,
    priceInput.value,
    captionInput.value,
    categoryPicker.value,
  ]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <MainArea>
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

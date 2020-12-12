import React, { useEffect } from "react";
import { FlatList, Image, ScrollView, StyleSheet } from "react-native";
import styled from "styled-components";

import { useMutation } from "react-apollo-hooks";
import { EDIT_POST, ME } from "../MyPageQueries";
import Input from "../../../../components/Input";
import useInput from "../../../../hooks/useInput";
import Button from "../../../../components/Button";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


export default ({ route, navigation }) => {
  const {
    otherParams: { id, title, price, caption, period, category },
  } = route.params;
  console.log(id, title, price, caption, period, category);
  const titleInput = useInput(title);
  const priceInput = useInput(price);
  const captionInput = useInput(caption);

  const [editPostMutation] = useMutation(EDIT_POST, {
    variables: {
      id,
      title: titleInput.value,
      price: priceInput.value,
      caption: captionInput.value,
    },
    refetchQueries: () => [{ query: ME }],
  });
  const editPostCheckOut = async () => {
    try {
      const {
        data: { editPost },
      } = await editPostMutation();
      if (editPost) {
        navigation.navigate("MyPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Input {...titleInput} placeholder={"title"} />
      <Input {...priceInput} placeholder={"price"} />
      <Input {...captionInput} placeholder={"caption"} />
      <Button onPress={() => editPostCheckOut()} text="완료" />
    </View>
  );
};

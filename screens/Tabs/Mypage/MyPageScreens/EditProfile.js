import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { ME } from "../MyPageQueries";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import useInput from "../../../../hooks/useInput";
import { EDIT_PROFILE } from "../MyPageQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Container = styled.TouchableOpacity`
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: ${(props) => props.size};
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  const nameInput = useInput(user.name);
  const nicknameInput = useInput(user.nickname);

  const [editUserMutation] = useMutation(EDIT_PROFILE, {
    variables: {
      id: user.id,
      name: nameInput.value,
      nickname: nicknameInput.value,
    },
    refetchQueries: ()=>[{query:ME}],
  });


  const editProfileCheckOut = async () => {
    try {
      const {
        data: { editUser },
      } = await editUserMutation();
      if (editUser ) {
        navigation.navigate("MyPage");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <Container>
        <Text>이름</Text>
        <Input {...nameInput} placeholder={"name"} />
      </Container>
      <Container>
        <Text>닉네임</Text>
        <Input {...nicknameInput} placeholder={"nickname"}/>
      </Container>
      <Button onPress={() => editProfileCheckOut()} text="완료" />
    </ScrollView>
  );
};

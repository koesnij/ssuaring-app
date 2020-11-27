import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { ME } from "..";
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
  const [realUser, setRealUser] = useState(user);
  const nameInput = useInput(user.name);
  const nicknameInput = useInput(user.nickname);

  const [editUserMutation] = useMutation(EDIT_PROFILE, {
    refetchQueries: ()=>[{query:ME}],
    variables: {
      id: user.id,
      name: nameInput.value,
      nickname: nicknameInput.value,
    },
  });

  useEffect(() => {
    console.log(nameInput.value);
  }, [nameInput]); ///useEffect로 변할때마다 확인
  const editProfileCheckOut = async () => {
    try {
      const {
        data: { editUser },
      } = await editUserMutation();
      console.log("edit profile check out");
      if (editUser) {
        navigation.navigate("MyPage");
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <Container>
        <Text>이름</Text>
        <Input {...nameInput} />
      </Container>
      <Container>
        <Text>닉네임</Text>
        <Input {...nicknameInput} />
      </Container>
      <Button onPress={() => editProfileCheckOut()} text="완료" />
    </ScrollView>
  );
};

import React, { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import { useLogOut } from "../../../AuthContext";
import { Header, HeaderLink } from "../../../components/HeaderItem";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../../fragment";

const View = styled.View`
  align-items: center;
  flex: 1;
`;

const Container = styled.TouchableOpacity`
  width: 100%;
  flex: 0.1;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const Text = styled.Text``;

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({name}) => {
  return (
    <View>
      <Container>
        <Button
          onPress={() => navigation.navigate("MyProfile")}
          text="프로필 보기"
        />
      </Container>
      <Container onPress={() => navigation.navigate("MyLikes")}>
        <Text>{name}</Text>
      </Container>
      <Container onPress={() => navigation.navigate("MyPosts")}>
        <Text>내 게시물</Text>
      </Container>
      <Container onPress={() => navigation.navigate("MyArea")}>
        <Text>내 지역</Text>
      </Container>

      <Button onPress={handler} text="Log Out" />
    </View>
  );
};

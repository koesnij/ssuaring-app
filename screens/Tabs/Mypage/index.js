import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import { useLogOut } from "../../../AuthContext";
import { Header, HeaderLink } from "../../../components/HeaderItem";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    nickname
    phoneNumber
    loginSecret
    area
    avatar
    email
    areaAuth
    searchHistory
    penalty
    rooms
    posts
    likes
    tradeHistory
    reviews
    createdAt
    updatedAt
    isDeleted
    postsCount
  }
`;
export const ME = gql`
  {
    me {
      name
    }
  }
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);
  const logOut = useLogOut();
  const handler = () => {
    logOut();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Header>
            <HeaderLink
              str={"필터"}
              onPress={() => navigation.navigate("Filter")}
            />
            <HeaderLink
              str={"지도"}
              onPress={() => navigation.navigate("Map")}
            />
          </Header>
        );
      },
      headerTitle: "동작구",
      headerRight: () => {
        return (
          <Header>
            <HeaderLink
              str={"필터"}
              onPress={() => navigation.navigate("Filter")}
            />
            <HeaderLink
              str={"지도"}
              onPress={() => navigation.navigate("Map")}
            />
          </Header>
        );
      },
    });
  }, [navigation]);
  return (
    <ScrollView>
      {loading ? (
        <View>
          <Text>hi</Text>
        </View>
      ) : (
        data &&
        data.me && (
          <View>
            <Container>
              <Button
                onPress={() => navigation.navigate("MyProfile")}
                text="프로필 보기"
              />
            </Container>
            <Container onPress={() => navigation.navigate("MyLikes")}>
              <Text>{data.me.name}</Text>
            </Container>
            <Container onPress={() => navigation.navigate("MyPosts")}>
              <Text>내 게시물</Text>
            </Container>
            <Container onPress={() => navigation.navigate("MyArea")}>
              <Text>내 지역</Text>
            </Container>

            <Button onPress={handler} text="Log Out" />
          </View>
        )
      )}
    </ScrollView>
   
  );
};

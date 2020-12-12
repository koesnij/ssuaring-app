import React, { useEffect } from "react";
import styled from "styled-components";
import { ScrollView, FlatList } from "react-native";
import { Image } from "react-native";
import { defaultimage } from "../../../../constants";
import PostEditItem from "../../../../components/PostEditItem";

export const Text = styled.Text`
  font-size: 12px;
  font-weight: 500;
  height: 33%;
`;
export const TitleText = styled.Text`
  font-size: 24px;
  height: 33%;
`;
export const Container = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: ${(props) => (props ? props.height : 100)};
`;

const ScrollViewTest = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  const { posts } = user;
  return (
    <ScrollViewTest>
      {posts ? (
        <FlatList
          data={posts}
          refreshControl
          renderItem={({ item }) => <PostEditItem item={item} />}
        />
      ) : (
        <Container>
          <Text>아직 게시글을 안 쓰셨군요</Text>
        </Container>
      )}
    </ScrollViewTest>
   
  );
};
////PostEditItem을 이용해서 출력.
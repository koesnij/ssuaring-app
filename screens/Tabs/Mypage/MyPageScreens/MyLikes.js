import React, { useEffect } from "react";
import { FlatList, Image, ScrollView, StyleSheet } from "react-native";
import styled from "styled-components";
import { defaultimage } from "../../../../constants";
import {
  TextContainer,
} from "../MyPageScreens/MyPosts";
import PostItem from "../../../../components/PostItem"

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
    otherParams: {
      user: { likes },
    },
  } = route.params;
  return (
    <ScrollViewTest>
      {likes ? (
        <FlatList
          data={likes}
          refreshControl
          renderItem={({ item }) => <PostItem item={item.post} />}
        />
      ) : (
        <Container>
          <Text>아직 게시글을 안 쓰셨군요</Text>
        </Container>
      )}
    </ScrollViewTest>
  );
  // return likes ? (
  //   <ScrollView>
  //     {likes.map((like) => (
  //       <Container height={100}>
  //         {like.post.files[0] ? (
  //           <Image
  //             style={imageStyles.image}
  //             source={{ uri: like.post.files[0].url }}
  //           />
  //         ) : (
  //           <Image style={imageStyles.image} source={{ uri: defaultimage }} />
  //         )}

  //         <TextContainer>
  //           <TitleText>{like.post.title}</TitleText>
  //           <Text>기간당{like.post.price}원</Text>
  //         </TextContainer>
  //       </Container>
  //     ))}
  //   </ScrollView>
  // ) : (
  //   <View>
  //     <Text>loading</Text>
  //   </View>
  // );
};

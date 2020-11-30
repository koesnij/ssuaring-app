import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import styled from "styled-components";
import { defaultimage } from "../../../../constants";
import {
  Container,
  Text,
  TitleText,
  TextContainer,
} from "../MyPageScreens/MyPosts";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const imageStyles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
export default ({ route, navigation }) => {
  const {
    otherParams: {
      user: { likes },
    },
  } = route.params;

  return likes ? (
    <ScrollView>
      {likes.map((like) => (
        <Container height={100}>
          {like.post.files[0] ? (
            <Image
              style={imageStyles.image}
              source={{ uri: like.post.files[0].url }}
            />
          ) : (
            <Image style={imageStyles.image} source={{ uri: defaultimage }} />
          )}

          <TextContainer>
            <TitleText>{like.post.title}</TitleText>
            <Text>기간당{like.post.price}원</Text>
          </TextContainer>
        </Container>
      ))}
    </ScrollView>
  ) : (
    <View>
      <Text>loading</Text>
    </View>
  );
};

import React, { useEffect } from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { defaultimage } from "../../../../constants";

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
export const TextContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  const { posts } = user;
  return (
    <ScrollView>
      {posts ? (
        posts.map((tomato) => (
          <Container height={100}>
            {tomato.files[0] ? (
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: tomato.files[0].url }}
              />
            ) : (
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: defaultimage,
                }}
              />
            )}
            <TextContainer>
              <TitleText>{tomato.title}</TitleText>
              <Text>{user.area}</Text>
              <Text>기간당{tomato.price}원</Text>
            </TextContainer>
          </Container>
        ))
      ) : (
        <Container>
          <Text>nothing</Text>
        </Container>
      )}
    </ScrollView>
  );
};

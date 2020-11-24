import React, { useEffect } from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import { Image } from "react-native";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;
const Container = styled.TouchableOpacity`
  width: 100%;
  flex: 0.1;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: ${(props) => props.height};
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  const { posts } = user;
  return (
    <ScrollView>
      {posts.map((tomato) => (
        <Container height={100}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: tomato.files[0].url }}
          />
          <Text>{tomato.id}</Text>
        </Container>
      ))}
    </ScrollView>
  );
};

import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";

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
  const { otherParams:{user} } = route.params;
  return (
    <ScrollView>
      <Container size={400}>
        <Text>{user.name}님 반갑습니다</Text>
        <Text>가입일</Text>
        <Text>소개</Text>
        <Text>인증</Text>
        <Text>평가</Text>
      </Container>
      <Container size={150} onPress={() => navigation.navigate("MyRent")}>
        <Text>{`대여상품개`}</Text>
      </Container>      
      <Container size={150} onPress={() => navigation.navigate("MyPosts")}>
        <Text>{`게시상품${user.postsCount}개`}</Text>
      </Container>
      <Container size={80} onPress={() => navigation.navigate("MyReview")}>
        <Text>{`리뷰보기`}</Text>
      </Container>
    </ScrollView>
  );
};

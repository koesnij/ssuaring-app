import React, { useEffect } from "react";
import { Image, ScrollView } from "react-native";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Container = styled.TouchableOpacity`
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: ${(props) => props.size};
  flex:1;
  justify-content:center;
`;
const NameNicknameCreatedAtImageContainer = styled.View`
  flex: 0.5;
  flex-direction: row;
`;
const NameNicknameCreateAtContainer = styled.View`
  flex: 0.6;
  justify-content: center;
`;
const ImageNameNicknameContainer = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items:center;
`;
const IntroductionContainer = styled.View`
  flex: 0.1;
`;
const AuthenticatedContainer = styled.View`
  flex: 0.2;
`;
const EvaluationContainer = styled.View`
  flex: 0.2;
`;
const Text = styled.Text`
  font-size: ${(props) => (props.size ? props.size : `12px`)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : `0px`};
  
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  return (
    <ScrollView>
      <Container size={400}>
        <NameNicknameCreatedAtImageContainer>
          <NameNicknameCreateAtContainer>
            <Text size={24} marginBottom={10}>{`안녕하세요\n(${
              user.nickname
            })입니다`}</Text>
            <Text>생성일</Text>
          </NameNicknameCreateAtContainer>
          <ImageNameNicknameContainer>
            <Image
              style={{ width: 100, height: 90, borderRadius: 100 }}
              source={{ uri: user.avatar }}
            />
            <Text>
              {user.name}
              {`(${user.nickname})`}
            </Text>
          </ImageNameNicknameContainer>
        </NameNicknameCreatedAtImageContainer>
        <IntroductionContainer>
          <Text size={18} marginBottom={5}>
            소개
          </Text>
          <Text>안녕하세요 {user.name}의 소개글입니다.</Text>
        </IntroductionContainer>
        <AuthenticatedContainer>
          <Text size={18} marginBottom={5}>
            인증
          </Text>
          {user.phoneNumber ? (
            <Text>✅본인인증이 된 회원입니다.</Text>
          ) : (
            <Text>🙈본인인증을 안하셨군요</Text>
          )}
          {user.area ? (
            <Text>✅지역인증이 된 회원입니다.</Text>
          ) : (
            <Text>🙈지역인증을 안하셨군요</Text>
          )}
        </AuthenticatedContainer>
        <EvaluationContainer>
          <Text size={18}>평가</Text>
          <Text />
        </EvaluationContainer>
      </Container>
      <Container size={80} onPress={() => navigation.navigate("MyRent"),{otherParams:{user:user}}}>
        <Text size={16}>{`대여상품개`}</Text>
      </Container>
      <Container
        size={80}
        onPress={() =>
          navigation.navigate("MyPosts", { otherParams: { user: user } })
        }
      >
        <Text size={16}>{`게시상품${user.postsCount}개`}</Text>
      </Container>
      <Container size={80} onPress={() => navigation.navigate("MyReview"),{otherParams:{user:user}}}>
        <Text size={16}>{`리뷰보기`}</Text>
      </Container>
    </ScrollView>
  );
};

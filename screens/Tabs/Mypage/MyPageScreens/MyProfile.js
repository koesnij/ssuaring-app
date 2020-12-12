import React, { useEffect } from "react";
import { Image, ScrollView } from "react-native";
import styled from "styled-components";

const ScrollViewTest = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
const Container = styled.TouchableOpacity`
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: ${(props) => props.size};
  flex: 1;
  justify-content: center;
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
  align-items: center;
`;
const IntroductionContainer = styled.View`
  flex: 0.2;
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
  font-weight: ${(props) => (props.weight ? props.weight : `300`)};
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  return (
    <ScrollViewTest>
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
          <Text size={18} marginBottom={5} weight={500}>
            소개
          </Text>
          {user.introduction ? (
            <Text>안녕하세요 {user.name}의 소개글입니다.</Text>
          ) : (
            <Text>소개글을 달아주세요 😅</Text>
          )}
        </IntroductionContainer>
        <AuthenticatedContainer>
          <Text size={18} marginBottom={5} weight={500}>
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
          <Text size={18} weight={500}>평가</Text>
          <Text />
        </EvaluationContainer>
      </Container>
      <Container
        size={95}
        onPress={
          (() => navigation.navigate("MyRent"), { otherParams: { user: user } })
        }
      >
        {user.tradeHistory ? (
          <Text size={18} weight={700}>{`대여상품${user.tradeHistory}개`}</Text> //이거 모델에다가 카운트 달아줄거임
        ) : (
          <Text size={18} weight={700}>{`대여상품 0개`}</Text>
        )}
      </Container>
      <Container
        size={95}
        onPress={() =>
          navigation.navigate("MyPosts", { otherParams: { user: user } })
        }
      >
        <Text size={18} weight={700}>{`게시상품 ${user.postsCount}개`}</Text>
      </Container>
      <Container
        size={95}
        onPress={
          (() => navigation.navigate("MyReview"),
          { otherParams: { user: user } })
        }
      >
        <Text size={18} weight={700}>{`받은 후기 보기`}</Text>
        {user.reviews ? (
          <Text size={12}>{`${user.reviews}개의 후기가 있습니다.`}</Text> //이거 모델에다가 카운트 달아줄거임
        ) : (
          <Text size={12}>아직 후기가 없네요 😂</Text>
        )}
      </Container>
    </ScrollViewTest>
  );
};

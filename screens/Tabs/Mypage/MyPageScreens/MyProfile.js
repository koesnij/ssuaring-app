import React, { useEffect, useLayoutEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import styled from 'styled-components';
import { HeaderLink } from '../../../../components/HeaderItem';
import styles from '../../../../styles';

const ScrollViewTest = styled(ScrollView)`
  flex: 1;
  background-color: white;
  padding: 10px;
`;
const Container = styled.TouchableOpacity`
  height: ${(props) => props.size};
  flex: 1;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
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
  font-size: ${(props) => (props.size ? props.size : `14px`)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : `0px`};
  font-weight: ${(props) => (props.weight ? props.weight : `400`)};
  padding: 3px;
`;

const ReviewArea = styled.View`
  padding: 20px 0px;
`;

const ReviewItem = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;
const Column = styled.View`
  justify-content: center;
  padding: 0px 10px;
`;

const Nick = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const ReviewText = styled.Text`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return !user.isSelf ? (
          <HeaderLink
            str={'채팅하기'}
            onPress={() =>
              navigation.navigate('Chatting', {
                otherParams: { otherUser: user },
              })
            }
          />
        ) : (
          <></>
        );
      },
    });
  }, [navigation]);
  console.log('MYPROFILE', user);
  return (
    <ScrollViewTest>
      <Container size={400}>
        <NameNicknameCreatedAtImageContainer>
          <NameNicknameCreateAtContainer>
            <Text
              size={24}
              marginBottom={10}
            >{`안녕하세요, \n${user.nickname}입니다.`}</Text>
            <Text size={15} weight={400}>
              가입일
            </Text>
            <Text>{user.createdAt}</Text>
          </NameNicknameCreateAtContainer>
          <ImageNameNicknameContainer>
            <Image
              style={{
                width: 100,
                height: 90,
                borderRadius: 100,
                marginBottom: 10,
              }}
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
            <Text>반갑습니다. </Text>
          )}
        </IntroductionContainer>
        <AuthenticatedContainer>
          <Text size={18} marginBottom={5} weight={500}>
            인증
          </Text>
          {user.area ? (
            <Text>✅ 지역인증이 된 회원입니다.</Text>
          ) : (
            <Text>🙈 지역인증을 안하셨군요</Text>
          )}
        </AuthenticatedContainer>
        <EvaluationContainer>
          <Text size={18} marginBottom={5} weight={500}>
            평가
          </Text>
          {/* <Text>5.0 / 5.0 ★</Text> */}
          <Text>🥺 아직 평가가 없어요</Text>
        </EvaluationContainer>
      </Container>
      <Container
        size={95}
        onPress={
          (() => navigation.navigate('MyRent'), { otherParams: { user: user } })
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
          navigation.navigate('MyPosts', { otherParams: { user: user } })
        }
      >
        <Text size={18} weight={700}>{`게시상품 ${user.postsCount}개`}</Text>
      </Container>
      <ReviewArea>
        <Text size={18} weight={700}>{`받은 후기 보기`}</Text>
        {!user.reviews ? (
          <>
            <ReviewItem>
              <Image
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                  resizeMode: 'cover',
                }}
                source={{ uri: user.avatar }}
              />
              <Column>
                <Nick>juunzzi</Nick>
                <ReviewText>정말 친절해요 !</ReviewText>
              </Column>
            </ReviewItem>
            <ReviewItem>
              <Image
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                  resizeMode: 'cover',
                }}
                source={{ uri: user.avatar }}
              />
              <Column>
                <Nick>moonzzak</Nick>
                <ReviewText>시간을 잘 지켜요.</ReviewText>
              </Column>
            </ReviewItem>
          </>
        ) : (
          <Text size={12}>아직 후기가 없네요 😂</Text>
        )}
      </ReviewArea>
    </ScrollViewTest>
  );
};

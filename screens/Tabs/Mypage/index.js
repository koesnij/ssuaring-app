import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useLogOut } from '../../../AuthContext';
import { Header, HeaderLink } from '../../../components/HeaderItem';
import { Image, ScrollView } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../../fragment';
import { ME } from './MyPageQueries';
import Loader from '../../../components/Loader';
import styles from '../../../styles';

const View = styled.View`
  align-items: center;
  flex: 1;
`;
const ScrollViewTest = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  flex: 0.1;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const Text = styled.Text``;
const NameText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;
const TextButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 5px;
`;
const ProfileContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
  padding: 20px;
  flex-direction: row;
`;
const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export default ({ navigation, updatedUser }) => {
  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: 'network-only',
  });
  const [refreshing, setRefreshing] = useState(false);

  console.log(data);

  const logOut = useLogOut();
  const handler = () => {
    logOut();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '내 프로필',
    });
  }, [navigation]);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.me && (
          <ScrollViewTest>
            <View>
              <ProfileContainer>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    marginRight: 20,
                  }}
                  source={{ uri: data.me.avatar }}
                />
                <TextButtonContainer>
                  <NameText>{data.me.name}</NameText>
                  <ButtonContainer>
                    <Button
                      size={110}
                      onPress={() =>
                        navigation.navigate('MyProfile', {
                          otherParams: { user: data.me },
                        })
                      }
                      text="프로필 보기"
                    />
                    <Button
                      size={110}
                      onPress={() =>
                        navigation.navigate('EditProfile', {
                          otherParams: { user: data.me },
                        })
                      }
                      text="프로필 수정"
                    />
                  </ButtonContainer>
                </TextButtonContainer>
              </ProfileContainer>
              <Container
                onPress={() =>
                  navigation.navigate('MyLikes', {
                    otherParams: { user: data.me },
                  })
                }
              >
                <Text>내 찜 목록</Text>
              </Container>
              <Container
                onPress={() =>
                  navigation.navigate('MyPosts', {
                    otherParams: { user: data.me },
                  })
                }
              >
                <Text>내 게시물</Text>
              </Container>
              <Container
                onPress={() =>
                  navigation.navigate('MyArea', {
                    otherParams: { user: data.me },
                  })
                }
              >
                <Text>내 지역</Text>
              </Container>
              <Container
                onPress={() =>
                  navigation.navigate('MyTradeHistory', {
                    otherParams: { user: data.me },
                  })
                }
              >
                <Text>나의 대여 요청</Text>
              </Container>
              <Container
                onPress={() =>
                  navigation.navigate('MyReservation', {
                    otherParams: { user: data.me },
                  })
                }
              >
                <Text>내게 온 대여 요청</Text>
              </Container>
              <Container
                onPress={() =>
                  navigation.navigate('Setting', {
                    otherParams: { user: data.me },
                  })
                }
              >
                <Text>설정</Text>
              </Container>
              <Container onPress={handler}>
                <Text>로그아웃</Text>
              </Container>
            </View>
          </ScrollViewTest>
        )
      )}
    </>
  );
};

import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useLogOut } from '../../../AuthContext';
import { Header, HeaderLink } from '../../../components/HeaderItem';
import { Image, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../../fragment';
import { ME } from './MyPageQueries';

const View = styled.View`
  align-items: center;
  flex: 1;
`;

const Container = styled.TouchableOpacity`
  width: 100%;
  flex: 0.1;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: ${(props) => props.height};
`;
const Text = styled.Text``;

export default ({ navigation, updatedUser }) => {
  const { loading, data, refetch } = useQuery(ME, {});
  const [refreshing, setRefreshing] = useState(false);

  const logOut = useLogOut();
  const handler = () => {
    logOut();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '내 프로필',
    });
  }, [navigation]); //refreshing 코드(새로고침)
  /*const onRefresh = async()=>{
    try{
      setRefreshing(true);
      await refetch();
    }catch(error){
      console.log(error);
    }finally{
      setRefreshing(false);
    }
  }
  */ console.log(
    data
  );
  return (
    <ScrollView>
      {loading ? (
        <View>
          <Text>hi</Text>
        </View>
      ) : (
        data &&
        data.me && (
          <View>
            <Container height={400}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: data.me.avatar }}
              />
              <Text>{data.me.name}</Text>
              <Text>{data.me.nickname}</Text>
              <Text>{data.me.phoneNumber}</Text>
              <Text>{data.me.email}</Text>
              <Text>{data.me.phoneNumber}</Text>
              <Button
                size="50"
                onPress={() =>
                  navigation.navigate('MyProfile', {
                    otherParams: { user: data.me },
                  })
                }
                text="프로필 보기"
              />
              <Button
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    otherParams: { user: data.me },
                  })
                }
                text="프로필 수정"
              />
              <Button
                onPress={() =>
                  navigation.navigate('Report', {
                    type: 'user',
                    user: '',
                  })
                }
                text="신고하기"
              />
            </Container>
            <Container
              height={50}
              onPress={() =>
                navigation.navigate('MyLikes', {
                  otherParams: { user: data.me },
                })
              }
            >
              <Text>내 찜 목록</Text>
            </Container>
            <Container
              height={50}
              onPress={() =>
                navigation.navigate('MyPosts', {
                  otherParams: { user: data.me },
                })
              }
            >
              <Text>내 게시물</Text>
            </Container>
            <Container
              height={50}
              onPress={() =>
                navigation.navigate('MyArea', {
                  otherParams: { user: data.me },
                })
              }
            >
              <Text>내 지역</Text>
            </Container>
            <Container
              height={50}
              onPress={() =>
                navigation.navigate('MyTradeHistory', {
                  otherParams: { user: data.me },
                })
              }
            >
              <Text>내 거래 내역</Text>
            </Container>
            <Container
              height={50}
              onPress={() =>
                navigation.navigate('Setting', {
                  otherParams: { user: data.me },
                })
              }
            >
              <Text>설정</Text>
            </Container>
            <Container height={50} onPress={handler}>
              <Text>로그아웃</Text>
            </Container>
          </View>
        )
      )}
    </ScrollView>
  );
};

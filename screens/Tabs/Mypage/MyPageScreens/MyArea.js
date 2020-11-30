import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo-hooks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import styled from 'styled-components';
import { getLocation } from '../../../../utils';
import Loader from '../../../../components/Loader';
import styles from '../../../../styles';

const View = styled.View`
  justify-content: flex-start;
  background-color: white;
  flex: 1;
`;
const ModalView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: gray;
`;

const Container = styled.View`
  padding: 0px 20px;
  padding-top: 40px;
  flex-direction: row;
`;
const Text = styled.Text`
  font-size: 22px;
  font-weight: 300;
`;

const IsAuth = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const Touchable = styled.TouchableOpacity`
  padding-right: 30px;
`;

const Button = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${styles.blueColor};
`;

const AUTH_AREA = gql`
  mutation authArea($lat: Float!, $lng: Float!, $area: String!) {
    authArea(lat: $lat, lng: $lng, area: $area)
  }
`;

const MY_AREA = gql`
  {
    me {
      id
      nickname
      area
      areaAuth
    }
  }
`;

export default ({ route, navigation }) => {
  const { loading, data, refetch } = useQuery(MY_AREA, {
    fetchPolicy: 'network-only',
  });
  const [authAreaMutation] = useMutation(AUTH_AREA, {
    refetchQueries: () => [{ query: MY_AREA }],
  });

  useEffect(() => {
    console.log('data', data);
    if (data && data.me) {
      if (data.me.area === '-') {
        Alert.alert('내 지역 설정 필요', '내 지역 설정 화면으로 이동합니다.', [
          {
            text: '승인',
            onPress: async () => navigation.navigate('EditArea'),
          },
        ]);
      }
      setAreaAuth(data.me.areaAuth);
    }
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [areaAuth, setAreaAuth] = useState(false);

  const handler = async () => {
    try {
      setAuthLoading(true);
      const {
        coords: { latitude: lat, longitude: lng },
      } = await getLocation();
      console.log(lat, lng, data.me.area);
      const res = await authAreaMutation({
        variables: { lat, lng, area: data.me.area },
      });
      if (res === true) {
        setAreaAuth(true);
      } else {
        setAreaAuth(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.me && (
          <View>
            <Container>
              <Text>
                {data.me.area === '-'
                  ? '지역 설정이 필요합니다'
                  : `현재 ${data.me.nickname}님이\n설정하신 지역은 ${data.me.area}입니다.`}
              </Text>
            </Container>
            <Container>
              {authLoading ? (
                <>
                  <ActivityIndicator style={{ paddingRight: 10 }} />
                  <IsAuth>인증 중</IsAuth>
                </>
              ) : (
                <IsAuth>{areaAuth ? '✅ 인증 완료' : '⛔️ 인증 필요'}</IsAuth>
              )}
            </Container>
            <Container>
              <Touchable onPress={() => navigation.navigate('EditArea')}>
                <Button>지역변경하기</Button>
              </Touchable>
              <Touchable onPress={handler} disabled={authLoading}>
                <Button>지역인증하기</Button>
              </Touchable>
            </Container>
          </View>
        )
      )}
    </>
  );
};

import React, { useEffect } from 'react';
import { useQuery, useSubscription } from "react-apollo-hooks";
import { Image, ScrollView } from "react-native";
import styled from 'styled-components';
import { ME } from '../Mypage/MyPageQueries';
import { GET_ROOM, GET_ROOMS, NEW_MESSAGE } from "./ChatQueries";
import ChattingRoom from './ChatsScreens/ChattingRoom';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { data, loading  } = useQuery(GET_ROOMS, {
    fetchPolicy: "network-only"
  });
  const { data: me, loading: meloading } = useQuery(ME, {
    fetchPolicy: "network-only"
  });
  return (
    <View>
    {loading && meloading ? (
        <Text>로딩 중</Text>
    ) : (
      me && me.me && data && data.getRooms &&
      <ChattingRoom 
        rooms={data.getRooms}
        me={me.me}
        navigation={navigation}
      />
    )}
    </View>
  );
};

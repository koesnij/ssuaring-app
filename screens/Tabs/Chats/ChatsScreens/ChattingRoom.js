import { storeKeyNameFromField } from 'apollo-utilities';
import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { Image, RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
import styles from '../../../../styles';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const TextContainer = styled.View`
  width: 80%;
  flex-direction: column;
  padding-left: 10px;
`;
const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Bottom = styled.View``;
const UserText = styled.Text`
  font-size: 14;
  font-weight: bold;
  padding: 10px;
`;
const TimeText = styled.Text`
  font-size: 10;
  padding: 10px;
  padding-top: 13px;
`;
const MessageText = styled.Text`
  font-size: 14;
  font-weight: normal;
  padding: 10px;
`;

export default ({ refetch, rooms, me, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {rooms.map((room) => (
        <Container
          key={room.id}
          onPress={() =>
            navigation.navigate('Chatting', {
              otherParams: {
                room,
                me,
                otherUser: room.participants.filter(
                  (user) => user.id !== me.id
                )[0],
              },
            })
          }
        >
          <Image
            source={{
              uri: room.participants.filter((user) => user.id !== me.id)[0]
                .avatar,
            }}
            style={{
              borderRadius: 10,
              width: 70,
              height: 70,
            }}
          />
          <TextContainer>
            <Top>
              <UserText>
                {
                  room.participants.filter((user) => user.id !== me.id)[0]
                    .nickname
                }
              </UserText>
              <TimeText>
                {
                  room.messages[room.messages.length - 1].createdAt.match(
                    /\d\d:\d\d/
                  )[0]
                }
              </TimeText>
            </Top>
            <Bottom>
              <MessageText>
                {room.messages[room.messages.length - 1].text}
              </MessageText>
            </Bottom>
          </TextContainer>
        </Container>
      ))}
    </ScrollView>
  );
};

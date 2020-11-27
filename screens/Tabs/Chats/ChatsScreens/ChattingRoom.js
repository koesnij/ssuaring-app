import React, { useEffect } from 'react';
import { useQuery, useSubscription } from "react-apollo-hooks";
import { Image, ScrollView } from "react-native";
import styled from 'styled-components';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

export default ({ rooms, me, navigation }) => {
    return (
      <ScrollView>
          {
            rooms.map(room => (
                <Container
                  key={room.id} 
                  onPress={() => 
                    navigation.navigate("Chatting", {
                      otherParams: { room, me, otherUser: room.participants.filter(user => user.id !== me.id)[0] }
                    })
                  }>
                  <Image 
                    source={{ uri: room.participants.filter(user => user.id !== me.id)[0].avatar}}
                  ></Image>
                  <Text>{room.participants.filter(user => user.id !== me.id)[0].nickname}</Text>
                </Container>
            ))
          }
      </ScrollView>
    );
};

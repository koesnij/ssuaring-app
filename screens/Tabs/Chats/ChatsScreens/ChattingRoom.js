import React, { useEffect } from 'react';
import { useQuery, useSubscription } from "react-apollo-hooks";
import { Image, ScrollView } from "react-native";
import styled from 'styled-components';

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 50;
    borderWidth: 1;
`;

const Text = styled.Text``;

export default ({ rooms, me, navigation }) => {
    return (
      <ScrollView style={{
          width: "100%",
          height: "100%"
      }}>
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
                  <Text>{room.messages[room.messages.length-1].text}</Text>
                </Container>
            ))
          }
      </ScrollView>
    );
};

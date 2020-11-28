import { useQuery } from "@apollo/react-hooks";
import React from 'react';
import { Image, ScrollView } from "react-native";
import styled from 'styled-components';
import { GET_ROOM, GET_ROOMS } from "./ChatQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_ROOMS);
  console.log(data);
  return (
    <ScrollView>
        {loading ? (
          <View>
            <Text>로딩 중...</Text>
          </View>
        ) : (
          data && data.getRooms && data.getRooms.map(room => (
                <Container
                  key={room.id} 
                  onPress={() => 
                    navigation.navigate("Chatting", {
                      otherParams: { room }
                    })
                  }>
                  <Image 
                    source={{ uri: room.participants[0].avatar}}
                  ></Image>
                  <Text>{room.participants[0].nickname}</Text>
                  <Text>{room.messages[room.messages.length-1].text}</Text>
                </Container>
            ))
        )
      }
    </ScrollView>
  );
};

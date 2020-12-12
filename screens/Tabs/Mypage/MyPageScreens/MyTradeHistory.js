import React, { useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import styled from 'styled-components';
import ReservationItem from '../../../../components/ReservationItem';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
  background-color: white;
`;

const Text = styled.Text``;
const ScrollViewTest = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
export default ({ route, navigation }) => {
  const {
    otherParams: {
      user: { tradeHistory, myReservation },
    },
  } = route.params;
  console.log('TRADEHISTORY', tradeHistory);
  return (
    <>
      {tradeHistory ? (
        <ScrollViewTest>
          <FlatList
            data={tradeHistory}
            refreshControl
            renderItem={({ item }) => (
              <ReservationItem
                key={item.id}
                item={item.post}
                reservation={tradeHistory}
              />
            )}
          />
        </ScrollViewTest>
      ) : (
        <View>
          <Text>아직 신청내역이 없으시군요😞</Text>
        </View>
      )}
    </>
  );
};

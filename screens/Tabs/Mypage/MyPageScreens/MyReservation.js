import React, { useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import styled from 'styled-components';
import ReservationItem from '../../../../components/ReservationItem';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.5;
  flex-direction: row;
`;
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;
const ScrollViewTest = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;
export default ({ route, navigation }) => {
  const {
    otherParams: {
      user: { myReservation },
    },
  } = route.params;
  console.log('myReservation', myReservation);
  return (
    <>
      {myReservation ? (
        <ScrollViewTest>
          <FlatList
            data={myReservation}
            refreshControl
            renderItem={({ item }) => (
              <ReservationItem
                key={item.id}
                post={item.post}
                borrower={item.borrower}
                status={item.status}
                reservationId={item.id}
                startDate={item.startDate}
                endDate={item.endDate}
              />
            )}
          />
        </ScrollViewTest>
      ) : (
        <View>
          <Text>나에게 온 거래신청이 아직 없으시군요😞</Text>
        </View>
      )}
    </>
  );
};

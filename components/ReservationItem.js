import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import styles from '../styles';

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px;
  /* background-color: red; */
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: green; */
  padding: 7px 12px;
`;

const Title = styled.Text`
  font-size: 18;
  font-weight: 400;
  color: ${styles.blackColor};
`;

const Location = styled.Text`
  padding-top: 6px;
  font-size: 12;
  font-weight: 600;
  color: ${styles.darkGreyColor};
`;

const Price = styled.Text`
  padding-top: 35;
  font-size: 14;
  color: ${styles.blackColor};
  font-weight: 600;
`;
const Text = styled.Text`
  font-size: 12px;
`;
export default ({
  post: { id, files, title, area, caption },
  borrower,
  status,
  reservationId,
  startDate,
  endDate,
}) => {
  const navigation = useNavigation();

  return (
    <Touchable
      onPress={() => {
        navigation.navigate('MyReservationDetail', {
          otherParams: {
            id,
            title,
            files,
            borrower,
            status,
            area,

            reservationId,
            startDate,
            endDate,
          },
        });
      }}
    >
      <Image
        source={{ uri: files[0].url }}
        style={{
          width: 110,
          height: 110,
          resizeMode: 'cover',
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: styles.lightGreyColor,
        }}
      />
      <Column>
        <Title>{title}</Title>
        <Location>{status == 'apply' ? '예약 전' : '예약 완료'}</Location>
        <Price>
          {borrower.name}
          <Text>님의 대여신청입니다</Text>
        </Price>
      </Column>
    </Touchable>
  );
};

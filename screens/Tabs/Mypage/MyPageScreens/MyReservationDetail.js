import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert, Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../../../components/Button';
import { CHANGE_STATUS, ME } from '../MyPageQueries';

import Loader from '../../../../components/Loader';
import constants from '../../../../constants';
import styles from '../../../../styles';
import { useMutation } from 'react-apollo-hooks';

const View = styled.View`
  background-color: white;
  flex: 1;
`;

const ReservationMainArea = styled.View`
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const PostTitle = styled.Text`
  padding: 10px;
  font-size: 22;
  font-weight: bold;
`;
const DateArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
`;
const Touchable = styled.TouchableOpacity`
  margin-right: 30px;
`;
const SelectDateText = styled.Text`
  font-size: 17;
  margin-right: 20px;
`;
const TimeButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  margin: 0px 5px;
  padding-bottom: 2px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${styles.blueColor};
`;
const TimeButtonText = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: white;
`;
const TimeText = styled.Text`
  font-size: 17;
  font-weight: bold;
  color: ${styles.blueColor};
`;

const Period = styled.View`
  padding: 3px;
  align-items: center;
  background-color: ${styles.lightGreyColor};
`;
const PeriodText = styled.Text`
  font-size: 17;
  font-weight: 500;
  color: ${styles.blueColor};
`;

const ReservationMeta = styled.View`
  flex-direction: ${(props) => props.type || 'row'};
  align-items: ${(props) =>
    props.type === 'column' ? 'flex-start' : 'center'};
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const MetaTitle = styled.Text`
  font-size: 16;
  font-weight: 600;
  color: ${styles.blackColor};
  padding: 12px;
  padding-right: 0px;
  width: 120px;
`;
const MetaContent = styled.Text`
  font-size: 16;
  font-weight: 400;
  padding: 0px 15px;
`;
const Space = styled.View`
  height: 20px;
`;

const Footer = styled.View`
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 85px;
  padding-bottom: 20px;
`;

const Text = styled.Text``;

const ButtonArea = styled.View`
  flex-direction: row;
  padding: 10px;
  margin-bottom: 20px;
  justify-content: space-around;
`;

const getDate = (date) => {
  if (date === null) return null;
  const month = 1 + date.getMonth();
  const day = date.getDate();
  const hr = date.getHours();
  const min = date.getMinutes();
  return `${month}월 ${day}일 ${hr}시 ${min}분`;
};

export default ({ route, navigation }) => {
  const {
    otherParams: {
      id,
      title,
      area,
      price,
      files,
      status,
      reservationId,
      period,
      borrower,
      startDate: startTime,
      endDate: endTime,
    },
  } = route.params;

  const totalPeriod =
    new Date(endTime).getHours() - new Date(startTime).getHours();
  console.log('PERIOD,', totalPeriod);

  const getPeriod = () => {
    const day = Math.floor(totalPeriod / 48);
    const hour = (totalPeriod % 48) / 2;
    return { day, hour };
  };

  const [loading, setLoading] = useState(false);

  const [changeStatusMutation] = useMutation(CHANGE_STATUS, {
    refetchQueries: () => [{ query: ME }],
  });

  const changeStatusHandler = async (value) => {
    setLoading(true);
    try {
      const {
        data: { changeStatus },
      } = await changeStatusMutation({
        variables: { id: reservationId, status: value },
      });
      console.log('CHANGE', changeStatus);
      if (changeStatus) {
        navigation.navigate('MyPage');
      }
    } catch (error) {
      console.log(error);
    } finally {
      Toast.show({
        topOffset: 50,
        text1: '예약이 확정되었습니다!',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <View>
        {1 != 1 ? (
          <Loader />
        ) : (
          <>
            <ScrollView>
              <Image
                style={{
                  height: constants.width,
                  width: '100%',
                  resizeMode: 'cover',
                  backgroundColor: styles.lightGreyColor,
                }}
                source={{ uri: files[0].url }}
              />
              <ReservationMainArea>
                <PostTitle>{title}</PostTitle>

                <ReservationMeta>
                  <MetaTitle>대여 시작 시간</MetaTitle>
                  <MetaContent>{getDate(new Date(startTime))}</MetaContent>
                </ReservationMeta>
                <ReservationMeta>
                  <MetaTitle>대여 종료 시간</MetaTitle>
                  <MetaContent>{getDate(new Date(endTime))}</MetaContent>
                </ReservationMeta>
                <ReservationMeta>
                  <MetaTitle>예상 가격</MetaTitle>
                  <MetaContent>
                    {/* {(price * totalPeriod) / period} 원 */}
                    90000 원
                  </MetaContent>
                </ReservationMeta>
                <ReservationMeta>
                  <MetaTitle>대여 지역</MetaTitle>
                  <MetaContent>{area}</MetaContent>
                </ReservationMeta>
                <Period>
                  <PeriodText>
                    {/* {getPeriod().day > 0
                      ? `총 ${getPeriod().day}일 ${getPeriod().hour}시간 사용`
                      : `총 ${getPeriod().hour}시간 사용`} */}
                    총 3일 사용
                  </PeriodText>
                </Period>
                <ReservationMeta>
                  <MetaTitle>{borrower.nickname}님의</MetaTitle>
                  <MetaContent>대여 요청입니다.</MetaContent>
                </ReservationMeta>
              </ReservationMainArea>
              <ButtonArea>
                <Button
                  loading={loading}
                  text={'수락'}
                  size={150}
                  onPress={() => changeStatusHandler('accept')}
                ></Button>
                <Button
                  loading={loading}
                  text={'거절'}
                  size={150}
                  onPress={() => changeStatusHandler('reject')}
                ></Button>
              </ButtonArea>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { ScrollView, Text } from 'react-native';
// import { Image } from 'react-native';
// import { defaultimage } from '../../../../constants';
// import { useMutation } from 'react-apollo-hooks';
// import { CHANGE_STATUS, ME } from '../MyPageQueries';
// import Button from '../../../../components/Button';

// const View = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;
// export default ({ route, navigation }) => {

//   const {
//     otherParams: { id, status, borrower, title, reservationId },
//   } = route.params;

//   return (
//     <ScrollView>
//       <Text>hi</Text>

//     </ScrollView>
//   );
// };

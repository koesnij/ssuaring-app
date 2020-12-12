import React, { useState } from 'react';
import styled from 'styled-components';
import { Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Loader from '../../components/Loader';
import constants from '../../constants';
import styles from '../../styles';
import { useMutation } from 'react-apollo-hooks';
import { APPLY_RESERVATION } from './PostDetailQueries';
import { SEND_MESSAGE } from './Chats/ChatQueries';

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
  color: ${styles.blackColor}
  padding: 12px;
  padding-right: 0px;
  width: 110px;
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
      user: { id: userId },
      id,
      title,
      area,
      caption,
      price,
      files,
      period,
      period_string,
    },
  } = route.params;

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalPeriod, setTotalPeriod] = useState(0);

  const [applyReservationMutation] = useMutation(APPLY_RESERVATION, {
    variables: { postId: id, startDate: startTime, endDate: endTime },
  });
  console.log('RESREQ', userId);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      text: '예약 요청입니다.',
      toId: userId,
    },
  });
  const [loading, setLoading] = useState(false);
  const handleReserve = async () => {
    try {
      setLoading(true);
      const {
        data: { applyReservation },
      } = await applyReservationMutation({
        variables: {
          postId: id,
          startDate: String(startTime.getTime()),
          endDate: String(endTime.getTime()),
        },
      });
      await sendMessageMutation();
      if (applyReservation) {
        Toast.show({ topOffset: 50, text1: '예약 신청이 완료되었습니다.' });
        navigation.pop();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlusMinus = (mode) => {
    if (totalPeriod != 0) {
      if (mode === '-') {
        if (totalPeriod > period) {
          setTotalPeriod(totalPeriod - period);
          setEndTime(new Date(endTime.getTime() - 60000 * 30 * period));
        }
      } else {
        setTotalPeriod(totalPeriod + period);
        setEndTime(new Date(endTime.getTime() + 60000 * 30 * period));
      }
    }
  };

  const getPeriod = () => {
    const day = Math.floor(totalPeriod / 48);
    const hour = (totalPeriod % 48) / 2;
    return { day, hour };
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    setStartTime(date);
    setTotalPeriod(period);
    setEndTime(new Date(date.getTime() + 60000 * 30 * period));
    hideDatePicker();
  };

  return (
    <>
      <View>
        {loading ? (
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
                <DateArea>
                  <Touchable onPress={showDatePicker}>
                    <TimeText>시작 시간 선택</TimeText>
                  </Touchable>
                  <TimeButton onPress={() => handlePlusMinus('-')}>
                    <TimeButtonText>-</TimeButtonText>
                  </TimeButton>
                  <TimeText>{period_string}</TimeText>
                  <TimeButton onPress={() => handlePlusMinus('+')}>
                    <TimeButtonText>+</TimeButtonText>
                  </TimeButton>
                </DateArea>
                {startTime !== null && (
                  <>
                    <ReservationMeta>
                      <MetaTitle>대여 시작 시간</MetaTitle>
                      <MetaContent>{getDate(startTime)}</MetaContent>
                    </ReservationMeta>
                    <ReservationMeta>
                      <MetaTitle>대여 종료 시간</MetaTitle>
                      <MetaContent>{getDate(endTime)}</MetaContent>
                    </ReservationMeta>
                    <ReservationMeta>
                      <MetaTitle>예상 가격</MetaTitle>
                      <MetaContent>
                        {(price * totalPeriod) / period} 원
                      </MetaContent>
                    </ReservationMeta>
                    <ReservationMeta>
                      <MetaTitle>대여 지역</MetaTitle>
                      <MetaContent>{area}</MetaContent>
                    </ReservationMeta>
                    <Period>
                      <PeriodText>
                        {getPeriod().day > 0
                          ? `총 ${getPeriod().day}일 ${
                              getPeriod().hour
                            }시간 사용`
                          : `총 ${getPeriod().hour}시간 사용`}
                      </PeriodText>
                    </Period>
                  </>
                )}
              </ReservationMainArea>

              <ReservationMeta type="column">
                <MetaTitle>대여 주의사항</MetaTitle>
                <MetaContent>{caption}</MetaContent>
                <Space />
              </ReservationMeta>
            </ScrollView>
            <Footer>
              <Button
                loading={loading}
                disabled={totalPeriod === 0}
                onPress={handleReserve}
                text="예약 신청"
                size={340}
              />
            </Footer>
          </>
        )}
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        minuteInterval={15}
        isDarkModeEnabled={false}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Image, ScrollView } from 'react-native';
// import Toast from 'react-native-toast-message';
// import Button from '../../../../components/Button';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import Loader from '../../../../components/Loader';
// import constants from '../../../../constants';
// import styles from '../../../../styles';
// import { useMutation } from 'react-apollo-hooks';

// const View = styled.View`
//   background-color: white;
//   flex: 1;
// `;

// const ReservationMainArea = styled.View`
//   border-top-width: 1px;
//   border-top-color: ${styles.lightGreyColor};
//   border-bottom-width: 1px;
//   border-bottom-color: ${styles.lightGreyColor};
// `;
// const PostTitle = styled.Text`
//   padding: 10px;
//   font-size: 22;
//   font-weight: bold;
// `;
// const DateArea = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   padding: 30px 0px;
// `;
// const Touchable = styled.TouchableOpacity`
//   margin-right: 30px;
// `;
// const SelectDateText = styled.Text`
//   font-size: 17;
//   margin-right: 20px;
// `;
// const TimeButton = styled.TouchableOpacity`
//   height: 30px;
//   width: 30px;
//   margin: 0px 5px;
//   padding-bottom: 2px;
//   border-radius: 15px;
//   justify-content: center;
//   align-items: center;
//   background-color: ${styles.blueColor};
// `;
// const TimeButtonText = styled.Text`
//   font-size: 18;
//   font-weight: bold;
//   color: white;
// `;
// const TimeText = styled.Text`
//   font-size: 17;
//   font-weight: bold;
//   color: ${styles.blueColor};
// `;

// const Period = styled.View`
//   padding: 3px;
//   align-items: center;
//   background-color: ${styles.lightGreyColor};
// `;
// const PeriodText = styled.Text`
//   font-size: 17;
//   font-weight: 500;
//   color: ${styles.blueColor};
// `;

// const ReservationMeta = styled.View`
//   flex-direction: ${(props) => props.type || 'row'};
//   align-items: ${(props) =>
//     props.type === 'column' ? 'flex-start' : 'center'};
//   border-bottom-width: 1px;
//   border-bottom-color: ${styles.lightGreyColor};
// `;
// const MetaTitle = styled.Text`
//   font-size: 16;
//   font-weight: 600;
//   color: ${styles.blackColor};
//   padding: 12px;
//   padding-right: 0px;
//   width: 110px;
// `;
// const MetaContent = styled.Text`
//   font-size: 16;
//   font-weight: 400;
//   padding: 0px 15px;
// `;
// const Space = styled.View`
//   height: 20px;
// `;

// const Footer = styled.View`
//   border-top-width: 1px;
//   border-top-color: ${styles.lightGreyColor};
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   height: 85px;
//   padding-bottom: 20px;
// `;

// const Text = styled.Text``;

// const getDate = (date) => {
//   if (date === null) return null;
//   const month = 1 + date.getMonth();
//   const day = date.getDate();
//   const hr = date.getHours();
//   const min = date.getMinutes();
//   return `${month}월 ${day}일 ${hr}시 ${min}분`;
// };

// export default ({ route, navigation }) => {
//   const {
//     otherParams: {
//       id,
//       title,
//       area,
//       caption,
//       price,
//       files,
//       period,
//     },
//   } = route.params;

//   const [applyReservationMutation] = useMutation(applyReservationMutation, {
//     variables: { postId: id, startDate: startTime, endDate: endTime },
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [totalPeriod, setTotalPeriod] = useState(0);

//   const loading = false;

//   const handleReserve = () => {
//     Toast.show({ topOffset: 50, text1: '예약 신청이 완료되었습니다.' });
//   };

//   const handlePlusMinus = (mode) => {
//     if (totalPeriod != 0) {
//       if (mode === '-') {
//         if (totalPeriod > period) {
//           setTotalPeriod(totalPeriod - period);
//           setEndTime(new Date(endTime.getTime() - 60000 * 30 * period));
//         }
//       } else {
//         setTotalPeriod(totalPeriod + period);
//         setEndTime(new Date(endTime.getTime() + 60000 * 30 * period));
//       }
//     }
//   };

//   const getPeriod = () => {
//     const day = Math.floor(totalPeriod / 48);
//     const hour = (totalPeriod % 48) / 2;
//     return { day, hour };
//   };

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const showDatePicker = () => setDatePickerVisibility(true);
//   const hideDatePicker = () => setDatePickerVisibility(false);
//   const handleConfirm = (date) => {
//     console.warn('A date has been picked: ', date);
//     setStartTime(date);
//     setTotalPeriod(period);
//     setEndTime(new Date(date.getTime() + 60000 * 30 * period));
//     hideDatePicker();
//   };

//   return (
//     <>
//       <View>
//         {loading ? (
//           <Loader />
//         ) : (
//           <>
//             <ScrollView>
//               <Image
//                 style={{
//                   height: constants.width,
//                   width: '100%',
//                   resizeMode: 'cover',
//                   backgroundColor: styles.lightGreyColor,
//                 }}
//                 source={{ uri: files[0].url }}
//               />
//               <ReservationMainArea>
//                 <PostTitle>{title}</PostTitle>
//                 <DateArea>
//                   <Touchable onPress={showDatePicker}>
//                     <TimeText>시작 시간 선택</TimeText>
//                   </Touchable>
//                   <TimeButton onPress={() => handlePlusMinus('-')}>
//                     <TimeButtonText>-</TimeButtonText>
//                   </TimeButton>
//                   <TimeButton onPress={() => handlePlusMinus('+')}>
//                     <TimeButtonText>+</TimeButtonText>
//                   </TimeButton>
//                 </DateArea>
//                 {startTime !== null && (
//                   <>
//                     <ReservationMeta>
//                       <MetaTitle>대여 시작 시간</MetaTitle>
//                       <MetaContent>{getDate(startTime)}</MetaContent>
//                     </ReservationMeta>
//                     <ReservationMeta>
//                       <MetaTitle>대여 종료 시간</MetaTitle>
//                       <MetaContent>{getDate(endTime)}</MetaContent>
//                     </ReservationMeta>
//                     <ReservationMeta>
//                       <MetaTitle>예상 가격</MetaTitle>
//                       <MetaContent>
//                         {(price * totalPeriod) / period} 원
//                       </MetaContent>
//                     </ReservationMeta>
//                     <ReservationMeta>
//                       <MetaTitle>대여 지역</MetaTitle>
//                       <MetaContent>{area}</MetaContent>
//                     </ReservationMeta>
//                     <Period>
//                       <PeriodText>
//                         {getPeriod().day > 0
//                           ? `총 ${getPeriod().day}일 ${
//                               getPeriod().hour
//                             }시간 사용`
//                           : `총 ${getPeriod().hour}시간 사용`}
//                       </PeriodText>
//                     </Period>
//                   </>
//                 )}
//               </ReservationMainArea>

//               <ReservationMeta type="column">
//                 <MetaTitle>대여 주의사항</MetaTitle>
//                 <MetaContent>{caption}</MetaContent>
//                 <Space />
//               </ReservationMeta>
//             </ScrollView>
//             <Footer>
//               <Button
//                 disabled={totalPeriod === 0}
//                 onPress={handleReserve}
//                 text="예약 신청"
//                 size={340}
//               />
//             </Footer>
//           </>
//         )}
//       </View>

//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="datetime"
//         minuteInterval={15}
//         isDarkModeEnabled={false}
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </>
//   );
// };
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ScrollView, Text } from "react-native";
import { Image } from "react-native";
import { defaultimage } from "../../../../constants";
import { useMutation } from "react-apollo-hooks";
import { CHANGE_STATUS, ME } from "../MyPageQueries";
import Button from "../../../../components/Button";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export default ({ route, navigation }) => {
  const [changeStatusMutation] = useMutation(CHANGE_STATUS, { refetchQueries: () => [{ query: [ME] }] });
  const {
    otherParams: { id,status,borrower,title,reservationId },
  } = route.params;
  const [changedStatus,setChangeStatus] = useState(status)
const changeStatusHandler = async(value)=>{
    try{
        setChangeStatus(value);
        const {
            data:{reservation}
        }=await changeStatusMutation({variables:{id:reservationId,status:changedStatus}})
        if(reservation){
            navigation.navigate("MyPage");
            
        }
    }catch(error){

    }
}
  return (
    <ScrollView>
      <Text>hi</Text>
      <Button text={"accept"} onPress={()=>changeStatusHandler("accept")}></Button>
      <Button text={"reject"} onPress={()=>changeStatusHandler("reject")}></Button>
    </ScrollView>
  );
};

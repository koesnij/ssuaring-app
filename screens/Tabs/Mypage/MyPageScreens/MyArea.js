import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ModalView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: gray;
`;

const Text = styled.Text`
  text-align:center;
  font-size:24px;
  margin-bottom:10px;
`;
const Container = styled.TouchableOpacity`
  border: 1px solid black;
  background-color: white;
  border-radius:20;
`;
export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOutput, setModalOutput] = useState(user.area);
  return user.area ? (
    <View>
      <Text>현재 지역은 {modalOutput} 입니다</Text>
      <Button
        title={"지역 바꾸기"}
        onPress={() => setModalVisible(!modalVisible)}
      />
      <Modal isVisible={modalVisible}>
        <Container>
          <Text>
            당신의 지역을 선택해주세요
          </Text>
          <Button
            title={user.area}
            onPress={() => {
              setModalOutput(user.area);
              setModalVisible(!modalVisible);
            }}
          />
          <Button
            title={"서울시 노원구"}
            onPress={() => {
              setModalOutput("서울시 노원구");
              setModalVisible(!modalVisible);
            }}
          />
          <Button
            title={"닫기"}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </Container>
      </Modal>
    </View>
  ) : (
    <View>
      <Text>지역을 설정해주세요</Text>
    </View>
  );
};

///지역속성을 배열로 바꾼다음 배열들을 선택지화한다
///mod

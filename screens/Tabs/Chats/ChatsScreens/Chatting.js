import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TextInput } from 'react-native';
import { useMutation, useSubscription } from 'react-apollo-hooks';
import { SEND_MESSAGE, NEW_MESSAGE } from '../ChatQueries';
import styled from 'styled-components';
import MessageItem from '../../../../components/MessageItem';
import styles from '../../../../styles';

const MainArea = styled.ScrollView``;

const Footer = styled.View`
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 2px;
  padding-bottom: 40px;
`;
const Touchable = styled.TouchableOpacity`
  padding-right: 10px;
`;
const Text = styled.Text`
  font-weight: bold;
  color: ${styles.blueColor};
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { room, me, otherUser },
  } = route.params;
  const { id, messages: oldMessages, participants } = room;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(oldMessages);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId: room.id,
      text: message,
      toId: otherUser.id,
    },
  });
  const { data } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: id,
    },
  });
  useEffect(() => {
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages((previous) => [...previous, newMessage]);
    }
  }, [data]);
  const onChangeText = (text) => setMessage(text);
  const onSubmit = async () => {
    if (message === '') {
      return;
    }
    try {
      await sendMessageMutation();
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <MainArea>
        {messages &&
          messages.map((m) => (
            <MessageItem
              key={m.id}
              me={m.from.nickname === otherUser.nickname}
              from={m.from}
              text={m.text}
              createdAt={m.createdAt}
            />
          ))}
      </MainArea>
      <Footer>
        <TextInput
          placeholder="Type a message"
          style={{
            width: '90%',
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
        <Touchable onPress={onSubmit}>
          <Text>전송</Text>
        </Touchable>
      </Footer>
    </KeyboardAvoidingView>
  );
};

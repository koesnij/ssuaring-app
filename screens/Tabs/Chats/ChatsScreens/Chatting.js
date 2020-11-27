import React, { useEffect, useState } from "react";
import { ScrollView, KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { useMutation, useSubscription } from "react-apollo-hooks";
import { SEND_MESSAGE, NEW_MESSAGE } from "../ChatQueries";
import styled from "styled-components";

export default ({ route, navigation }) => {
    const { otherParams: { room, me, otherUser } } = route.params;
    const { id, messages: oldMessages ,participants } = room;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(oldMessages);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            roomId:room.id,
            text:message,
            toId:otherUser.id
        }
    });
    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            roomId: id
        }
    });
    useEffect(() => {
        if(data !== undefined) {
            const { newMessage } = data;
            setMessages(previous => [...previous, newMessage]);
        }
    }, [data]);
    const onChangeText = text => setMessage(text);
    const onSubmit = async () => {
        if (message === "") {
            return ;
        }
        try {
            await sendMessageMutation();
            setMessage("");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
            <ScrollView contentContainerStyle={{
                paddingVertical: 10,
                flex: 1,
                justifyContent: "flex-start"
            }}>
                {messages && messages.map(m => (
                    <View 
                        key={m.id}
                        style={{
                            marginBottom: 10,
                            alignItems: m.from.nickname === otherUser.nickname ? "flex-start" : "flex-end",
                            paddingHorizontal: 10
                        }}
                    >
                        <Text>{m.text}</Text>
                    </View>
                ))}
                <TextInput 
                    placeholder="Type a message"
                    style={{
                        marginTop: 50,
                        width: "90%",
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        backgroundColor: "#f2f2f2"
                    }}
                    returnKeyType="send"
                    value={message}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
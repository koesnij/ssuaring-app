import React, { useEffect, useState } from "react";
import { ScrollView, KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { SEND_MESSAGE, NEW_MESSAGE } from "../ChatQueries";
import styled from "styled-components";



export default ({ route, navigation }) => {
    const { otherParams: { room } } = route.params;
    const { id, messages: oldMessages ,participants } = room;
    console.log(oldMessages);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(oldMessages || []);
    /*const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            roomId: id
        }
    });
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            roomId: id,
            text: message,
            toId: participants[0].id
        }
    });
    const handleNewMessage = () => {
        if(data !== undefined) {
            const { newMessage } = data;
            setMessages(previous => [...previous, newMessage]);
        }
    };
    useEffect(() => {
        handleNewMessage();
    }, [data]);*/
    const onChangeText = text => setMessage(text);
    const onSubmit = async () => {
        if(message === "") {
            return ;
        }
        try {
            await sendMessageMutation();
            setMessage("");
        } catch (error) {
            console.log(error);
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
                                alignItems: m.from === participants[0] ? "flex-start" : "flex-end",
                                paddingHorizontal: 10
                            }}
                        >
                            <Text>{m.text}</Text>
                        </View>
                    ))}
                {/*<TextInput
                    style={{
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
                />*/}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
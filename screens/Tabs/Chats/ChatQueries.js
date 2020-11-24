import { gql } from "@apollo/react-hooks";

export const GET_ROOM = gql`
    query getRoom($id: String!) {
        getRoom(id: $id) {
            participants {
                nickname,
                avatar
            }
            messages {
                text,
                file {
                    url
                },
                createdAt
            }
        }
    }
`;

export const GET_ROOMS = gql`
    query getRooms {
        getRooms {
            participants {
                nickname,
                avatar
            }
            messages {
                text,
                from {
                    nickname,
                    avatar
                },
                to {
                    nickname,
                    avatar
                } 
                file {
                    url
                },
                createdAt
            }
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation sendMessage($roomId: String, $text:String!, $toId: String!) {
        sendMessage(roomId: $roomId, text: $text, toId: $toId) {
            text,
            from,
            to,
            file {
                url
            },
            createdAt
        }
    }
`;

export const NEW_MESSAGE = gql`
    subscription newMessage($roomId: String){
        newMessage(roomId: $roomId) {
            text,
            from,
            to,
            file {
                url
            },
            createdAt
        }
    }
`;
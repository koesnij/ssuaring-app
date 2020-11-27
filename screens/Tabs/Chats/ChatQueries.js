import gql from "graphql-tag";

export const GET_ROOM = gql`
    query getRoom($id: String!) {
        getRoom(id: $id) {
            participants {
                id
                nickname,
                avatar
            }
            messages {
                id
                text,
                from {
                    id,
                    nickname,
                    avatar
                },
                to {
                    id,
                    nickname,
                    avatar
                },
                room {
                    id
                }
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
            id
            participants {
                id,
                nickname,
                avatar
            }
            messages {
                id
                text,
                from {
                    id,
                    nickname,
                    avatar
                },
                to {
                    id,
                    nickname,
                    avatar
                },
                room {
                    id
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
            id
            text,
            from {
                id,
                nickname,
                avatar
            },
            to {
                id,
                nickname,
                avatar
            },
            room {
                id
            }
            file {
                url
            },
            createdAt
        }
    }
`;

export const NEW_MESSAGE = gql`
    subscription newMessage($roomId: String!){
        newMessage(roomId: $roomId) {
            id
            text,
            from {
                nickname,
                avatar
            },
            to {
                nickname,
                avatar
            },
            room {
                id
            }
            file {
                url
            },
            createdAt
        }
    }
`;
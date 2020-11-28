import { gql } from '@apollo/react-hooks';

export const ME = gql`
  {
    me {
      id
      name
      nickname
      phoneNumber
      email
      area
      areaAuth
      avatar
      posts {
        id
        files {
          id
          url
        }
      }
      postsCount
      likesCount
      createdAt
    }
  }
`;
export const EDIT_PROFILE = gql`
  mutation editUser($id: String!, $name: String!, $nickname: String!) {
    editUser(id: $id, name: $name, nickname: $nickname) {
      name
    }
  }
`;

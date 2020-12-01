import gql from 'graphql-tag';

export const SEEFULLPOST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      area
      title
      caption
      category
      price
      period
      user {
        id
        name
        avatar
        nickname
      }
      files {
        id
        url
      }
      updatedAt
      createdAt
    }
  }
`;

export const SEARCHPOST = gql`
  query searchPost($term: String!) {
    searchPost {
      id
      area
      title
      caption
      files {
        id
        url
      }
    }
  }
`;

export const SEEALLPOST = gql`
  query seeAllPost {
    seeAllPost {
      id
      area
      title
      caption
      period
      price
      files {
        id
        url
      }
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

////////// post detail 쿼리용

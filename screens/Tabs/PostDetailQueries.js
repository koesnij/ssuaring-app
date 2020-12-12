import { gql } from 'apollo-boost';

export const SEEFULLPOST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      area
      title
      caption
      category_string
      price
      period
      period_string
      user {
        id
        name
        avatar
        nickname
        posts {
          id
          files {
            id
            url
          }
          title
          price
          period_string
          area
        }
        isSelf
        areaAuth
        createdAt
        postsCount
      }
      files {
        id
        url
      }
      reservations {
        id
        review {
          id
          borrower {
            id
            avatar
            nickname
          }
          text
          updatedAt
        }
      }
      isMine
      isLiked
      likeCount
      reservationCount
      updatedAt
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
  {
    seeAllPost {
      id
      area
      title
      caption
      period_string
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

export const MYAREA = gql`
  {
    me {
      id
      area
    }
  }
`;

export const APPLY_RESERVATION = gql`
  mutation applyReservation(
    $postId: String!
    $startDate: String!
    $endDate: String!
  ) {
    applyReservation(
      postId: $postId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`;
////////// post detail 쿼리용

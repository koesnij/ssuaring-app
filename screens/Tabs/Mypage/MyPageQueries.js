import gql from 'graphql-tag';

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
        title
        price
        period
        category

        files {
          id
          url
        }
        caption
      }

      likes {
        post {
          id
          title
          price
          period
          category
          files {
            id
            url
          }
          caption
        }
      }
      myReservation {
        id
        borrower {
          id
          name
        }
        post {
          id
          title
          price
          period
          category
          files {
            id
            url
          }

          caption
        }
        status
        startDate
        endDate
        createdAt
        updatedAt
      }
      postsCount
      likesCount
      createdAt
      myReservation {
        id
      }
    }
  }
`;
//tradeHistory 추가안함
///me 쿼리에 period랑 카테고리 넣으면댐 나는안되는데 너희들은 될듯
export const EDIT_PROFILE = gql`
  mutation editUser($id: String!, $name: String!, $nickname: String!) {
    editUser(id: $id, name: $name, nickname: $nickname) {
      name
      nickname
    }
  }
`;
export const CHANGE_STATUS = gql`
  mutation changeStatus($id: String!, $status: String!) {
    changeStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $title: String!
    $price: String!
    $caption: String!
    $period: Int!
    $category: Int!
  ) {
    editPost(
      id: $id
      title: $title
      price: $price
      caption: $caption
      period: $period
      category: $category
    ) {
      title
      price
      caption
    }
  }
`;

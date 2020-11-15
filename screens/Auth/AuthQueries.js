import { gql } from 'apollo-boost';

export const LOG_IN = gql`
  mutation requestSecret($phoneNumber: String!) {
    requestSecret(phoneNumber: $phoneNumber)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $phoneNumber: String!
    $name: String!
    $nickname: String!
    $email: String!
    $area: String!
  ) {
    createAccount(
      phoneNumber: $phoneNumber
      name: $name
      nickname: $nickname
      email: $email
      area: $area
    )
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $phoneNumber: String!) {
    confirmSecret(secret: $secret, phoneNumber: $phoneNumber)
  }
`;

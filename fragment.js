import { gql } from "apollo-boost";

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    nickname
   
  }
`;
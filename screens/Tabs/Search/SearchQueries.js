import { gql } from "@apollo/react-hooks";

export const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      title
      price
      caption
      area
      
      createdAt
      updatedAt
      files {
        url
      }
      
    }
  }
`;

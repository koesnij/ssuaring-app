import gql from 'graphql-tag';

export const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      title
      price
      caption
      area
      period_string
      createdAt
      updatedAt
      files {
        url
      }
    }
  }
`;

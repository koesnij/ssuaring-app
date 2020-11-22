import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { SEARCH } from "../SearchQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const {
    otherParams: { term },
  } = route.params;
  const { loading, data, refetch } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term: term,
    },
  });
  return (
    <View>
      {loading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <View>
          <Text>{term}</Text>
        </View>
      )}
    </View>
  );
};

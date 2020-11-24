import { useQuery } from "@apollo/client";
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { SEARCH } from "../SearchQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  border:1px solid black;
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
  console.log(data);
  return (
    <ScrollView>
      {loading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        data &&
        data.searchPost ?
        data.searchPost.map((tomato) => (
          <View>
            <Text>{tomato.title}</Text>
            <Text>{tomato.price}</Text>
            <Text>{tomato.caption}</Text>
            <Text>{tomato.area}</Text>
          </View>
        )):
        <View>
          <Text>검색 결과를 찾을 수 없습니다.</Text>
        </View>
      )}
    </ScrollView>
  );
};

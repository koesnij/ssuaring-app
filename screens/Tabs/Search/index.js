import React, { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Input from "../../../components/Input";
import { Header, HeaderLink } from "../../../components/HeaderItem";
import Button from "../../../components/Button";
import TabIcon from "../../../components/TabIcon";
import useInput from "../../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  border: 1px solid black;
`;
const Icon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;
const Text = styled.Text``;

export default ({ navigation }) => {
  const searchInput = useInput("");
  navigation.setOptions({
    headerLeft: () => {
      return (
        <Header>
          <Input placeholder={"빌리고 싶은 게이이 뭐에요"} {...searchInput} />
          <Icon
            onPress={() => {
              navigation.navigate("SearchPage", {
                otherParams: { term : searchInput.value },
              });
            }}
          >
            <TabIcon name="search" />
          </Icon>
        </Header>
      );
    },
  });
 
  useEffect(() => {
    console.log(searchInput.value);
  }, [searchInput.value]);
  return (
    <View>
      <View>
        <Text>최근 검색어</Text>
      </View>
      <View>
        <Text>인기 검색어</Text>
      </View>
    </View>
  );
};

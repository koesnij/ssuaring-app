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
  height:48px;
margin-left:30px;  
  
`;
const Text = styled.Text``;
const TitleText = styled.Text`
  font-size:24px;
`;

export default ({ navigation }) => {
  const searchInput = useInput("");
  navigation.setOptions({
    headerLeft: () => {
      return (
        <Header>
          <Input placeholder={"빌리고 싶은 물건 뭐에요"} {...searchInput} />
          <Icon
            onPress={() => {
              navigation.navigate("SearchPage", {
                otherParams: { term: searchInput.value },
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
        <TitleText>최근검색어</TitleText>

        <Text>title</Text>
        <Text>text</Text>
        <Text>gay</Text>
      </View>
      <View>
        <TitleText>인기 검색어</TitleText>
        <Text>자전거</Text>
        <Text>냄비</Text>
        <Text>오토바이</Text>
      </View>
    </View>
  );
};

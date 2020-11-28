import React, { useEffect } from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { defaultimage } from "../../../../constants";

const View = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { user },
  } = route.params;
  return (
    <ScrollView>
      {user.reviews ? (
        <View />
      ) : (
        <View>
          <Text>리뷰가 없어요</Text>
        </View>
      )}
    </ScrollView>
  );
};

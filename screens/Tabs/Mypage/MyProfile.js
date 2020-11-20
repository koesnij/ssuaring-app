import React, { useEffect } from 'react';
import styled from 'styled-components';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  console.log(navigation);
  
  return (
    <View>
      <Text>내 프로필 화면</Text>
    </View>
  );
};

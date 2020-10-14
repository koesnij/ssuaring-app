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
  useEffect(() => {
    return () => navigation.setParams({ filter: '카테고리' });
  }, []);

  return (
    <View>
      <Text>Filter</Text>
    </View>
  );
};

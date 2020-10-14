import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({ area: '동작구' });
    console.log('filter:', navigation);
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

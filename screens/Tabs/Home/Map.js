import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import styles from '../../../styles';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      // tabBarVisible: false,
    });
  }, [navigation]);
  return (
    <View>
      <Text>Map</Text>
    </View>
  );
};

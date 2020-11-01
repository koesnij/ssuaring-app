import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';

const Container = styled.TouchableOpacity`
  padding: 10px;
`;

const Text = styled.Text``;

export const Header = styled.View`
  flex-direction: row;
  padding: 0px 10px;
`;

export const HeaderLink = ({ str, onPress }) => (
  <Container onPress={onPress}>
    <Text>{str}</Text>
  </Container>
);

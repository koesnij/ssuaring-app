import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';

const Container = styled.TouchableOpacity`
  padding: 10px;
`;

const Text = styled.Text``;

export const Header = styled.View`
  flex-direction: row;
`;

export const HeaderLink = withNavigation(({ navigation, to, str }) => (
  <Container onPress={() => navigation.navigate(to)}>
    <Text>{str}</Text>
  </Container>
));

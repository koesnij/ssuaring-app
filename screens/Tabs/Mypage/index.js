import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useLogOut } from '../../../AuthContext';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const logOut = useLogOut();
  const handler = () => {
    logOut();
  };
  return (
    <View>
      <Button onPress={handler} text="Log Out" />
    </View>
  );
};

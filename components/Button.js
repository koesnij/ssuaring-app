import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import styles from '../styles';
import constants from '../constants';

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  height: 48px;
  width: ${constants.width - 100};
  background-color: ${(props) =>
    props.disabled ? styles.darkGreyColor : styles.blueColor};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const Button = ({ text, onPress, disabled = false, loading = false }) => (
  <Touchable disabled={disabled || loading} onPress={onPress}>
    <Container disabled={disabled}>
      {loading ? <ActivityIndicator color={'white'} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

Button.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;

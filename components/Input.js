import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';
import styles from '../styles';

const Container = styled.View`
  margin-bottom: 10px;
`;
const TextInput = styled.TextInput`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding-left: 12px;
  background-color: ${(props) =>
    props.editable ? styles.greyColor : styles.lightGreyColor};
  border: 1px solid ${styles.lightGreyColor};
  border-radius: 8px;
  font-size: 18px;
`;

const Input = ({
  value,
  onChange,
  placeholder,
  onSubmitEditing = () => null,
  autoCorrect = true,
  keyboardType = 'default',
  autoCapitalize = 'none',
  returnKeyType = 'done',
  editable = true,
  height = 48,
  multiline = false,
  width = constants.width - 100,
}) => (
  <Container>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      editable={editable}
      height={height}
      width={width}
      multiline={multiline}
    />
  </Container>
);
Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['characters', 'words', 'sentences', 'none']),
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
};

export default Input;

import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles';

const TabIcon = ({ name: _name, focused = false, size = 26 }) => {
  const name = `${Platform.OS == 'ios' ? 'ios' : 'md'}-${_name}`;
  return (
    <Ionicons
      name={name}
      color={focused ? styles.blueColor : styles.blackColor}
      size={size}
    />
  );
};

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  size: PropTypes.number,
};

export default TabIcon;

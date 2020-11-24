import React, { useState } from 'react';

const usePicker = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onValueChange = (value) => {
    setValue(value);
  };
  return { value, onValueChange };
};

export default usePicker;

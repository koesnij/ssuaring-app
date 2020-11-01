import React, { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (text) => {
    setValue(text);
  };
  const length = value.length;
  return { value, onChange, length };
};

export default useInput;

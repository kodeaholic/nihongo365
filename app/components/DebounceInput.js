import * as React from 'react';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';
const DebounceInput = props => {
  const {
    style,
    defaultValue = '',
    handleInputChange,
    label = 'Input',
  } = props;
  const debounceFunc = React.useCallback(
    _.debounce(e => handleInputChange(e), 500),
    [],
  );

  const handleChange = e => {
    debounceFunc(e);
  };
  return (
    <TextInput
      label={label}
      onChangeText={handleChange}
      style={style}
      defaultValue={defaultValue}
    />
  );
};

export default DebounceInput;

import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
TextInput.defaultProps.selectionColor = '#5cdb5e';
import _ from 'lodash';
const DebounceInput = props => {
  const {
    style,
    defaultValue = '',
    handleInputChange,
    label = 'Input',
    placeholder = 'Bạn có thể nhập "私", "わたし", hoặc "Tôi"',
  } = props;
  const debounceFunc = React.useCallback(
    _.debounce(e => handleInputChange(e), 1000),
    [],
  );

  const handleChange = e => {
    debounceFunc(e);
  };
  return (
    <TextInput
      label={label}
      onChangeText={handleChange}
      style={[defaultStyle.textInput, style]}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
};

export default DebounceInput;

const defaultStyle = StyleSheet.create({
  textInput: {
    margin: 8,
    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f0f2f5',
    height: 50,
    fontSize: 16,
  },
});

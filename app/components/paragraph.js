import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

function CustomParagraph({ text }) {
  return <Paragraph style={styles.paragraph}>{text}</Paragraph>;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Regular',
    letterSpacing: 1.5,
  },
});

export default CustomParagraph;

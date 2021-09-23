import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function Logo() {
  return <Image source={require('../assets/logo.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: width / 1.5,
    height: width / 1.5,
    marginBottom: 8,
  },
});

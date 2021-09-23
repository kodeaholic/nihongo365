import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { theme } from '../theme/authTheme';
const { width, height } = Dimensions.get('window');
export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: width - 40,
    maxWidth: width - 40,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 0,
  },
});

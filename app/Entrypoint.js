/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';
const { persistor, store } = configureStore();

const fontConfig = {
  // web: {
  //   regular: {
  //     fontFamily: 'sans-serif',
  //     fontWeight: 'normal',
  //   },
  //   medium: {
  //     fontFamily: 'sans-serif-medium',
  //     fontWeight: 'normal',
  //   },
  //   light: {
  //     fontFamily: 'sans-serif-light',
  //     fontWeight: 'normal',
  //   },
  //   thin: {
  //     fontFamily: 'sans-serif-thin',
  //     fontWeight: 'normal',
  //   },
  // },
  // ios: {
  //   regular: {
  //     fontFamily: 'sans-serif',
  //     fontWeight: 'normal',
  //   },
  //   medium: {
  //     fontFamily: 'sans-serif-medium',
  //     fontWeight: 'normal',
  //   },
  //   light: {
  //     fontFamily: 'sans-serif-light',
  //     fontWeight: 'normal',
  //   },
  //   thin: {
  //     fontFamily: 'sans-serif-thin',
  //     fontWeight: 'normal',
  //   },
  // },
  android: {
    regular: {
      fontFamily: 'SF-Pro-Display-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'SF-Pro-Display-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'SF-Pro-Display-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'SF-Pro-Display-Thin',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'SF-Pro-Display-Bold',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2c3e50',
    accent: '#00aea2',
    background: '#f0f6f9',
    text: '#34495e',
  },
  fonts: configureFonts(fontConfig),
};

export default function Entrypoint() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

import React from 'react';
import { WebView } from 'react-native-webview';

export const ChuHanView = ({ route, navigation }) => {
  const { svgSrc } = route.params;
  return <WebView originWhitelist={['*']} source={{ uri: svgSrc }} />;
};

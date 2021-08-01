/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { apiConfig } from '../../api/config/apiConfig';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};
export const ReadingLesson = ({ route, navigation }) => {
  const { lessonId } = route.params;
  let url = `${
    apiConfig.baseUrl
  }/#/reading-boards/getBoard/webview/${lessonId}`;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log('Mounted');
    navigation.setOptions({ title: 'Luyện đọc' });
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: url }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadStart={() => setVisible(true)}
          onLoad={() => setVisible(false)}
        />
        {visible ? <ActivityIndicatorElement /> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
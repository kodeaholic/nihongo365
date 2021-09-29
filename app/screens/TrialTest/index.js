/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { apiConfig } from '../../api/config/apiConfig';
import { useSelector } from 'react-redux';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { PROGRAM_IDS, PROGRAM_TYPES } from '../Programs/data';
import _ from 'lodash';
const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};
export const TrialTest = ({ route, navigation }) => {
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const trialTest = useSelector(state => state.programReducer.trialTest);
  const { itemId } = route.params;
  let url = `${apiConfig.baseUrl}/#/trial-tests/getTrialTest/webview/${itemId}`;
  const [visible, setVisible] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    // check if this is a completed item
    let unsubscribe;
    if (user && user.id) {
      try {
        unsubscribe = firestore()
          .collection('USERS')
          .doc(user.id)
          .collection('COMPLETED_ITEMS')
          .onSnapshot(querySnapshot => {
            const items = querySnapshot.docs
              .filter(documentSnapshot => {
                return documentSnapshot.id === trialTest.item.id;
              })
              .map(filteredSnapshot => {
                const item = {
                  id: filteredSnapshot.id,
                  ...filteredSnapshot.data(),
                };
                return item;
              });
            if (!_.isEmpty(items)) {
              setCompleted(true);
            } else {
              setCompleted(false);
            }
          });
      } catch (e) {
        ToastAndroid.showWithGravityAndOffset(
          'Có lỗi trong quá trình lưu. Vui lòng thử lại sau',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      }
    }
    let item = { ...trialTest.item };
    delete item.content;
    delete item.quiz;
    delete item.createdAt;
    delete item.updatedAt;
    delete item.free;
    delete item.grammarContent;
    delete item.listeningAudioSrc;
    delete item.listeningContent;
    delete item.quizGroups;
    delete item.readingContent;
    delete item.time_part_1;
    delete item.time_part_2;
    delete item.vocabularyContent;
    navigation.setOptions({
      headerProps: {
        title: 'Thi thử ' + selectedLevel,
        rightAction: {
          lessonCheck: {
            program: PROGRAM_TYPES[PROGRAM_IDS.THITHU],
            item: item,
            level: selectedLevel,
            completed: completed,
          },
        },
      },
    });
    return () => unsubscribe && unsubscribe();
  }, [navigation, selectedLevel, trialTest, user, completed]);
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

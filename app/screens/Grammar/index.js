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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { PROGRAM_IDS, PROGRAM_TYPES } from '../Programs/data';
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { AD_UNIT_IDS, INTERSTITIAL_KEYWORDS } from '../../constants/ads';
const interstitial = InterstitialAd.createForAdRequest(
  AD_UNIT_IDS.INTERSTITIAL,
  {
    requestNonPersonalizedAdsOnly: false,
    keywords: INTERSTITIAL_KEYWORDS,
  },
);
const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};
export const Grammar = ({ route, navigation }) => {
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const { itemId } = route.params;
  let url = `${apiConfig.baseUrl}/#/grammar/getGrammar/webview/${itemId}`;
  const [visible, setVisible] = useState(false);
  const selectedGrammarLesson = useSelector(
    state => state.programReducer.selectedGrammarLesson,
  );
  const user = useSelector(state => state.userReducer.user);
  const [completed, setCompleted] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  useEffect(() => {
    // check if this is a completed item
    let unsubscribe;
    if (selectedGrammarLesson && !_.isEmpty(selectedGrammarLesson.item)) {
      if (user && user.id) {
        unsubscribe = firestore()
          .collection('USERS')
          .doc(user.id)
          .collection('COMPLETED_ITEMS')
          .onSnapshot(querySnapshot => {
            const items = querySnapshot.docs
              .filter(documentSnapshot => {
                return documentSnapshot.id === selectedGrammarLesson.item.id;
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
      }
      let item = { ...selectedGrammarLesson.item };
      delete item.content;
      delete item.createdAt;
      delete item.updatedAt;
      delete item.example;
      delete item.free;
      delete item.meaning;
      delete item.quiz;
      delete item.usage;
      delete item.name;
      navigation.setOptions({
        headerProps: {
          title: 'Ngữ pháp ' + selectedLevel,
          rightAction: {
            lessonCheck: {
              program: PROGRAM_TYPES[PROGRAM_IDS.GRAMMAR],
              item: item,
              level: selectedLevel,
              completed: completed,
            },
          },
        },
      });
    }

    // ads
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setAdLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    if (user.role !== 'admin') {
      interstitial.load();
    }

    return () => {
      unsubscribe && unsubscribe();
      eventListener();
    };
  }, [navigation, selectedLevel, selectedGrammarLesson, user, completed]);

  useEffect(() => {
    if (adLoaded !== false && interstitial.loaded) {
      interstitial.show();
    }
  }, [adLoaded]);

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

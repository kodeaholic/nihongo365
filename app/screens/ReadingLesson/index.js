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
import { STATUS } from '../../constants/payment.constants';
import { RegisterPopup } from '../../components/registerPopup';
import _ from 'lodash';
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
export const ReadingLesson = ({ route, navigation }) => {
  const { lesson } = route.params;
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const selectedReadingLesson = useSelector(
    state => state.programReducer.selectedReadingLesson,
  );
  let url = `${apiConfig.baseUrl}/#/reading-boards/getBoard/webview/${
    lesson.id
  }`;
  const [visible, setVisible] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const [completed, setCompleted] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
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
                return documentSnapshot.id === selectedReadingLesson.board.id;
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
    let item = { ...selectedReadingLesson.board };
    delete item.content;
    delete item.content_vn;
    delete item.quiz;
    delete item.tooltipContent;
    delete item.createdAt;
    delete item.updatedAt;
    delete item.free;
    navigation.setOptions({
      headerProps: {
        title: 'Luyện đọc ' + selectedLevel,
        subtitle: selectedReadingLesson.board.title,
        rightAction: {
          lessonCheck: {
            program: PROGRAM_TYPES[PROGRAM_IDS.READING],
            item: item,
            level: selectedLevel,
            completed: completed,
          },
        },
      },
    });
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
  }, [navigation, selectedLevel, selectedReadingLesson, user, completed]);

  useEffect(() => {
    if (adLoaded !== false && interstitial.loaded) {
      interstitial.show();
    }
  }, [adLoaded]);

  /* popup */
  const [popupVisible, setPopupVisible] = useState(false);
  const [service, setService] = useState(selectedLevel); // fetch from fire-store
  useEffect(() => {
    if (selectedLevel !== 'N5' && lesson && false) {
      //lesson.free !== 1
      async function getDoc() {
        let docRef;
        if (user && user.id) {
          try {
            docRef = firestore()
              .collection('services')
              .doc(user.id)
              .collection('SERVICES')
              .doc(selectedLevel);
            let doc = await docRef.get();
            doc = doc.data();
            if (_.isEmpty(doc) || doc.status !== STATUS.SUCCESS.value) {
              setTimeout(() => setPopupVisible(true), 10000);
              setService(selectedLevel);
            } else {
              setPopupVisible(false);
              setService('');
            }
          } catch (e) {
            setPopupVisible(true);
            setService(selectedLevel);
          }
        }
      }
      getDoc();
    }
  }, [user, selectedLevel, lesson]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!_.isEmpty(service) && popupVisible && (
        <RegisterPopup
          service={service}
          visible={popupVisible}
          setVisible={setPopupVisible}
        />
      )}
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

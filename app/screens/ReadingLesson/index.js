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
import { STATUS } from '../../constants/payment.constants';
import { RegisterPopup } from '../../components/registerPopup';
import _ from 'lodash';
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
  useEffect(() => {
    navigation.setOptions({
      headerProps: {
        title: 'Luyện đọc ' + selectedLevel,
        subtitle: selectedReadingLesson.board.title,
      },
    });
  }, [navigation, selectedLevel, selectedReadingLesson.board.title]);
  /* popup */
  const [popupVisible, setPopupVisible] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const [service, setService] = useState(selectedLevel); // fetch from fire-store
  useEffect(() => {
    if (selectedLevel !== 'N5' && lesson && lesson.free !== 1) {
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

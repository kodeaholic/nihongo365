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
  Dimensions,
  ToastAndroid,
} from 'react-native';
import _ from 'lodash';
import { authHeader } from '../../api/authHeader';
import { htmlEntityDecode } from '../../helpers/htmlentities';
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const floorW = Math.floor(windowWidth);
const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};
export const NewsDetail = ({ route, navigation }) => {
  const selectedNewsArticle = useSelector(
    state => state.programReducer.selectedNewsArticle.item,
  );
  const { itemId } = route.params;
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!_.isEmpty(selectedNewsArticle)) {
      navigation.setOptions({
        headerProps: {
          title: 'Bảng tin',
          disableBackButton: false,
          leftAction: undefined,
          subtitle: selectedNewsArticle.parent
            ? _.get(selectedNewsArticle, 'parent.title')
            : undefined,
        },
      });
    }

    // async wrapper
    const fetchItem = async () => {
      const headers = await authHeader();
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      let API_URL = `${apiConfig.baseUrl}${
        apiConfig.apiEndpoint
      }/news/${itemId.toString()}?mobile=1&clientWidth=${floorW}`; //
      try {
        const response = await fetch(API_URL, requestOptions);
        const res = await response.json();
        if (res.code) {
          ToastAndroid.showWithGravityAndOffset(
            'Kết nối mạng không ổn định. Vui lòng thử lại sau',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100,
          );
        } else {
          if (_.isEmpty(res)) {
            const msg = 'Bài viết không tồn tại hoặc đã bị xóa';
            ToastAndroid.showWithGravityAndOffset(
              msg,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
            navigation.navigate('News');
          } else {
            setItem(res);
            console.log(htmlEntityDecode(res.content));
          }
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(
          'Kết nối mạng không ổn định. Vui lòng thử lại sau',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
        navigation.navigate('News');
      }
      setLoading(false);
    };
    fetchItem();
  }, [navigation, selectedNewsArticle, itemId]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {!loading && (
          <WebView
            style={{ flex: 1 }}
            source={{
              html: item && item.content ? htmlEntityDecode(item.content) : '',
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoadStart={() => {}}
            onLoad={() => setLoading(false)}
          />
        )}
        {loading ? <ActivityIndicatorElement /> : null}
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

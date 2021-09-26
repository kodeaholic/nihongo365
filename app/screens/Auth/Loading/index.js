import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { apiConfig } from '../../../api/config/apiConfig';
import { authHeader } from '../../../api/authHeader';
import _ from 'lodash';
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._versionCheck();
    this._bootstrapAsync();
  }

  _versionCheck = async () => {
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded && res.storeUrl) {
        ToastAndroid.showWithGravityAndOffset(
          'Ứng dụng đã có phiên bản mới. Vui lòng cập nhật phiên bản mới nhất',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
        Linking.openURL(res.storeUrl);
      }
    });
  };

  _apiTest = async () => {
    let flag = true;
    const headers = await authHeader();
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/cards`;
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.code) {
        ToastAndroid.showWithGravityAndOffset(
          'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
        flag = false;
      } else {
        flag = true;
      }
    } catch (error) {
      flag = false;
    }
    return flag;
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('tokens');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const navigateHome = {
      index: 0,
      routes: [{ name: 'Main' }],
    };
    const navigateStartScreen = {
      index: 0,
      routes: [{ name: 'StartScreen' }],
    };
    let target;
    let apiTest = await this._apiTest();
    if (_.isEmpty(userToken)) {
      target = navigateStartScreen;
    } else {
      target = apiTest ? navigateHome : navigateStartScreen;
    }
    this.props.navigation.reset(target);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AuthLoadingScreen;

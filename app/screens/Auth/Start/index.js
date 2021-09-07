/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
// import Button from '../../../components/Button';
// import { CommonActions } from '@react-navigation/native';
import Paragraph from '../../../components/Paragraph';
import { ToastAndroid, ActivityIndicator } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { apiConfig } from '../../../api/config/apiConfig';
import { SOCIAL_PROVIDER } from '../../../constants/socialAuth';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../actions/userActions';
import firestore from '@react-native-firebase/firestore';
firestore().settings({
  ignoreUndefinedProperties: true,
});
export default function StartScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (!_.isEmpty(result) && result.user && result.tokens) {
      try {
        (async () => {
          await AsyncStorage.setItem('user', JSON.stringify(result.user));
          await AsyncStorage.setItem('tokens', JSON.stringify(result.tokens));
        })();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        // navigation.dispatch({
        //   ...CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'AnotherStackNavigator' }],
        //   }),
        // });
      } catch (error) {
        // Error saving data
        ToastAndroid.showWithGravityAndOffset(
          'Đăng nhập thất bại. Vui lòng thử lại',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      }
    } else if (!_.isEmpty(result)) {
      ToastAndroid.showWithGravityAndOffset(
        'Đăng nhập thất bại. Vui lòng thử lại',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
    }
  }, [navigation, result]);
  const _googleSignIn = async () => {
    setLoading(true);
    dispatch(userActions.socialLogin());
    GoogleSignin.configure({
      androidClientId:
        '401904380301-i04gskn6e842tbn5u452jth603uugmk8.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      try {
        let url = `${apiConfig.baseUrl}${
          apiConfig.apiEndpoint
        }/auth/social-login`;
        const headers = {
          'Content-Type': 'application/json',
        };
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            userSocialDetails: {
              provider: SOCIAL_PROVIDER.GOOGLE,
              userInfo: userInfo,
            },
          }),
        };
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          if (data.code) {
            dispatch(userActions.socialLoginFailed());
          } else {
            let user = _.get(data, 'user');
            if (
              user.socialUserDetails &&
              typeof user.socialUserDetails === 'string'
            ) {
              user.socialUserDetails = JSON.parse(user.socialUserDetails);
            }
            dispatch(userActions.socialLoginSucceeded({ user }));
            // add or update users collection in firestore
            try {
              let clone = Object.assign({}, user);
              delete clone.id;
              firestore()
                .collection('USERS')
                .doc(user.id)
                .set(clone);
            } catch (error) {
              // console.log(error)
            }
          }
          setResult(data);
          setLoading(false);
          return data;
        } catch (error) {
          dispatch(userActions.socialLoginFailed());
          return error;
        }
      } catch (error) {
        dispatch(userActions.socialLoginFailed());
      }
    } catch (error) {
      dispatch(userActions.socialLoginFailed());
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravityAndOffset(
          'Bạn đã hủy yêu cầu đăng nhập. Vui lòng đăng nhập lại',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
        // console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // console.log('is in progress already');
        ToastAndroid.showWithGravityAndOffset(
          'Đang trong quá trình xác thực tài khoản Google của bạn',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravityAndOffset(
          'Nihongo365 yêu cầu điện thoại của bạn đang chạy Google Play Services',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Không thể đăng nhập bằng tài khoản Google này. Vui lòng thử lại với một tài khoản khác',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      }
    }
  };
  return (
    <Background>
      <Logo />
      <Header>Welcome</Header>
      <Paragraph>
        Chào mừng bạn đến với app học tiếng Nhật số 1 Việt Nam
      </Paragraph>
      {!loading && (
        <GoogleSigninButton
          style={{
            width: '100%',
            height: 55,
            marginVertical: 10,
            paddingVertical: 2,
          }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_googleSignIn}
        />
      )}
      {loading && <ActivityIndicator size="large" />}
      {/* <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Đăng nhập
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Đăng ký
      </Button> */}
    </Background>
  );
}

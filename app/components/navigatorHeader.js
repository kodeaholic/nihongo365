/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  BackHandler,
  Alert,
  ToastAndroid,
  Text,
  Image,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/userActions';
import { getCurrentTime, getPostTimeFromCreatedAt } from '../helpers/time';
export const Header = props => {
  const user = useSelector(state => state.userReducer.user);
  const confirmExit = text => {
    Alert.alert('Thông báo', `${text}`, [
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'THOÁT', onPress: () => BackHandler.exitApp() },
    ]);
  };
  const {
    title = '',
    subtitle,
    disableBackButton = false,
    customStyles,
    enableLogoutButton = true,
    leftAction = {},
    screen = '',
    centerTitle = false,
  } = props;
  const navigation = useNavigation();
  const _goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      confirmExit('Bạn muốn thoát ứng dụng?');
    }
  };
  const dispatch = useDispatch();
  let contentProps = {
    titleStyle: !centerTitle
      ? styles.title
      : { color: '#fff', textAlign: 'center', alignItems: 'center' },
    title: title,
  };
  if (!_.isEmpty(subtitle)) {
    contentProps = {
      ...contentProps,
      subtitle: subtitle,
      subtitleStyle: styles.subTitle,
      titleStyle: [styles.title, { marginTop: 5 }],
    };
  }
  if (screen === 'MORE') {
    contentProps = {
      ...contentProps,
      title: user.name,
    };
    // console.log(user);
  }
  return (
    <Appbar.Header
      style={[
        styles.header,
        customStyles,
        // screen === 'MORE'
        //   ? { alignItems: 'center', justifyContent: 'center' }
        //   : {},
      ]}>
      {!disableBackButton && (
        <Appbar.BackAction color="#fff" onPress={_goBack} />
      )}
      {!_.isEmpty(leftAction) && (
        <Appbar.Action
          icon={leftAction.icon ? leftAction.icon : 'table-of-contents'}
          color={leftAction.color ? leftAction.color : '#fff'}
          onPress={() => leftAction.action && leftAction.action(true)}
        />
      )}
      {screen !== 'MORE' && <Appbar.Content {...contentProps} />}
      {screen === 'MORE' && (
        <>
          <Image
            style={{
              width: 52,
              height: 52,
              padding: 0,
              margin: 0,
              borderRadius: 52 / 2,
              backgroundColor: '#fff',
              borderWidth: 2,
              borderColor: 'rgba(63, 195, 128, 1)',
              marginLeft: 2,
            }}
            source={
              user.photo
                ? { uri: user.photo }
                : require('../assets/default_avatar.png')
            }
            resizeMethod="auto"
          />

          {!_.isEmpty(user.name) && (
            <View
              style={{ marginLeft: 5, padding: 2, marginTop: 0, height: 56 }}>
              <Text
                style={{
                  flex: 1,
                  color: '#fff',
                  fontFamily: 'SF-Pro-Detail-Regular',
                  fontSize: 17,
                  fontWeight: 'normal',
                  textAlign: 'left',
                  marginTop: 0,
                }}>
                {user.name}
              </Text>
              <Text
                style={{
                  paddingTop: 9,
                  flex: 1,
                  color: '#fff',
                  fontFamily: 'SF-Pro-Detail-Regular',
                  fontSize: 11,
                  fontWeight: 'normal',
                  textAlign: 'left',
                  marginTop: 0,
                }}>
                Gia nhập: {getPostTimeFromCreatedAt(user.createdAt)}
              </Text>
            </View>
          )}
        </>
      )}
      {enableLogoutButton && (
        <Appbar.Action
          color="#fff"
          icon="exit-to-app"
          onPress={() => {
            Alert.alert('Thông báo', 'Bạn muốn đăng xuất khỏi tài khoản?', [
              {
                text: 'Hủy',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'ĐĂNG XUẤT',
                onPress: () => {
                  const logout = async () => {
                    try {
                      GoogleSignin.configure({
                        androidClientId:
                          '401904380301-i04gskn6e842tbn5u452jth603uugmk8.apps.googleusercontent.com',
                      });
                      try {
                        await GoogleSignin.signInSilently();
                        try {
                          await GoogleSignin.revokeAccess();
                          await GoogleSignin.signOut();
                        } catch (error) {
                          // console.error(error);
                        }
                      } catch (error) {
                        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                          // user has not signed in yet
                        } else {
                          // some other error
                        }
                      }
                    } catch (e) {
                      // console.log(e);
                    }
                    dispatch(userActions.socialLoginFailed());
                    AsyncStorage.removeItem('user');
                    AsyncStorage.removeItem('tokens');
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'StartScreen' }],
                    });
                    ToastAndroid.showWithGravityAndOffset(
                      'Đăng xuất thành công',
                      ToastAndroid.LONG,
                      ToastAndroid.TOP,
                      0,
                      100,
                    );
                  };
                  logout();
                },
              },
            ]);
          }}
        />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5cdb5e',
    textAlign: 'center',
    height: 56,
  },
  backButton: {},
  title: { color: '#fff', marginLeft: -4 },
  subTitle: { color: '#fff', marginLeft: -4, marginBottom: 5, fontSize: 15 },
  action: { color: '#fff' },
});

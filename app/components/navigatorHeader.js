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
import { getPostTimeFromCreatedAt } from '../helpers/time';
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
      subtitleStyle: [styles.subTitle, { paddingBottom: 10 }],
      titleStyle: [styles.title, { paddingTop: 10 }],
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
    <Appbar.Header style={[styles.header, customStyles]}>
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

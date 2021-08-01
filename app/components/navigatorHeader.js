import React from 'react';
import { StyleSheet, BackHandler, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
export const Header = props => {
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
    title,
    subtitle,
    disableBackButton = false,
    customStyles,
    enableLogoutButton = true,
    center = false,
  } = props;
  const navigation = useNavigation();
  const _goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      confirmExit('Bạn muốn thoát ứng dụng?');
    }
  };
  return (
    <Appbar.Header style={[styles.header, customStyles]}>
      {!disableBackButton && (
        <Appbar.BackAction color="#fff" onPress={_goBack} />
      )}
      {subtitle && (
        <Appbar.Content
          titleStyle={styles.title}
          title={title}
          subtitle={subtitle}
          subtitleStyle={styles.subTitle}
        />
      )}
      {!subtitle && <Appbar.Content titleStyle={styles.title} title={title} />}
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
                    const isSignedIn = await GoogleSignin.isSignedIn();
                    if (isSignedIn) {
                      try {
                        await GoogleSignin.revokeAccess();
                        await GoogleSignin.signOut();
                      } catch (error) {
                        console.error(error);
                      }
                    }
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
  },
  backButton: {},
  title: { color: '#fff', marginLeft: -4 },
  subTitle: { color: '#fff', marginLeft: -4, marginBottom: 5, fontSize: 15 },
  action: { color: '#fff' },
});

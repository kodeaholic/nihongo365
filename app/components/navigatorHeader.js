/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  BackHandler,
  Alert,
  Text,
  Image,
  View,
  Platform,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Menu } from 'react-native-paper';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { getPostTimeFromCreatedAt } from '../helpers/time';
import firestore from '@react-native-firebase/firestore';

const completeItem = async (user, item, level, program) => {
  let clone = { ...item };
  delete clone.id;
  try {
    await firestore()
      .collection('USERS')
      .doc(user.id)
      .collection('COMPLETED_ITEMS')
      .doc(item.id)
      .set(
        {
          ...clone,
          level,
          program,
          createdAt: Date.now(),
        },
        { merge: true },
      );
  } catch (e) {
    ToastAndroid.showWithGravityAndOffset(
      'Có lỗi trong quá trình lưu. Vui lòng thử lại sau',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      100,
    );
  }
};

const uncompleteItem = async (user, item) => {
  try {
    await firestore()
      .collection('USERS')
      .doc(user.id)
      .collection('COMPLETED_ITEMS')
      .doc(item.id)
      .delete();
  } catch (e) {
    ToastAndroid.showWithGravityAndOffset(
      'Có lỗi trong quá trình lưu. Vui lòng thử lại sau',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      100,
    );
  }
};

const RightMenuButtonCheck = props => {
  const user = useSelector(state => state.userReducer.user);
  const { completed, item, level, program } = props;
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const starIcon = completed ? 'star' : 'star-outline';
  const navigation = useNavigation();
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Appbar.Action
          icon={starIcon}
          color="white"
          onPress={() => {
            if (!completed) {
              completeItem(user, item, level, program);
              ToastAndroid.showWithGravityAndOffset(
                'Đã đánh dấu hoàn thành bài',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100,
              );
            } else {
              uncompleteItem(user, item);
              ToastAndroid.showWithGravityAndOffset(
                'Đã đánh dấu chưa hoàn thành bài',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100,
              );
            }
          }}
        />
      }>
      {/* <Menu.Item
        onPress={() => {
          if (!completed) {
            completeItem(user, item, level, program);
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          } else {
            uncompleteItem(user, item);
          }
          closeMenu();
        }}
        title={completed ? 'Đánh dấu chưa hoàn thành' : 'Hoàn thành bài này'}
        titleStyle={{ fontFamily: 'SF-Pro-Detail-Regular', color: '#000' }}
      /> */}
    </Menu>
  );
};
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
    rightAction = { lessonCheck: {} },
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
      {/* {!_.isEmpty(rightAction.lessonCheck) && (
        <RightMenuButtonCheck {...rightAction.lessonCheck} />
      )} */}
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

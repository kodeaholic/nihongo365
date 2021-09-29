/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  BackHandler,
  Alert,
  Text,
  Image,
  View,
  // Platform,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Menu } from 'react-native-paper';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getPostTimeFromCreatedAt } from '../helpers/time';
import { apiConfig } from '../api/config/apiConfig';
import { authHeader } from '../api/authHeader';
import { userActions } from '../actions/userActions';

const updateCompletedItems = async (
  user,
  item,
  level,
  program,
  dispatch,
  type = 'add',
) => {
  let completedItems = _.isArray(user.completedItems)
    ? [...user.completedItems]
    : [];
  completedItems = completedItems.filter(
    itm =>
      itm.itemId !== item.id && itm.level !== level && itm.program !== program,
  );
  if (type === 'add') {
    completedItems.push({
      itemId: item.id,
      level,
      program,
      content: program + '-' + level,
      time: Date.now(),
    });
  }
  const headers = await authHeader();
  const requestOptions = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ completedItems }),
  };
  let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/users/${user.id}`;
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    if (data.code) {
      ToastAndroid.showWithGravityAndOffset(
        'Có lỗi trong quá trình lưu. Thử lại sau',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
    } else {
      // trigger store update
      dispatch(userActions.completedItemsUpdated({ completedItems }));
    }
  } catch (error) {
    ToastAndroid.showWithGravityAndOffset(
      'Có lỗi trong quá trình lưu. Thử lại sau',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      100,
    );
  }
};

const RightMenuButtonCheck = props => {
  const { item, level, program, user } = props;
  const completedItems = user.completedItems || [];
  const index = _.findIndex(completedItems, function(itm) {
    return (
      itm.itemId === item.id && itm.level === level && itm.program === program
    );
  });
  const completed = index >= 0;
  const [visible, setVisible] = React.useState(false);
  // const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const starIcon = completed ? 'star' : 'star-outline';
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
              updateCompletedItems(user, item, level, program, dispatch, 'add');
              navigation.goBack();
            } else {
              updateCompletedItems(
                user,
                item,
                level,
                program,
                dispatch,
                'remove',
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
      {!_.isEmpty(rightAction.lessonCheck) && (
        <RightMenuButtonCheck {...rightAction.lessonCheck} user={user} />
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

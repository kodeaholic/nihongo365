import React, { useEffect, useState } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   PermissionsAndroid,
// } from 'react-native';
// import { Header, NavigationActions } from 'react-navigation';
// import { AudioRecorder, AudioUtils } from 'react-native-audio';
// import RNFS from 'react-native-fs';
// import Sound from 'react-native-sound';
import { ChatScreen } from 'react-native-easy-chat-ui';
import { v4 as uuidv4 } from 'uuid';
import { isIphoneX } from '../../lib/isIphoneX';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { ToastAndroid, Image } from 'react-native';
import { ROOM_TYPES } from '../../constants/chat.constants';
const isIPX = isIphoneX();
export const Chat = ({ route, navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const { roomId } = route.params;
  const [userProfile, setUserProfile] = useState(undefined);
  const [loading, setLoading] = useState(false);
  // const defaultMessages = [
  //   {
  //     id: uuidv4(),
  //     type: 'text',
  //     content:
  //       'Chào mừng bạn đến với Nihongo365. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi',
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('app/assets/logo.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: true,
  //     sendStatus: 0,
  //     time: '1542006036549',
  //     isIPhoneX: isIPX,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: 'text',
  //     content: 'hi/{se}',
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('app/assets/logo.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: true,
  //     sendStatus: 0,
  //     time: '1542106036549',
  //     isIPhoneX: isIPX,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: 'image',
  //     content: {
  //       uri:
  //         'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
  //       width: 100,
  //       height: 80,
  //     },
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('app/assets/logo.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: false,
  //     sendStatus: 0,
  //     time: '1542106037000',
  //     isIPhoneX: isIPX,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: 'text',
  //     content: 'Hi Admin/{weixiao}',
  //     targetId: '88886666',
  //     chatInfo: {
  //       avatar: require('app/assets/logo.png'),
  //       id: '12345678',
  //     },
  //     renderTime: true,
  //     sendStatus: -2,
  //     time: '1542177036549',
  //     isIPhoneX: isIPX,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: 'voice',
  //     content: {
  //       uri:
  //         'http://m10.music.126.net/20190810141311/78bf2f6e1080052bc0259afa91cf030d/ymusic/d60e/d53a/a031/1578f4093912b3c1f41a0bfd6c10115d.mp3',
  //       length: 10,
  //     },
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('app/assets/logo.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: true,
  //     sendStatus: 1,
  //     time: '1542260667161',
  //     isIPhoneX: isIPX,
  //   },
  //   {
  //     id: uuidv4(),
  //     type: 'voice',
  //     content: {
  //       uri:
  //         'http://m10.music.126.net/20190810141311/78bf2f6e1080052bc0259afa91cf030d/ymusic/d60e/d53a/a031/1578f4093912b3c1f41a0bfd6c10115d.mp3',
  //       length: 30,
  //     },
  //     targetId: '88886666',
  //     chatInfo: {
  //       avatar: require('app/assets/logo.png'),
  //       id: '12345678',
  //     },
  //     renderTime: true,
  //     sendStatus: 1,
  //     time: '1542264667161',
  //     isIPhoneX: isIPX,
  //   },
  // ];
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (!_.isEmpty(user) && !_.isEmpty(roomId)) {
      setLoading(true);
      const isAdmin = _.get(user, 'role', 'user') === 'admin';
      if (isAdmin) {
        setUserProfile({
          id: 'ADMIN_ID',
          avatar: 'ADMIN_AVATAR',
          nickName: 'Admin',
        });
      } else {
        setUserProfile({
          id: user.id,
          avatar: user.photo,
          nickName: user.name,
        });
      }
      unsubscribe = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('MESSAGES')
        .onSnapshot(querySnapshot => {
          let items = querySnapshot.docs.map(msg => {
            let item = {
              id: msg.id,
              ...msg.data(),
            };
            if (_.get(item, 'chatInfo.avatar' === 'ADMIN_AVATAR')) {
              item.chatInfo.avatar = require('../../assets/logo.png');
              item.chatInfo.id = 'ADMIN_ID';
              item.chatInfo.nickName = 'Admin';
            }
            console.log(item);
            return item;
          });
          setMessages(msgs => items);
        });
    }
    if (_.isEmpty(roomId)) {
      ToastAndroid.showWithGravityAndOffset(
        'Kênh chat không tồn tại',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
      navigation.navigate('ChatRooms');
    }
    return () => unsubscribe && unsubscribe();
  }, [user, roomId, navigation]);
  const sendMessage = (type, content, isInverted) => {
    // console.log(type, content, isInverted);
    const lastMessage = {
      type: 'text',
      content: content,
      targetId: user.role === 'admin' ? 'ADMIN_ID' : user.id, // id of person sent the message
      chatInfo: {
        // info of the person we are chatting with
        avatar:
          user.role !== 'admin' ? require('../../assets/logo.png') : user.photo,
        id: user.role !== 'admin' ? 'ADMIN_ID' : user.id,
        nickName: user.role !== 'admin' ? 'Admin' : user.name,
      },
      renderTime: true,
      sendStatus: 1,
      time: Date.now(),
      isIPhoneX: isIPX,
    };
    const uuid = uuidv4();
    try {
      firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('MESSAGES')
        .doc(uuid)
        .set(lastMessage)
        .then(() => {
          firestore()
            .collection('rooms')
            .doc(roomId)
            .set(
              {
                lastMessage,
              },
              { merge: true },
            )
            .then(() => {
              // console.log(
              //   'Created new room with Admin and be welcomed!',
              // );
            });
        });
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      {!_.isEmpty(messages) && (
        <ChatScreen
          messageList={messages}
          sendMessage={sendMessage}
          placeholder="Nhập tin nhắn..."
          useEmoji={false}
          useVoice={false}
          usePlus={false}
          userProfile={userProfile}
        />
      )}
    </>
  );
};

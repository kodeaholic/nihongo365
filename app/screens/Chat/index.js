/* eslint-disable react-native/no-inline-styles */
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
import {
  ToastAndroid,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ROOM_TYPES } from '../../constants/chat.constants';
import { getCurrentTime } from '../../helpers/time';
const { width, height } = Dimensions.get('window');
const isIPX = isIphoneX();
const renderMessageTime = time => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
    <View
      style={{
        backgroundColor: '#e6e6e6',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16,
      }}>
      <Text style={{ color: '#333', fontSize: 10 }}>
        {getCurrentTime(parseInt(time))}
      </Text>
    </View>
  </View>
);
export const Chat = ({ route, navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const { roomId, roomInfo } = route.params;
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
    const getRoomName = (info = {}) => {
      switch (info.type) {
        case ROOM_TYPES.MEVSADMIN:
          return user.role === 'user' ? 'Admin' : info.name;
        case ROOM_TYPES.GROUP:
          return info.name;
      }
    };
    /** Update header */
    const title = getRoomName(roomInfo);
    navigation.setOptions({ headerProps: { title, disableBackButton: true } });
    let unsubscribe;
    let items;
    if (!_.isEmpty(user) && !_.isEmpty(roomId)) {
      setLoading(true);
      const isAdmin = _.get(user, 'role') === 'admin';
      if (isAdmin) {
        setUserProfile({
          id: 'ADMIN_ID',
          avatar: require('../../assets/logo.png'),
        });
      } else {
        setUserProfile({
          id: user.id,
          avatar: user.photo
            ? user.photo
            : require('../../assets/default_avatar.png'),
        });
      }
      unsubscribe = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('MESSAGES')
        .orderBy('time', 'desc')
        .onSnapshot(querySnapshot => {
          items = querySnapshot.docs.map(msg => {
            let item = {
              id: msg.id,
              ...msg.data(),
            };
            // console.log(item);
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
  }, [user, roomId, roomInfo, navigation]);
  const sendMessage = (type, content, isInverted) => {
    // console.log(type, content, isInverted);
    const lastMessage = {
      type: 'text',
      content: content,
      targetId: user.role === 'admin' ? 'ADMIN_ID' : user.id, // id of person sent the message
      chatInfo: {
        // sender info
        avatar:
          user.role === 'admin'
            ? require('../../assets/logo.png')
            : user.photo
            ? user.photo
            : require('../../assets/default_avatar.png'),
        id: user.role === 'admin' ? 'ADMIN_ID' : user.id,
        nickName:
          user.role === 'admin'
            ? 'Admin'
            : user.name
            ? user.name
            : 'Một bạn giấu tên',
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
          chatType="group"
          messageList={messages}
          sendMessage={sendMessage}
          placeholder="Nhập tin nhắn..."
          useEmoji={false}
          useVoice={false}
          usePlus={false}
          userProfile={userProfile}
          showUserName={true}
          isIPhoneX={isIPX}
          renderMessageTime={renderMessageTime}
          usePopView={false}
          userNameStyle={styles.userName}
          rightMessageBackground="#fff"
          renderAvatar={message => {
            const isSelf = userProfile.id === message.targetId;
            const avatar = isSelf
              ? userProfile.avatar
              : message.chatInfo.avatar;
            const avatarSource = avatar
              ? typeof avatar === 'number'
                ? avatar
                : { uri: avatar }
              : require('../../assets/default_avatar.png');
            return <Image source={avatarSource} style={[styles.avatar]} />;
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  commentBar: {
    width: width,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  subEmojiStyle: {
    width: 20,
    height: 20,
  },
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 20,
    // backgroundColor: '#f9f9f9'
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 0.8,
  },
  chat: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  right: {
    flexDirection: 'row-reverse',
  },
  left: {
    flexDirection: 'row',
  },
  txtArea: {},
  voiceArea: {
    borderRadius: 12,
    maxWidth: width - 160,
    justifyContent: 'center',
    minHeight: 30,
  },
  avatar: {
    marginLeft: 8,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  leftAvatar: {
    marginLeft: 8,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  rightAvatar: {
    marginLeft: 8,
    borderRadius: 16,
    width: 30,
    height: 30,
    borderTopWidth: 2,
    borderColor: '#5cdb5e',
  },
  check: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 0.6,
    borderRadius: 10,
    borderColor: '#9c9c9c',
    marginTop: 14,
  },
  system_container: {
    flex: 1,
    alignItems: 'center',
  },
  system_button: {
    backgroundColor: 'rgba(240, 240, 240, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  system_text: {
    fontSize: 12,
  },
  userName: {
    fontSize: 10,
    color: '#000',
    marginBottom: 2,
    marginLeft: 14,
  },
});

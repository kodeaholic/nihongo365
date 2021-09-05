import React from 'react';
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
const isIPX = isIphoneX();
export class Chat extends React.Component {
  componentWillMount() {
    console.log(this.props);
  }
  state = {
    messages: [
      {
        id: uuidv4(),
        type: 'text',
        content:
          'Chào mừng bạn đến với Nihongo365. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi',
        targetId: '12345678',
        chatInfo: {
          avatar: require('app/assets/logo.png'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
        isIphoneX: isIPX,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: 'hi/{se}',
        targetId: '12345678',
        chatInfo: {
          avatar: require('app/assets/logo.png'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542106036549',
        isIphoneX: isIPX,
      },
      {
        id: uuidv4(),
        type: 'image',
        content: {
          uri:
            'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
          width: 100,
          height: 80,
        },
        targetId: '12345678',
        chatInfo: {
          avatar: require('app/assets/logo.png'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: false,
        sendStatus: 0,
        time: '1542106037000',
        isIphoneX: isIPX,
      },
      {
        id: uuidv4(),
        type: 'text',
        content: 'Hi Admin/{weixiao}',
        targetId: '88886666',
        chatInfo: {
          avatar: require('app/assets/logo.png'),
          id: '12345678',
        },
        renderTime: true,
        sendStatus: -2,
        time: '1542177036549',
        isIphoneX: isIPX,
      },
      {
        id: uuidv4(),
        type: 'voice',
        content: {
          uri:
            'http://m10.music.126.net/20190810141311/78bf2f6e1080052bc0259afa91cf030d/ymusic/d60e/d53a/a031/1578f4093912b3c1f41a0bfd6c10115d.mp3',
          length: 10,
        },
        targetId: '12345678',
        chatInfo: {
          avatar: require('app/assets/logo.png'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542260667161',
        isIphoneX: isIPX,
      },
      {
        id: uuidv4(),
        type: 'voice',
        content: {
          uri:
            'http://m10.music.126.net/20190810141311/78bf2f6e1080052bc0259afa91cf030d/ymusic/d60e/d53a/a031/1578f4093912b3c1f41a0bfd6c10115d.mp3',
          length: 30,
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('app/assets/logo.png'),
          id: '12345678',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542264667161',
        isIphoneX: isIPX,
      },
    ],
    // chatBg: require('../../source/bg.jpg'),
    inverted: false, // require
    voiceHandle: true,
    currentTime: 0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: '',
    voicePlaying: false,
    voiceLoading: false,
  };

  sendMessage = (type, content, isInverted) => {
    console.log(type, content, isInverted);
    const newMsg = {
      id: uuidv4(),
      type: 'text',
      content: content,
      targetId: '88886666',
      chatInfo: {
        avatar: require('app/assets/logo.png'),
        id: '12345678',
      },
      renderTime: true,
      sendStatus: 1,
      time: Date.now() + '',
      isIphoneX: isIPX,
    };
    const newMessagesList = [...this.state.messages, newMsg];
    this.setState({ ...this.state, messages: newMessagesList });
  };

  render() {
    return (
      <ChatScreen
        ref={e => (this.chat = e)}
        messageList={this.state.messages}
        sendMessage={this.sendMessage}
        placeholder="Nhập tin nhắn..."
        useEmoji={false}
        useVoice={false}
        usePlus={false}
      />
    );
  }
}

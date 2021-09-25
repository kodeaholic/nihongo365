/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Paragraph from '../../../components/Paragraph';
import {
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Text,
  Linking,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { apiConfig } from '../../../api/config/apiConfig';
import { SOCIAL_PROVIDER } from '../../../constants/socialAuth';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../actions/userActions';
import firestore from '@react-native-firebase/firestore';
import deviceInfoModule from 'react-native-device-info';
// firestore().settings({
//   ignoreUndefinedProperties: true,
// });
import { isIphoneX } from '../../../lib/isIphoneX';
import { ROOM_TYPES } from '../../../constants/chat.constants';
import { RANDOM_STR } from '../../../helpers/random';
const isIPX = isIphoneX();
const PRIVACY_URL = 'https://nihong0.herokuapp.com/privacy-policy.html';
const TERMS_AND_CONDITIONS_URL =
  'https://nihong0.herokuapp.com/terms-and-conditions.html';
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
    } else if (!_.isEmpty(result) && result.code !== 409) {
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
            // add or update users collection in firestore
            try {
              let clone = Object.assign({}, user);
              delete clone.id;
              let uniqueId = deviceInfoModule.getUniqueId();
              const res = await firestore()
                .collection('USERS')
                .doc(user.id)
                .get();
              if (_.isEmpty(res.data())) {
                //chưa đăng nhập bao giờ
                await firestore()
                  .collection('USERS')
                  .doc(user.id)
                  .set({
                    ...clone,
                    device: { id: uniqueId, platform: Platform.OS },
                  });
                if (user.role === 'user') {
                  const time = Date.now();
                  const lastMessage = {
                    type: 'text',
                    content: `Chào mừng bạn đã đến với Nihongo365 !
Nihongo365 sẽ luôn luôn đổi mới, tài liệu sẽ không ngừng tăng theo thời gian. Mong rằng sẽ là cánh tay đắc lực cùng bạn chinh phục tiếng Nhật một cách hiệu quả nhất. Hãy để lại ý kiến đóng góp của bạn bằng cách trả lời tin nhắn này. Trân trọng !`,
                    targetId: 'ADMIN_ID', // ID of the person sent this message
                    chatInfo: {
                      // sender information
                      avatar: require('../../../assets/logo.png'),
                      id: 'ADMIN_ID',
                      nickName: 'Admin',
                    },
                    renderTime: true,
                    sendStatus: 1,
                    time: time,
                    isIPhoneX: isIPX,
                  };
                  const newRoom = {
                    type: ROOM_TYPES.MEVSADMIN,
                    name: user.name,
                    avatar: user.photo,
                    lastMessage,
                  };
                  newRoom.ownerId = user.id;
                  newRoom.ownerRef = firestore().doc('USERS/' + user.id);
                  try {
                    await firestore()
                      .collection('rooms')
                      .add(newRoom)
                      .then(docRef => {
                        firestore()
                          .collection('rooms')
                          .doc(docRef.id)
                          .collection('MESSAGES')
                          .doc(time + RANDOM_STR(5))
                          .set(lastMessage)
                          .then(() => {});
                      });
                  } catch (e) {
                    // console.log(e);
                  }
                }
                dispatch(userActions.socialLoginSucceeded({ user }));
              } else {
                // đã từng đăng nhập
                const { device } = res.data();
                if (_.isEmpty(device)) {
                  // hiện tại chưa dùng thiết bị nào
                  if (true) {
                    await firestore()
                      .collection('USERS')
                      .doc(user.id)
                      .set(
                        {
                          ...clone,
                          device: { id: uniqueId, platform: Platform.OS },
                        },
                        { merge: true },
                      );
                    dispatch(userActions.socialLoginSucceeded({ user }));
                  }
                } else {
                  // đã dùng 1 thiết bị
                  if (device.id === uniqueId) {
                    // trùng thiết bị này
                    await firestore()
                      .collection('USERS')
                      .doc(user.id)
                      .set(
                        {
                          ...clone,
                          device: { id: uniqueId, platform: Platform.OS },
                        },
                        { merge: true },
                      );
                    dispatch(userActions.socialLoginSucceeded({ user }));
                  } else {
                    // không trùng
                    if (user.role && user.role === 'user') {
                      try {
                        await GoogleSignin.signInSilently();
                        try {
                          await GoogleSignin.revokeAccess();
                          await GoogleSignin.signOut();
                        } catch (error) {
                          // console.error(error);
                        }
                        ToastAndroid.showWithGravityAndOffset(
                          'Bạn đã đăng nhập trước đó trên thiết bị khác. Vui lòng liên hệ Admin để biết thêm chi tiết',
                          ToastAndroid.LONG,
                          ToastAndroid.TOP,
                          0,
                          100,
                        );
                      } catch (error) {
                        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                          // user has not signed in yet
                        } else {
                          // some other error
                        }
                      }
                      setResult({ code: 409 });
                      setLoading(false);
                      dispatch(userActions.socialLoginFailed());
                    } else {
                      // admin login anywhere
                      setResult(data);
                      setLoading(false);
                      dispatch(userActions.socialLoginSucceeded({ user }));
                    }
                    return;
                  }
                }
              }
            } catch (error) {
              dispatch(userActions.socialLoginFailed());
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
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Logo />
        {/* <Header>Welcome</Header> */}
        {/* <Paragraph>Chào mừng đến với Nihongo365</Paragraph> */}
        <Text
          style={{
            color: 'rgba(241, 90, 34, 1)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontWeight: 'normal',
            fontSize: 13,
            marginVertical: 20,
            textAlign: 'center',
          }}>
          {loading ? 'Đang tiến hành đăng nhập ...' : 'Đăng nhập để tiếp tục'}
        </Text>
        {!loading && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={_googleSignIn}
                style={{ marginRight: 10 }}>
                <Image
                  source={require('../../../assets/google-2048.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    borderColor: '#fff',
                  }}
                  resizeMethod="auto"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const fbLoginResponse = await LoginManager.logInWithPermissions(
                    ['public_profile', 'email'],
                  );
                  if (
                    fbLoginResponse.grantedPermissions &&
                    fbLoginResponse.grantedPermissions.includes(
                      'public_profile',
                    ) &&
                    fbLoginResponse.grantedPermissions.includes('email')
                  ) {
                    const tokenResponse = await AccessToken.getCurrentAccessToken();
                    if (
                      tokenResponse.permissions &&
                      tokenResponse.permissions.includes('public_profile') &&
                      tokenResponse.permissions.includes('email') &&
                      tokenResponse.accessToken &&
                      tokenResponse.userID
                    ) {
                      try {
                        setLoading(true);
                        let nihong0Reponse = await fetch(
                          `https://graph.facebook.com/me?fields=id,name,email&access_token=${
                            tokenResponse.accessToken
                          }`,
                          { method: 'GET' },
                        );
                        nihong0Reponse = await nihong0Reponse.json();
                        // call social login to our server
                        const { email, id, name } = nihong0Reponse;
                        const photo = `https://graph.facebook.com/${id}/picture?type=large`;
                        const socialUserData = { email, id, name, photo };
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
                                provider: SOCIAL_PROVIDER.FACEBOOK,
                                userInfo: { user: socialUserData },
                              },
                            }),
                          };
                          try {
                            const response = await fetch(url, requestOptions);
                            const data = await response.json();
                            if (data.code) {
                              setLoading(false);
                              dispatch(userActions.socialLoginFailed());
                              ToastAndroid.showWithGravityAndOffset(
                                'Có lỗi trong quá trình đăng nhập. Vui lòng thử lại',
                                ToastAndroid.LONG,
                                ToastAndroid.TOP,
                                0,
                                100,
                              );
                            } else {
                              let user = _.get(data, 'user');
                              if (
                                user.socialUserDetails &&
                                typeof user.socialUserDetails === 'string'
                              ) {
                                user.socialUserDetails = JSON.parse(
                                  user.socialUserDetails,
                                );
                              }
                              // add or update users collection in firestore
                              try {
                                let clone = Object.assign({}, user);
                                delete clone.id;
                                let uniqueId = deviceInfoModule.getUniqueId();
                                const res = await firestore()
                                  .collection('USERS')
                                  .doc(user.id)
                                  .get();
                                if (_.isEmpty(res.data())) {
                                  //chưa đăng nhập bao giờ
                                  await firestore()
                                    .collection('USERS')
                                    .doc(user.id)
                                    .set({
                                      ...clone,
                                      device: {
                                        id: uniqueId,
                                        platform: Platform.OS,
                                      },
                                    });
                                  if (user.role === 'user') {
                                    const time = Date.now();
                                    const lastMessage = {
                                      type: 'text',
                                      content: `Chào mừng bạn đã đến với Nihongo365 !
Nihongo365 sẽ luôn luôn đổi mới, tài liệu sẽ không ngừng tăng theo thời gian. Mong rằng sẽ là cánh tay đắc lực cùng bạn chinh phục tiếng Nhật một cách hiệu quả nhất. Hãy để lại ý kiến đóng góp của bạn bằng cách trả lời tin nhắn này. Trân trọng !`,
                                      targetId: 'ADMIN_ID', // ID of the person sent this message
                                      chatInfo: {
                                        // sender information
                                        avatar: require('../../../assets/logo.png'),
                                        id: 'ADMIN_ID',
                                        nickName: 'Admin',
                                      },
                                      renderTime: true,
                                      sendStatus: 1,
                                      time: time,
                                      isIPhoneX: isIPX,
                                    };
                                    const newRoom = {
                                      type: ROOM_TYPES.MEVSADMIN,
                                      name: user.name,
                                      avatar: user.photo,
                                      lastMessage,
                                    };
                                    newRoom.ownerId = user.id;
                                    newRoom.ownerRef = firestore().doc(
                                      'USERS/' + user.id,
                                    );
                                    try {
                                      await firestore()
                                        .collection('rooms')
                                        .add(newRoom)
                                        .then(docRef => {
                                          firestore()
                                            .collection('rooms')
                                            .doc(docRef.id)
                                            .collection('MESSAGES')
                                            .doc(time + RANDOM_STR(5))
                                            .set(lastMessage)
                                            .then(() => {});
                                        });
                                    } catch (e) {
                                      // console.log(e);
                                    }
                                  }
                                  setLoading(false);
                                  dispatch(
                                    userActions.socialLoginSucceeded({ user }),
                                  );
                                } else {
                                  // đã từng đăng nhập
                                  const { device } = res.data();
                                  if (_.isEmpty(device)) {
                                    // hiện tại chưa dùng thiết bị nào
                                    if (true) {
                                      await firestore()
                                        .collection('USERS')
                                        .doc(user.id)
                                        .set(
                                          {
                                            ...clone,
                                            device: {
                                              id: uniqueId,
                                              platform: Platform.OS,
                                            },
                                          },
                                          { merge: true },
                                        );
                                      dispatch(
                                        userActions.socialLoginSucceeded({
                                          user,
                                        }),
                                      );
                                      setLoading(false);
                                    }
                                  } else {
                                    // đã dùng 1 thiết bị
                                    if (device.id === uniqueId) {
                                      // trùng thiết bị này
                                      await firestore()
                                        .collection('USERS')
                                        .doc(user.id)
                                        .set(
                                          {
                                            ...clone,
                                            device: {
                                              id: uniqueId,
                                              platform: Platform.OS,
                                            },
                                          },
                                          { merge: true },
                                        );
                                      dispatch(
                                        userActions.socialLoginSucceeded({
                                          user,
                                        }),
                                      );
                                      setLoading(false);
                                    } else {
                                      // không trùng
                                      if (user.role && user.role === 'user') {
                                        setResult({ code: 409 });
                                        setLoading(false);
                                        dispatch(
                                          userActions.socialLoginFailed(),
                                        );
                                        ToastAndroid.showWithGravityAndOffset(
                                          'Tài khoản gắn với email hoặc SĐT của bạn đã được sử dụng để đăng nhập ở một thiết bị khác',
                                          ToastAndroid.LONG,
                                          ToastAndroid.TOP,
                                          0,
                                          100,
                                        );
                                      } else {
                                        // admin login anywhere
                                        setResult(data);
                                        setLoading(false);
                                        dispatch(
                                          userActions.socialLoginSucceeded({
                                            user,
                                          }),
                                        );
                                      }
                                      return;
                                    }
                                  }
                                }
                              } catch (error) {
                                setLoading(false);
                                dispatch(userActions.socialLoginFailed());
                                ToastAndroid.showWithGravityAndOffset(
                                  'Có lỗi trong quá trình đăng nhập. Vui lòng thử lại',
                                  ToastAndroid.LONG,
                                  ToastAndroid.TOP,
                                  0,
                                  100,
                                );
                                return error;
                              }
                            }
                            setResult(data);
                            setLoading(false);
                            return data;
                          } catch (error) {
                            setLoading(false);
                            dispatch(userActions.socialLoginFailed());
                            ToastAndroid.showWithGravityAndOffset(
                              'Có lỗi trong quá trình đăng nhập. Vui lòng thử lại',
                              ToastAndroid.LONG,
                              ToastAndroid.TOP,
                              0,
                              100,
                            );
                            return error;
                          }
                        } catch (error) {
                          setLoading(false);
                          dispatch(userActions.socialLoginFailed());
                          ToastAndroid.showWithGravityAndOffset(
                            'Lỗi kết nối. Vui lòng thử lại',
                            ToastAndroid.LONG,
                            ToastAndroid.TOP,
                            0,
                            100,
                          );
                        }
                      } catch (error) {
                        setLoading(false);
                        dispatch(userActions.socialLoginFailed());
                        ToastAndroid.showWithGravityAndOffset(
                          'Lỗi kết nối. Vui lòng thử lại',
                          ToastAndroid.LONG,
                          ToastAndroid.TOP,
                          0,
                          100,
                        );
                      }
                    } else {
                      setLoading(false);
                      dispatch(userActions.socialLoginFailed());
                      ToastAndroid.showWithGravityAndOffset(
                        'Có lỗi trong quá trình đăng nhập. Vui lòng thử lại',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        0,
                        100,
                      );
                    }
                  } else {
                    setLoading(false);
                    dispatch(userActions.socialLoginFailed());
                    ToastAndroid.showWithGravityAndOffset(
                      'Vui lòng thử lại và đồng ý chia sẻ email cùng thông tin cơ bản của bạn để tiếp tục',
                      ToastAndroid.LONG,
                      ToastAndroid.TOP,
                      0,
                      100,
                    );
                  }
                }}
                style={{ marginLeft: 10 }}>
                <Image
                  source={require('../../../assets/facebook-2048.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    borderColor: '#fff',
                  }}
                  resizeMethod="auto"
                />
              </TouchableOpacity>
            </View>

            {/* <Text
              style={{
                color: 'rgba(241, 90, 34, 1)',
                // fontStyle: 'italic',
                fontFamily: 'SF-Pro-Display-Regular',
                fontWeight: 'normal',
                fontSize: 11,
                marginTop: 5,
                textAlign: 'center',
              }}>
              Đăng nhập với Google hoặc Facebook. Mỗi tài khoản chỉ nên dùng
              trên một thiết bị duy nhất
            </Text> */}
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 11,
                marginHorizontal: 10,
                marginVertical: 10,
                lineHeight: 22,
                position: 'absolute',
                bottom: 10,
              }}>
              Bằng việc sử dụng Nihongo365, bạn đã đồng ý với{' '}
              <Text
                onPress={() => {
                  Linking.openURL(PRIVACY_URL);
                }}
                style={{
                  color: '#5cdb5e',
                }}>
                chính sách bảo mật
              </Text>{' '}
              và{' '}
              <Text
                onPress={() => {
                  Linking.openURL(TERMS_AND_CONDITIONS_URL);
                }}
                style={{
                  color: '#5cdb5e',
                }}>
                điều khoản sử dụng
              </Text>{' '}
              của chúng tôi
            </Text>
          </>
        )}
        {loading && (
          <>
            <ActivityIndicator size="large" />
          </>
        )}
      </Background>
    </SafeAreaView>
  );
}

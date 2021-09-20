/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Badge } from 'react-native-paper';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import DebounceInput from '../../components/DebounceInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { userActions } from '../../actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';
const windowWidth = Dimensions.get('window').width;

const alertFeatureUnavailable = () => {
  ToastAndroid.showWithGravityAndOffset(
    'Tính năng đang được phát triển. Vui lòng thử lại sau',
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    0,
    100,
  );
};
const PRIVACY_URL = 'https://nihong0.herokuapp.com/privacy-policy.html';
const TERMS_AND_CONDITIONS_URL =
  'https://nihong0.herokuapp.com/terms-and-conditions.html';
export const More = ({ navigation }) => {
  const [exiting, setExiting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#E8EAEF', paddingBottom: 15 }}>
      <View styles={styles.container}>
        {user.role !== 'admin' && (
          <TouchableOpacity
            onPress={() => alertFeatureUnavailable()}
            style={{
              height: 60,
              width: windowWidth,
              backgroundColor: '#fff',
              marginTop: 0, // first
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="chart-timeline"
              size={26}
              style={{ marginLeft: 10, width: 46, textAlign: 'center' }}
              color="rgba(0, 181, 204, 1)"
            />
            <Text
              style={{
                width: windowWidth - 76,
                margin: 10,
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 15,
                fontWeight: 'normal',
                color: '#000',
              }}>
              Nhật ký học
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            if (user.role !== 'admin') {
              navigation.navigate('Services');
            }
            if (user.role === 'admin') {
              navigation.navigate('AdminServices');
            }
          }}
          style={{
            height: 60,
            width: windowWidth,
            backgroundColor: '#fff',
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="gift-outline"
            size={26}
            style={{ marginLeft: 10, width: 46, textAlign: 'center' }}
            color="rgba(241, 130, 141,1)"
          />
          <Text
            style={{
              width: windowWidth - 76,
              margin: 10,
              fontFamily: 'SF-Pro-Detail-Regular',
              fontSize: 15,
              fontWeight: 'normal',
              color: '#000',
            }}>
            {user.role === 'admin' ? 'Đơn đăng ký gói học' : 'Đăng ký gói học'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alertFeatureUnavailable()}
          style={{
            height: 60,
            width: windowWidth,
            backgroundColor: '#fff',
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="account-box"
            size={26}
            style={{ marginLeft: 10, width: 46, textAlign: 'center' }}
            color="rgba(63, 195, 128, 1)"
          />
          <Text
            style={{
              width: windowWidth - 76,
              margin: 10,
              fontFamily: 'SF-Pro-Detail-Regular',
              fontSize: 15,
              fontWeight: 'normal',
              color: '#000',
            }}>
            {user.role === 'admin'
              ? 'Đơn đăng ký học offline'
              : 'Đăng ký học offline'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alertFeatureUnavailable()}
          style={{
            height: 60,
            width: windowWidth,
            backgroundColor: '#fff',
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="airplane"
            size={26}
            style={{ marginLeft: 10, width: 46, textAlign: 'center' }}
            color="rgba(241, 90, 34, 1)"
          />
          <Text
            style={{
              width: windowWidth - 76,
              margin: 10,
              fontFamily: 'SF-Pro-Detail-Regular',
              fontSize: 15,
              fontWeight: 'normal',
              color: '#000',
            }}>
            {user.role === 'admin'
              ? 'Đơn đăng ký tư vấn du học và XKLĐ'
              : 'Tư vấn du học và XKLĐ'}
          </Text>
        </TouchableOpacity>
        {user.role !== 'admin' && (
          <TouchableOpacity
            onPress={() => alertFeatureUnavailable()}
            style={{
              height: 60,
              width: windowWidth,
              backgroundColor: '#fff',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="tablet-cellphone"
              size={26}
              style={{ marginLeft: 10, width: 46, textAlign: 'center' }}
              color="rgba(165, 55, 253, 1)"
            />
            <Text
              style={{
                width: windowWidth - 76,
                margin: 10,
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 15,
                fontWeight: 'normal',
                color: '#000',
              }}>
              Chuyển đổi thiết bị đăng nhập
            </Text>
          </TouchableOpacity>
        )}
        {!exiting && (
          <TouchableOpacity
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
                    setExiting(true);
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
            style={{
              height: 60,
              width: windowWidth,
              backgroundColor: '#fff',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }}>
            <MaterialCommunityIcons
              name="logout"
              size={26}
              style={{ marginLeft: 10, width: 46, textAlign: 'center' }}
              color="rgba(219, 10, 91, 1)"
            />
            <Text
              style={{
                width: windowWidth - 76,
                margin: 10,
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 15,
                fontWeight: 'normal',
                color: '#000',
              }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontFamily: 'SF-Pro-Detail-Regular',
            fontStyle: 'italic',
            marginHorizontal: 10,
            marginVertical: 10,
            lineHeight: 22,
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
          của chúng tôi.
        </Text>
        {exiting && (
          <ActivityIndicator
            size="large"
            style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
});

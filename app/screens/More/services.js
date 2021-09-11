/* eslint-disable react-native/no-inline-styles */
import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions/userActions';
import { nanoid } from 'nanoid';
const LENGTH_OF_CODE = 8;
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
export const Services = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#E8EAEF', paddingBottom: 15 }}>
      <View styles={styles.container}>
        {/* <TouchableOpacity
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
        <TouchableOpacity
          // onPress={() => navigateToItem()}
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
            Đăng ký gói học
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
            Đăng ký học offline
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
            Tư vấn du học và XKLĐ
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
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

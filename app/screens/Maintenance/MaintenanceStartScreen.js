/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import { Text, Linking, SafeAreaView } from 'react-native';
import { getTimeFromMs } from '../../helpers/time';
const PRIVACY_URL = 'https://nihong0.herokuapp.com/privacy-policy.html';
const TERMS_AND_CONDITIONS_URL =
  'https://nihong0.herokuapp.com/terms-and-conditions.html';
export default function MaintenanceStartScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Logo />
        <Text
          style={{
            color: 'rgba(241, 90, 34, 1)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontWeight: 'normal',
            fontSize: 13,
            marginVertical: 5,
            textAlign: 'center',
          }}>
          Ứng dụng đang được nâng cấp
        </Text>
        <Text
          style={{
            color: 'rgba(241, 90, 34, 1)',
            fontFamily: 'SF-Pro-Display-Regular',
            fontWeight: 'normal',
            fontSize: 13,
            marginVertical: 5,
            textAlign: 'center',
          }}>
          (また後で来てください)
        </Text>
        <Text
          style={{
            color: '#5cdb5e',
            fontFamily: 'SF-Pro-Display-Regular',
            fontWeight: 'normal',
            fontSize: 13,
            marginVertical: 5,
            textAlign: 'center',
          }}>
          Thời điểm dự kiến hoàn thành {getTimeFromMs(Date.now() + 3600000 * 4)}
        </Text>
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
      </Background>
    </SafeAreaView>
  );
}

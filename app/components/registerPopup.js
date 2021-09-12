/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const RegisterPopup = ({ service, setVisible, visible }) => {
  const user = useSelector(state => state.userReducer.user);
  const navigation = useNavigation();
  return (
    <Modal
      isVisible={visible}
      animationIn="bounceInLeft"
      animationOut="bounceOutLeft"
      animationInTiming={0}
      animationOutTiming={0}
      onBackButtonPress={() => {
        // if (visible) {
        //   setVisible(false);
        // }
      }}
      onBackdropPress={() => {
        // if (visible) {
        //   setVisible(false);
        // }
      }}
      deviceHeight={windowHeight - 20}
      deviceWidth={windowWidth - 20}>
      <View style={{ flex: 1, borderRadius: 10 }}>
        <ScrollView
          style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 10 }}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 5,
              marginHorizontal: 15,
              color: 'rgba(246, 36, 89, 1)',
              textAlign: 'center',
              borderRadius: 5,
              fontFamily: 'SF-Pro-Detail-Regular',
              fontSize: 15,
              fontWeight: 'normal',
              padding: 2,
            }}>
            Đăng ký {service} để học và thi không giới hạn
          </Text>
          {/* <Text
            style={{
              marginTop: 10,
              marginBottom: 5,
              marginHorizontal: 15,
              color: 'rgba(246, 36, 89, 1)',
              textAlign: 'center',
              borderRadius: 5,
              fontFamily: 'SF-Pro-Detail-Regular',
              fontSize: 15,
              fontWeight: 'normal',
              padding: 2,
            }}>
            Tới trang đăng ký
          </Text> */}
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              marginVertical: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              marginHorizontal: 60,
              borderRadius: 8,
              marginTop: 5,
              flexDirection: 'column',
            }}
            onPress={() => {
              setVisible(false);
              navigation.goBack();
            }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 5,
                marginHorizontal: 15,
                // color: 'rgba(246, 36, 89, 1)',
                color: '#000',
                textAlign: 'center',
                borderRadius: 5,
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 15,
                fontWeight: 'normal',
                padding: 2,
                textTransform: 'uppercase',
              }}>
              Quay lại
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

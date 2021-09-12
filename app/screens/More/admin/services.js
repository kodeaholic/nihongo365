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
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import {
  TARGET_BANK_ACCOUNT,
  SERVICES,
  COLORS,
  STATUS,
} from '../../../constants/payment.constants';
import { getCurrentTime } from '../../../helpers/time';
import { useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const getStatusLabel = status => {
  switch (status) {
    case STATUS.NEW.value:
      return STATUS.NEW.buttonTitle;
    case STATUS.FREE.value:
      return STATUS.FREE.buttonTitle;
    case STATUS.PENDING.value:
      return STATUS.PENDING.buttonTitle;
    case STATUS.CANCELLED.value:
      return STATUS.CANCELLED.buttonTitle;
    case STATUS.SUCCESS.value:
      return STATUS.SUCCESS.buttonTitle;
  }
};

const RegisterModal = ({ service, setVisible, visible }) => {
  const user = useSelector(state => state.userReducer.user);
  const userName = user.email.split('@')[0];
  return (
    <Modal
      isVisible={visible}
      animationIn="bounceInLeft"
      animationOut="bounceOutLeft"
      animationInTiming={1500}
      animationOutTiming={1500}
      onBackButtonPress={() => {
        if (visible) {
          setVisible(false);
        }
      }}
      onBackdropPress={() => {
        if (visible) {
          setVisible(false);
        }
      }}
      deviceHeight={windowHeight}
      deviceWidth={windowWidth}>
      <View style={{ flex: 1, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text
            onPress={() => {
              if (visible) {
                setVisible(false);
              }
            }}
            style={[
              {
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'center',
                color: '#fff',
                fontWeight: '500',
                fontSize: 10,
                textTransform: 'uppercase',
                width: 20,
                height: 20,
                margin: 0,
                borderRadius: 20,
              },
            ]}>
            {' '}
          </Text>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontFamily: 'SF-Pro-Detail-Regular',
              fontSize: 15,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 2,
              width: windowWidth - 90,
            }}>
            {'Đơn đăng ký ' + SERVICES[service.serviceName].label}
          </Text>
          <Text
            onPress={() => {
              if (visible) {
                setVisible(false);
              }
            }}
            style={[
              {
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'center',
                color: '#fff',
                fontWeight: '500',
                fontSize: 10,
                textTransform: 'uppercase',
                width: 20,
                height: 20,
                margin: 0,
                borderRadius: 20,
                borderColor: 'white',
                borderWidth: 1,
              },
            ]}>
            X
          </Text>
        </View>
        <ScrollView
          style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 10 }}>
          {/* {(service.status === STATUS.NEW.value ||
            service.status === STATUS.CANCELLED.value) && (
            <>
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
                Vui lòng chuyển khoản tới số tài khoản dưới đây
              </Text>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(0, 181, 204, 1)"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    Clipboard.setString(service.price + '');
                    ToastAndroid.showWithGravityAndOffset(
                      'Đã sao chép số tiền chuyển khoản',
                      ToastAndroid.SHORT,
                      ToastAndroid.TOP,
                      0,
                      100,
                    );
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'rgba(0, 181, 204, 1)',
                      width: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                    }}>
                    {service.priceTag}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="bank-outline"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(241, 130, 141,1)"
                />
                <Text
                  style={{
                    width: windowWidth - 126,
                    margin: 0,
                    fontFamily: 'SF-Pro-Detail-Regular',
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {TARGET_BANK_ACCOUNT.TPBANK.bankName}
                </Text>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="source-branch"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(241, 90, 34, 1)"
                />
                <Text
                  style={{
                    width: windowWidth - 126,
                    margin: 0,
                    fontFamily: 'SF-Pro-Detail-Regular',
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {TARGET_BANK_ACCOUNT.TPBANK.branch} (Chi nhánh)
                </Text>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="tag-text-outline"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(63, 195, 128, 1)"
                />
                <Text
                  style={{
                    width: windowWidth - 126,
                    margin: 0,
                    fontFamily: 'SF-Pro-Detail-Regular',
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {TARGET_BANK_ACCOUNT.TPBANK.ownerName} (Tên người nhận)
                </Text>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="account"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(246, 36, 89, 1)"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    Clipboard.setString(
                      TARGET_BANK_ACCOUNT.TPBANK.ownerAccount,
                    );
                    ToastAndroid.showWithGravityAndOffset(
                      'Đã sao chép số tài khoản',
                      ToastAndroid.SHORT,
                      ToastAndroid.TOP,
                      0,
                      100,
                    );
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'rgba(246, 36, 89, 1)',
                      width: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                    }}>
                    {TARGET_BANK_ACCOUNT.TPBANK.ownerAccount}
                  </Text>
                </TouchableOpacity>
              </View>
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
                Nội dung chuyển khoản
              </Text>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="content-paste"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="#5cdb5e"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#5cdb5e',
                      minWidth: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      Clipboard.setString(userName + ' ' + service.serviceName);
                      ToastAndroid.showWithGravityAndOffset(
                        'Đã sao chép nội dung chuyển khoản',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        0,
                        100,
                      );
                    }}>
                    {userName + ' ' + service.serviceName}
                  </Text>
                </TouchableOpacity>
              </View>
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
                Xác nhận đã chuyển khoản thành công
              </Text>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  marginBottom: 15,
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
                  Alert.alert(
                    'Thông báo',
                    'Vui lòng xác nhận tạo yêu cầu đăng ký gói học',
                    [
                      {
                        text: 'Hủy',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'XÁC NHẬN',
                        onPress: () => {
                          let newServiceRecord = { ...service };
                          newServiceRecord.status = STATUS.PENDING.value;
                          try {
                            firestore()
                              .collection('services')
                              .doc(user.id)
                              .collection('SERVICES')
                              .doc(service.serviceName)
                              .set(newServiceRecord)
                              .then(() => {
                                setVisible(false);
                                ToastAndroid.showWithGravityAndOffset(
                                  'Đăng ký thành công. Vui lòng chờ hệ thống xác nhận',
                                  ToastAndroid.LONG,
                                  ToastAndroid.TOP,
                                  0,
                                  100,
                                );
                              });
                          } catch (e) {
                            setVisible(false);
                            ToastAndroid.showWithGravityAndOffset(
                              'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng liên hệ admin hoặc tạo lại đơn đăng ký',
                              ToastAndroid.LONG,
                              ToastAndroid.TOP,
                              0,
                              100,
                            );
                          }
                        },
                      },
                    ],
                  );
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
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </>
          )} */}
          {service.status !== STATUS.NEW.value && (
            <>
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
                Thông tin đơn đăng ký{' '}
                {SERVICES[service.serviceName].label.toUpperCase()}
              </Text>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(0, 181, 204, 1)"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {}}>
                  <Text
                    style={{
                      backgroundColor: 'rgba(0, 181, 204, 1)',
                      width: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                    }}>
                    {service.priceTag}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="bank-outline"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(241, 130, 141,1)"
                />
                <Text
                  style={{
                    width: windowWidth - 126,
                    margin: 0,
                    fontFamily: 'SF-Pro-Detail-Regular',
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {TARGET_BANK_ACCOUNT.TPBANK.bankName}
                </Text>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="tag-text-outline"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(63, 195, 128, 1)"
                />
                <Text
                  style={{
                    width: windowWidth - 126,
                    margin: 0,
                    fontFamily: 'SF-Pro-Detail-Regular',
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {TARGET_BANK_ACCOUNT.TPBANK.ownerName} (Tên người nhận)
                </Text>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="account"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(246, 36, 89, 1)"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {}}>
                  <Text
                    style={{
                      backgroundColor: 'rgba(246, 36, 89, 1)',
                      width: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                    }}>
                    {TARGET_BANK_ACCOUNT.TPBANK.ownerAccount}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="clock-time-three-outline"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(241, 130, 141,1)"
                />
                <Text
                  style={{
                    width: windowWidth - 126,
                    margin: 0,
                    fontFamily: 'SF-Pro-Detail-Regular',
                    fontSize: 15,
                    fontWeight: 'normal',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {getCurrentTime(service.createdAt)}
                </Text>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0, // first
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="rgba(63, 195, 128, 1)"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {}}>
                  <Text
                    style={{
                      backgroundColor: 'rgba(63, 195, 128, 1)',
                      width: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                    }}>
                    {getStatusLabel(service.status)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                onPress={() => {}}
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  marginTop: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 0,
                }}>
                <MaterialCommunityIcons
                  name="content-paste"
                  size={26}
                  style={{
                    marginLeft: 0,
                    width: 46,
                    textAlign: 'center',
                  }}
                  color="#5cdb5e"
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: windowWidth - 126,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#5cdb5e',
                      minWidth: 120,
                      height: 35,
                      margin: 0,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 15,
                      fontWeight: 'normal',
                      color: '#fff',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingVertical: 7,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      Clipboard.setString(userName + ' ' + service.serviceName);
                      ToastAndroid.showWithGravityAndOffset(
                        'Đã sao chép nội dung chuyển khoản',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        0,
                        100,
                      );
                    }}>
                    {service.transferMessage}
                  </Text>
                </TouchableOpacity>
              </View>
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
                Admin xác nhận đã nhận chuyển khoản
              </Text>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  marginBottom: 15,
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
                  Alert.alert(
                    'Thông báo',
                    'Vui lòng xác nhận bạn đã nhận chuyển khoản',
                    [
                      {
                        text: 'Hủy',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'XÁC NHẬN',
                        onPress: () => {
                          let newServiceRecord = { ...service };
                          newServiceRecord.status = STATUS.SUCCESS.value;
                          newServiceRecord.updatedAt = Date.now();
                          //   console.log(newServiceRecord);
                          try {
                            firestore()
                              .collection('services')
                              .doc(service.userId)
                              .collection('SERVICES')
                              .doc(service.id)
                              .set(
                                {
                                  status: STATUS.SUCCESS.value,
                                  updatedAt: Date.now(),
                                },
                                { merge: true },
                              )
                              .then(async () => {
                                setVisible(false);
                                ToastAndroid.showWithGravityAndOffset(
                                  'Xác nhận thành công',
                                  ToastAndroid.LONG,
                                  ToastAndroid.TOP,
                                  0,
                                  100,
                                );
                              });
                          } catch (e) {
                            setVisible(false);
                            ToastAndroid.showWithGravityAndOffset(
                              'Có lỗi xảy ra trong quá trình xác nhận. Vui lòng liên hệ developer',
                              ToastAndroid.LONG,
                              ToastAndroid.TOP,
                              0,
                              100,
                            );
                          }
                        },
                      },
                    ],
                  );
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
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
export const AdminServices = ({ route, navigation }) => {
  const [serviceRequests, setServiceRequests] = useState([]); // fetch from fire-store
  const user = useSelector(state => state.userReducer.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(STATUS.PENDING.value);
  useEffect(() => {
    let unsubscribe;
    let nestedUnsubscribe;
    if (user && user.id) {
      try {
        unsubscribe = firestore()
          .collection('services')
          //.orderBy('updatedAt', 'desc')
          .onSnapshot(querySnapshot => {
            querySnapshot.docs.map(record => {
              nestedUnsubscribe = firestore()
                .collection('services')
                .doc(record.id)
                .collection('SERVICES')
                .onSnapshot(snapshot => {
                  let results = snapshot.docs.map(service => {
                    // console.log(service);
                    let item = {
                      id: service.id,
                      ...service.data(),
                      userId: record.id,
                    };
                    return item;
                  });
                  setServiceRequests(list => {
                    let newList = [...list];
                    results.map(serviceRecord => {
                      const index = _.findIndex(newList, function(listItem) {
                        return (
                          listItem.userId === serviceRecord.userId &&
                          listItem.id === serviceRecord.id
                        );
                      });
                      if (
                        index < 0 &&
                        serviceRecord.createdAt > Date.now() - 86400000 * 10 // only get data in 10 recent days
                      ) {
                        newList.push(serviceRecord);
                      }
                    });
                    newList = _.sortBy(newList, ['createdAt']);
                    return newList;
                  });
                });
            });
          });
      } catch (e) {
        ToastAndroid.showWithGravityAndOffset(
          'Đường truyền không ổn định. Thử lại sau',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          100,
        );
        setServiceRequests([]);
      }
    }
    return () => {
      unsubscribe && unsubscribe();
      nestedUnsubscribe && nestedUnsubscribe();
    };
  }, [user]);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 15 }}>
      {modalVisible && !_.isEmpty(selectedService) && (
        <RegisterModal
          visible={modalVisible}
          setVisible={setModalVisible}
          service={selectedService}
        />
      )}
      <ScrollView styles={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            marginHorizontal: 15,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setSelectedStatus(STATUS.PENDING.value)}
            style={{
              height: 40,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 6,
              borderRadius: 8,
              backgroundColor:
                selectedStatus === STATUS.PENDING.value ? '#5cdb5e' : '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 15,
                fontWeight: 'normal',
                textTransform: 'uppercase',
                color:
                  selectedStatus === STATUS.PENDING.value ? '#fff' : '#000',
              }}>
              Chờ xử lý
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedStatus('PROCESSED')}
            style={{
              height: 40,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 6,
              borderRadius: 8,
              backgroundColor:
                selectedStatus !== STATUS.PENDING.value ? '#5cdb5e' : '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text
              style={{
                fontFamily: 'SF-Pro-Detail-Regular',
                fontSize: 15,
                fontWeight: 'normal',
                textTransform: 'uppercase',
                color:
                  selectedStatus !== STATUS.PENDING.value ? '#fff' : '#000',
              }}>
              Đã xử lý
            </Text>
          </TouchableOpacity>
        </View>
        {serviceRequests
          .filter(sv => {
            return selectedStatus === STATUS.PENDING.value
              ? sv.status === selectedStatus
              : sv.status === STATUS.SUCCESS.value ||
                  sv.status === STATUS.CANCELLED.value;
          })
          .map((serviceRequest, index) => {
            const {
              priceTag,
              serviceName,
              status,
              transferMessage,
            } = serviceRequest;
            const label = SERVICES[serviceName].label;
            const statusLabel = getStatusLabel(status);
            const backgroundColor = COLORS[serviceName];
            const color = '#fff';
            let registeredService = serviceRequest;
            return (
              <TouchableOpacity
                key={'service-' + index}
                onPress={() => {
                  if (label !== 'N5') {
                    setSelectedService(registeredService);
                    setModalVisible(true);
                  }
                }}
                style={{
                  height: 100,
                  backgroundColor: backgroundColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  marginBottom: 15,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  marginHorizontal: 15,
                  borderRadius: 8,
                  marginTop: index === 0 ? 0 : 0,
                  flexDirection: 'column',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      margin: 10,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 17,
                      fontWeight: 'normal',
                      color: color,
                      textAlign: 'left',
                      flex: 1,
                    }}>
                    {label}
                  </Text>
                  <Text
                    style={{
                      margin: 10,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 17,
                      fontWeight: 'normal',
                      color: color,
                      textAlign: 'right',
                      flex: 1,
                    }}>
                    {priceTag}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      margin: 10,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 13,
                      fontWeight: 'normal',
                      color: color,
                      textAlign: 'left',
                      flex: 6,
                    }}>
                    {transferMessage || ''}
                  </Text>
                  <Text
                    style={{
                      margin: 10,
                      fontFamily: 'SF-Pro-Detail-Regular',
                      fontSize: 13,
                      fontWeight: 'normal',
                      color: color,
                      textAlign: 'right',
                      flex: 2,
                    }}>
                    {statusLabel}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
});

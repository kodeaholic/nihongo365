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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions/userActions';
import { nanoid } from 'nanoid';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import {
  TARGET_BANK_ACCOUNT,
  SERVICES,
  OWNER_INFO,
  COLORS,
  STATUS,
} from '../../constants/payment.constants';
const LENGTH_OF_CODE = 8;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const getButtonLabelFromStatus = (status, serviceName) => {
  switch (status) {
    case STATUS.NEW.value:
      if (serviceName === 'N5') {
        return STATUS.FREE.buttonTitle;
      } else {
        return STATUS.NEW.buttonTitle;
      }
    case STATUS.PENDING.value:
      return STATUS.PENDING.buttonTitle;
    case STATUS.CANCELLED.value:
      return STATUS.CANCELLED.buttonTitle;
    case STATUS.SUCCESS.value:
      return STATUS.SUCCESS.buttonTitle;
    case STATUS.FREE.value:
      return STATUS.FREE.buttonTitle;
  }
};

const RegisterModal = ({ service, setVisible, visible }) => {
  console.log(service);
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
              fontSize: 22,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 2,
              width: windowWidth - 90,
            }}>
            {service.status === STATUS.NEW.value ||
            service.status === STATUS.CANCELLED.value
              ? 'Đăng ký ' + SERVICES[service.serviceName].label
              : 'Nihongo365 cảm ơn bạn đã đăng ký ' +
                SERVICES[service.serviceName].label}
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
                Clipboard.setString(TARGET_BANK_ACCOUNT.TPBANK.ownerAccount);
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
        </ScrollView>
      </View>
    </Modal>
  );
};
export const Services = ({ navigation }) => {
  const [services, setServices] = useState([]); // fetch from fire-store
  const [data] = useState([...Object.keys(SERVICES)]);
  const user = useSelector(state => state.userReducer.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(undefined);
  useEffect(() => {
    let unsubscribe;
    let items;
    if (user && user.id) {
      try {
        unsubscribe = firestore()
          .collection('services')
          .doc(user.id)
          .collection('SERVICES')
          .orderBy('updatedTime', 'desc')
          .onSnapshot(querySnapshot => {
            items = querySnapshot.docs.map(msg => {
              let item = {
                id: msg.id,
                ...msg.data(),
              };
              // console.log(item);
              return item;
            });
            setServices(items);
          });
      } catch (e) {
        setServices([]);
      }
    }
    return () => unsubscribe && unsubscribe();
  }, [user]);
  useEffect(() => {
    if (modalVisible) {
    }
  }, [modalVisible]);
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
        <Text
          style={{
            margin: 10,
            textAlign: 'center',
            fontFamily: 'SF-Pro-Detail-Regular',
            fontSize: 18,
            fontWeight: 'normal',
            color: '#000',
            textTransform: 'uppercase',
          }}>
          Đăng ký sử dụng dịch vụ Nihongo365
        </Text>
        {data.map((serviceName, index) => {
          const item = _.get(SERVICES, serviceName);
          const { priceTag, label, description } = item;
          const backgroundColor = COLORS[serviceName];
          const color = '#fff';
          const idx = _.findIndex(services, function(sv) {
            return sv.serviceName === serviceName;
          });
          const status = idx > -1 ? services[idx].status : STATUS.NEW.value;
          let buttonTitle = getButtonLabelFromStatus(status, serviceName);
          let registeredService =
            idx > -1
              ? services[idx]
              : {
                  serviceName: serviceName,
                  status: STATUS.NEW.value,
                  price: item.price,
                  priceTag: item.priceTag,
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                };
          return (
            <TouchableOpacity
              key={'service-' + index}
              onPress={() => {
                if (label !== 'N5') {
                  setModalVisible(true);
                  setSelectedService(registeredService);
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
                  {description}
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
                  {buttonTitle}
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

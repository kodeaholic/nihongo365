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
const getButtonLabelFromStatus = (status, service) => {
  switch (status) {
    case STATUS.NEW.value:
      if (service === 'N5') {
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
export const Services = ({ navigation }) => {
  const [services, setServices] = useState([]); // fetch from fire-store
  const [selected, setSelected] = useState('');
  const [data] = useState([...Object.keys(SERVICES)]);
  const user = useSelector(state => state.userReducer.user);
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
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 15 }}>
      <ScrollView styles={styles.container}>
        {data.map((service, index) => {
          const item = _.get(SERVICES, service);
          const { price, priceTag, label, description } = item;
          const backGroundColor = COLORS[service];
          const color = '#fff';
          const status =
            _.get(services, service + '.status') || STATUS.NEW.value;
          let buttonTitle = getButtonLabelFromStatus(status, service);
          return (
            <TouchableOpacity
              key={'service-' + index}
              onPress={() => {
                setSelected(service);
              }}
              style={{
                height: 100,
                backgroundColor: backGroundColor,
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
                marginTop: index === 0 ? 15 : 0,
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

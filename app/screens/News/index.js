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
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import { Badge } from 'react-native-paper';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { Dimensions } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
// import DebounceInput from '../../components/DebounceInput';

const News = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [treeModalVisible, setTreeModalVisible] = useState(false);
  const [headerProps, setHeaderProps] = useState({
    title: 'Bảng tin',
    disableBackButton: true,
    leftAction: {
      color: '#fff',
      icon: 'table-of-contents',
      action: () => setTreeModalVisible(true),
    },
  });
  useEffect(() => {
    navigation.setOptions({
      headerProps: headerProps,
    });
  }, [navigation, headerProps]);
  const windowWidth = Dimensions.get('window').width;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Modal
        isVisible={treeModalVisible}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        animationInTiming={1500}
        animationOutTiming={2000}
        onBackButtonPress={() => setTreeModalVisible(false)}
        onBackdropPress={() => setTreeModalVisible(false)}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              {
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'center',
                color: '#fff',
                fontWeight: '500',
                fontSize: 16,
                textTransform: 'uppercase',
              },
            ]}>
            Chuyên mục
          </Text>
        </View>
      </Modal>
      {/* <View style={styles.container}>
        <Skeleton speed={1000}>
          <View
            style={[
              styles.skeletonRow,
              {
                marginLeft: 8,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                height: 36,
              },
            ]}>
            <View
              style={[
                {
                  width: (windowWidth - 32) / 3,
                  height: 36,
                  borderRadius: 50,
                  marginRight: 10,
                },
              ]}
            />
            <View
              style={[
                {
                  width: (windowWidth - 32) / 3,
                  height: 36,
                  borderRadius: 50,
                  marginRight: 10,
                },
              ]}
            />
            <View
              style={[
                {
                  width: (windowWidth - 32) / 3,
                  height: 36,
                  borderRadius: 50,
                  marginRight: 0,
                },
              ]}
            />
          </View>
          <View
            style={[
              styles.skeletonRow,
              {
                marginTop: 10,
                marginLeft: 8,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                width: windowWidth - 16,
                borderRadius: 10,
              },
            ]}
          />
          <View
            style={[
              styles.skeletonRow,
              {
                marginTop: 10,
                marginLeft: 8,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                width: windowWidth - 16,
                borderRadius: 10,
              },
            ]}
          />
          <View
            style={[
              styles.skeletonRow,
              {
                marginTop: 10,
                marginLeft: 8,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                width: windowWidth - 16,
                borderRadius: 10,
              },
            ]}
          />
          <View
            style={[
              styles.skeletonRow,
              {
                marginTop: 10,
                marginLeft: 8,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                width: windowWidth - 16,
                borderRadius: 10,
              },
            ]}
          />
        </Skeleton>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
  },
  skeletonRow: {},
  buttonGroup: {
    flexDirection: 'row',
    alignContent: 'stretch',
    margin: 8,
    height: 36,
  },
  buttonGroupItem: {
    flex: 1,
    height: 36,
    marginRight: 10,
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#f0f2f5',
    flexDirection: 'row',
    paddingTop: 6,
  },
  buttonGroupItem_lastChild: {
    marginRight: 0,
  },
  buttonText: {
    backgroundColor: '#f0f2f5',
    fontSize: 16,
    marginRight: 5,
  },
  buttonActive: {
    backgroundColor: '#5cdb5e',
    color: '#ffffff',
  },
  textActivie: {
    backgroundColor: 'transparent',
    color: '#ffffff',
  },
  textNormal: {
    backgroundColor: 'transparent',
    color: '#000000',
  },
  badgeActive: {
    backgroundColor: '#ffffff',
    color: '#5cdb5e',
  },
  badge: {
    backgroundColor: '#f0f2f5',
    color: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonGroupSkeleton: {
    flexDirection: 'row',
    alignContent: 'stretch',
    margin: 8,
    height: 36,
  },
  buttonGroupItemSkeleton: {
    flex: 1,
    height: 36,
    marginRight: 10,
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
    paddingTop: 7,
  },
  listItem: {
    // borderWidth: 1,
    minHeight: 68,
    margin: 8,
    borderRadius: 10,
    padding: 10,
    fontFamily: 'KosugiMaru-Regular',
    backgroundColor: '#f0f2f5',
  },
  japaneseText: {
    margin: 10,
    fontFamily: 'KosugiMaru-Regular',
    fontSize: 16,
  },
});

export default News;

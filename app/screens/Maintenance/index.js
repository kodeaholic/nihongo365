/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Text,
} from 'react-native';
const Maintenance = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: {
        title: 'Tính năng bảo trì',
        disableBackButton: true,
        enableLogoutButton: false,
        centerTitle: true,
      },
    });
    ToastAndroid.showWithGravityAndOffset(
      'Tính năng đang được nâng cấp',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      100,
    );
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: 'SF-Pro-Detail-Regular',
            marginVertical: 20,
            textAlign: 'center',
            fontSize: 25,
          }}>
          また後で来てください
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // paddingTop: 5,
    flex: 1,
    paddingBottom: 0,
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
  roomAvatar: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderWidth: 1,
    borderColor: 'rgba(63, 195, 128, 1)',
  },
  roomAvatarContainer: {
    width: 80,
    height: 80,
    // padding: 5,
    // borderWidth: 1,
    borderRadius: 80,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#EAF8D2',
  },
  fab: {
    position: 'absolute',
    margin: 5,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(219, 10, 91, 1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.65,

    elevation: 8,
    textAlign: 'center',
    alignContent: 'center',
  },
});

export default Maintenance;

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
  //   ScrollView,
  //   ActivityIndicator,
  Image,
  RefreshControl,
  //   RefreshControl,
} from 'react-native';
// import Modal from 'react-native-modal';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { Dimensions } from 'react-native';
import { getPostTimeFromCreatedAt } from '../../helpers/time';
// import DebounceInput from '../../components/DebounceInput';
import * as programActions from '../../actions/programActions';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { ROOM_TYPES } from '../../constants/chat.constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const floorW = Math.floor(windowWidth);
import { isIphoneX } from '../../lib/isIphoneX';
import { RANDOM_STR } from '../../helpers/random';
const isIPX = isIphoneX();
const TimeCounter = ({ time }) => {
  //   console.log(time);
  const [timeInMillis, setTimeInMillis] = useState(
    _.isEmpty(time) ? new Date.now() + '' : time + '',
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInMillis(old => parseInt(old) + 60000);
      //   console.log('One minute passed ...');
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Text
      style={{
        fontFamily: 'SF-Pro-Display-Regular',
        textAlign: 'left',
        color: '#000',
        fontWeight: '400',
        fontSize: 12,
      }}
      numberOfLines={1}
      ellipsizeMode="tail">
      {getPostTimeFromCreatedAt(new Date(parseInt(timeInMillis)))}
    </Text>
  );
};
const Rooms = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [title] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setRefreshing(false);
    navigation.setOptions({
      headerProps: {
        title: 'Nihongo365 Chat',
        disableBackButton: true,
        leftAction: undefined,
      },
    });
    const isAdmin = _.get(user, 'role', 'user') === 'admin';
    const unsubscribe = firestore()
      .collection('ROOMS')
      .onSnapshot(querySnapshot => {
        const rooms = querySnapshot.docs
          .filter(documentSnapshot => {
            if (!isAdmin) {
              const ownerId = _.get(documentSnapshot.data(), 'ownerId');
              return ownerId === user.id;
            } else {
              const type = _.get(documentSnapshot.data(), 'type');
              return type === ROOM_TYPES.MEVSADMIN;
            }
          })
          .map(filteredSnapshot => {
            return {
              id: filteredSnapshot.id,
              ...filteredSnapshot.data(),
            };
          });
        if (rooms && rooms.length === 0 && !isAdmin) {
          firestore()
            .collection('ROOMS')
            .add({
              ownerId: user.id,
              type: ROOM_TYPES.MEVSADMIN,
              name: 'Admin',
              avatar: user.photo || 'DEFAULT_USER_AVATAR',
              ownerRef: firestore().doc('USERS/' + user.id),
            })
            .then(docRef => {
              const time = Date.now() + '';
              const lastMessage = {
                type: 'text',
                content:
                  'Chào mừng bạn đến với Nihongo365. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi',
                targetId: 'ADMIN_ID', // ID of the person sent this message
                chatInfo: {
                  // This is the person you are chatting with
                  avatar: 'ADMIN_AVATAR',
                  id: 'ADMIN_ID',
                  nickName: 'Admin',
                },
                renderTime: true,
                sendStatus: 0,
                time: time,
                isIPhoneX: isIPX,
              };
              firestore()
                .collection('ROOMS')
                .doc(docRef.id)
                .collection('MESSAGES')
                .doc(time + RANDOM_STR(5))
                .set(lastMessage)
                .then(() => {
                  firestore()
                    .collection('ROOMS')
                    .doc(docRef.id)
                    .set(
                      {
                        lastMessage,
                      },
                      { merge: true },
                    )
                    .then(() => {
                      console.log(
                        'Created new room with Admin and be welcomed!',
                      );
                    });
                });
            });
          firestore()
            .collection('ROOMS')
            .add({
              ownerId: user.id,
              type: ROOM_TYPES.SYSTEM,
              name: 'Tin nhắn hệ thống',
            })
            .then(docRef => {
              const time = Date.now() + '';
              const lastMessage = {
                type: 'text',
                content: 'Tin nhắn hệ thống từ Nihongo365',
                targetId: 'SYSTEM_ID', // ID of the person sent this message
                chatInfo: {
                  // This is the person you are chatting with
                  avatar: 'SYSTEM_AVATAR',
                  id: 'SYSTEM_ID',
                  nickName: 'System',
                },
                renderTime: true,
                sendStatus: 0,
                time: time,
                isIPhoneX: isIPX,
              };
              firestore()
                .collection('ROOMS')
                .doc(docRef.id)
                .collection('MESSAGES')
                .doc(time + RANDOM_STR(5))
                .set(lastMessage)
                .then(() => {
                  firestore()
                    .collection('ROOMS')
                    .doc(docRef.id)
                    .set(
                      {
                        lastMessage,
                      },
                      { merge: true },
                    )
                    .then(() => {
                      console.log(
                        'Created room for system notification with Admin and be welcomed!',
                      );
                    });
                });
            });
        }
        setItems(rooms);
        setLoading(false);
      });
    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, [user, navigation, refresh]);

  const renderImage = room => {
    const isAdmin = _.get(user, 'role', 'user') === 'admin';
    switch (room.type) {
      case ROOM_TYPES.SYSTEM:
        return (
          <Image
            source={require('../../assets/system_notification.png')}
            style={styles.roomAvatar}
            resizeMethod="auto"
          />
        );
      case ROOM_TYPES.GROUP:
        return (
          <Image
            source={require('../../assets/teamwork.png')}
            style={styles.roomAvatar}
            resizeMethod="auto"
          />
        );
      case ROOM_TYPES.MEVSADMIN:
        if (!isAdmin) {
          return (
            <Image
              source={require('../../assets/logo.png')}
              style={styles.roomAvatar}
              resizeMethod="auto"
            />
          );
        } else {
          return (
            <Image
              source={require('../../assets/girl.png')}
              style={styles.roomAvatar}
              resizeMethod="auto"
            />
          );
        }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container} scrollEnabled={true} refresh={refresh}>
        {loading && (
          <Skeleton speed={1500}>
            {[...Array(15).keys()].map(item => (
              <View
                key={item}
                style={[
                  styles.skeletonRow,
                  {
                    marginTop: 10,
                    marginLeft: 8,
                    marginRight: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 115,
                    width: '95%',
                    borderRadius: 10,
                  },
                ]}
              />
            ))}
          </Skeleton>
        )}
        {!loading && !_.isEmpty(items) && (
          <FlatList
            data={items}
            renderItem={({ item, index }) => {
              const { lastMessage } = item;
              const length = items.length;
              const navigateToItem = () => {
                dispatch(
                  programActions.newsArticleSelected({
                    selectedNewsArticle: {
                      item,
                    },
                  }),
                );
                navigation.navigate('NewsDetail', {
                  itemId: item.id,
                });
              };
              return (
                <TouchableOpacity
                  //   onPress={() => navigateToItem()}
                  style={{
                    minHeight: 100,
                    backgroundColor: '#fff',
                    marginTop: index === 0 ? 1 : 0, // first
                    marginBottom: index === length - 1 ? 10 : 0.5, // last
                    marginLeft: 1,
                    marginRight: 1,
                    // borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.roomAvatarContainer}>
                    {!_.isEmpty(item) && renderImage(item)}
                  </View>
                  <View style={{ width: windowWidth - 125, padding: 5 }}>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Display-Regular',
                        textAlign: 'left',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textTransform: 'uppercase',
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Display-Regular',
                        textAlign: 'left',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: 14,
                      }}
                      numberOfLines={4}
                      ellipsizeMode="tail">
                      {lastMessage?.content}
                    </Text>
                    <TimeCounter time={lastMessage?.time} />
                    {/* <Text
                      style={{
                        fontFamily: 'SF-Pro-Display-Regular',
                        textAlign: 'left',
                        color: '#000',
                        fontWeight: '400',
                        fontSize: 12,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {getPostTimeFromCreatedAt(
                        new Date(parseInt(lastMessage?.time)),
                      )}
                    </Text> */}
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            // ListFooterComponent={() => {
            //   return loadingMore ? (
            //     <ActivityIndicator size="small" style={{ marginBottom: 10 }} />
            //   ) : null;
            // }}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={0} // 250
            onEndReached={info => {
              if (scrolled) {
                // loadMore();
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  setRefresh(refresh + 1);
                }}
              />
            }
            onScroll={() => setScrolled(true)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: floorW,
    backgroundColor: '#EAF8D2',
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
  },
  roomAvatarContainer: {
    width: 95,
    height: 95,
    // padding: 5,
    // borderWidth: 1,
    borderRadius: 95,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF8D2',
  },
});

export default Rooms;

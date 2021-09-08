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
import {
  getPostedTimeFromMillis,
  getPostTimeFromCreatedAt,
} from '../../helpers/time';
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
  const [timeInMillis, setTimeInMillis] = useState(Date.now());
  useEffect(() => {
    setTimeout(() => {
      setTimeInMillis(timeInMillis + 60000);
    }, 60000);
  }, [timeInMillis]);
  const getDiff = () => {
    const date = new Date(parseInt(time));
    // console.log('date: ', date);
    const today = new Date(timeInMillis);
    // console.log('today: ', today);
    let mins = Math.abs(today - date) / (60 * 1000);
    mins = parseInt(mins);
    let res = '';
    if (mins < 60) {
      res = `${mins} phút trước`;
      //   return res;
    } else {
      let hours = Math.abs(today - date) / (60 * 60 * 1000);
      hours = parseInt(hours);
      if (hours < 12) {
        res = `${hours} giờ trước`;
        // return res;
      } else {
        res =
          ('0' + date.getDate()).slice(-2) +
          '-' +
          ('0' + (date.getMonth() + 1)).slice(-2) +
          '-' +
          date.getFullYear() +
          ' ' +
          ('0' + date.getHours()).slice(-2) +
          ':' +
          ('0' + date.getMinutes()).slice(-2);
        // return res;
      }
    }
    // console.log(res);
    return res;
  };
  return (
    <>
      {timeInMillis > 0 && (
        <Text
          style={{
            fontFamily: 'SF-Pro-Display-Regular',
            textAlign: 'left',
            color: '#000',
            fontWeight: '400',
            fontSize: 12,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
          key={timeInMillis}>
          {getDiff()}
        </Text>
      )}
    </>
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
    setLoading(true);
    setRefreshing(false);
    // navigation.setOptions({
    //   headerProps: {
    //     title: 'Nihongo365 Chat',
    //     disableBackButton: true,
    //     leftAction: undefined,
    //   },
    // });
    const isAdmin = _.get(user, 'role') === 'admin';
    const unsubscribe = firestore()
      .collection('rooms')
      .onSnapshot(querySnapshot => {
        const rooms = querySnapshot.docs
          .filter(documentSnapshot => {
            const type = _.get(documentSnapshot.data(), 'type');
            const isEmpty = _.isEmpty(documentSnapshot);
            if (!isAdmin) {
              const ownerId = _.get(documentSnapshot.data(), 'ownerId');
              return (
                !isEmpty && ownerId === user.id && type !== ROOM_TYPES.SYSTEM
              );
            } else {
              return !isEmpty && type === ROOM_TYPES.MEVSADMIN;
            }
          })
          .map(filteredSnapshot => {
            const item = {
              id: filteredSnapshot.id,
              ...filteredSnapshot.data(),
            };
            // setItems(channels => {
            //   const index = _.findIndex(channels, function(channel) {
            //     return channel.id === item.id;
            //   });
            //   if (index < 0) {
            //     return [...channels, item];
            //   } else {
            //     return channels;
            //   }
            // });
            // console.log(item);
            return item;
          });
        if (!isAdmin && rooms && rooms.length === 0) {
          const time = Date.now();
          const lastMessage = {
            type: 'text',
            content:
              'Chào mừng bạn đã đến với Nihongo365! Hãy cùng Nihongo365 xây dựng nên cộng đồng người học tiếng Nhật nhé! Thân ái!',
            targetId: 'ADMIN_ID', // ID of the person sent this message
            chatInfo: {
              // sender information
              avatar: require('../../assets/logo.png'),
              // id: 'ADMIN_ID',
            },
            renderTime: true,
            sendStatus: 1,
            time: time,
            isIPhoneX: isIPX,
          };
          const newRoom = {
            type: ROOM_TYPES.MEVSADMIN,
            name: user.name,
            avatar: user.photo,
            lastMessage,
          };
          if (!isAdmin) {
            newRoom.ownerId = user.id;
            newRoom.ownerRef = firestore().doc('USERS/' + user.id);
          }
          try {
            firestore()
              .collection('rooms')
              .add(newRoom)
              .then(docRef => {
                firestore()
                  .collection('rooms')
                  .doc(docRef.id)
                  .collection('MESSAGES')
                  .doc(time + RANDOM_STR(5))
                  .set(lastMessage)
                  .then(() => {});
              });
            // firestore()
            //   .collection('rooms')
            //   .add({
            //     ownerId: user.id,
            //     type: ROOM_TYPES.SYSTEM,
            //     name: 'Tin nhắn hệ thống',
            //   })
            //   .then(docRef => {
            //     const time = Date.now();
            //     const lastMessage = {
            //       type: 'text',
            //       content: `Chào mừng bạn gia nhập Nihongo365!
            //       Bạn sẽ nhận được tin nhắn từ hệ thống trong hộp thư này.
            //       Trân trọng!
            //       `,
            //       targetId: 'SYSTEM_ID', // ID of the person sent this message
            //       chatInfo: {
            //         // This is the person you are chatting with
            //         avatar: 'SYSTEM_AVATAR',
            //         id: 'SYSTEM_ID',
            //         nickName: 'System',
            //       },
            //       renderTime: true,
            //       sendStatus: 0,
            //       time: time,
            //       isIPhoneX: isIPX,
            //     };
            //     firestore()
            //       .collection('rooms')
            //       .doc(docRef.id)
            //       .collection('MESSAGES')
            //       .doc(time + RANDOM_STR(5))
            //       .set(lastMessage)
            //       .then(() => {
            //         firestore()
            //           .collection('rooms')
            //           .doc(docRef.id)
            //           .set(
            //             {
            //               lastMessage,
            //             },
            //             { merge: true },
            //           )
            //           .then(() => {
            //             // console.log(
            //             //   'Created room for system notification with Admin and be welcomed!',
            //             // );
            //           });
            //       });
            //   });
          } catch (e) {
            // console.log(e);
          }
        }
        setItems(rooms);
        // console.log(rooms);
        setLoading(false);
      });
    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, [user, refresh]);

  const renderImage = room => {
    const isAdmin = user.role === 'admin';
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
          if (!_.isEmpty(room.avatar)) {
            return (
              <Image
                source={{ uri: room.avatar }}
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
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container} scrollEnabled={true} refresh={refresh}>
        {_.isEmpty(items) && (
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
        {!_.isEmpty(items) && !_.isEmpty(items) && (
          <FlatList
            data={items}
            renderItem={({ item, index }) => {
              console.log(item);
              const { lastMessage } = item;
              const length = items.length;
              const navigateToItem = () => {
                // dispatch(
                //   programActions.newsArticleSelected({
                //     selectedNewsArticle: {
                //       item,
                //     },
                //   }),
                // );
                navigation.navigate('Chat', {
                  roomId: item.id,
                });
              };
              return (
                <TouchableOpacity
                  onPress={() => navigateToItem()}
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
                        // textTransform: 'uppercase',
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {user.role === 'admin' ? item.name : 'Admin'}
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
                    {lastMessage?.time && (
                      <TimeCounter time={lastMessage?.time} />
                    )}
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
                        new Date((lastMessage?.time)),
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
});

export default Rooms;

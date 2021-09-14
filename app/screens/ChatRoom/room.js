/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Image,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import _ from 'lodash';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DebounceInput from '../../components/DebounceInput';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { getCurrentTime } from '../../helpers/time';
import { ROOM_TYPES } from '../../constants/chat.constants';
import { isIphoneX } from '../../lib/isIphoneX';
import { useSelector } from 'react-redux';
import { RANDOM_STR } from '../../helpers/random';
const windowWidth = Dimensions.get('window').width;
const isIPX = isIphoneX();
export const Room = ({ route, navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const { roomId, roomInfo } = route.params;
  const [room, setRoom] = useState({});
  const [title, setTitle] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [roomMembers, setMembers] = useState([]);
  const [saving, setSaving] = useState(false);
  // first load data
  useEffect(() => {
    if (roomId) {
      navigation.setOptions({ headerProps: { title: 'Chỉnh sửa nhóm chat' } });
      const getRoom = async () => {
        const rm = await firestore()
          .collection('rooms')
          .doc(roomId)
          .get();
        if (_.isEmpty(rm.data())) {
          ToastAndroid.showWithGravityAndOffset(
            'Nhóm không tồn tại hoặc đã bị xóa',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100,
          );
          navigation.goBack();
        } else {
          // console.log(rm.data());
          setRoom(rm.data());
          const { members } = rm.data();
          if (members && members.length) {
            // fetch members data by ids
            let list = [];
            list = members.map(async (mb, index) => {
              const doc = await firestore()
                .collections('USERS')
                .doc(mb.id)
                .get();
              console.log(doc);
              return doc;
            });
            setMembers(members);
          } else {
            setMembers([]);
          }
        }
      };
      getRoom();
    } else {
      navigation.setOptions({ headerProps: { title: 'Tạo nhóm chat' } });
    }
  }, [navigation, roomId, roomInfo]);

  useEffect(() => {
    let unsubscribe;
    if (searchKey && searchKey.length > 2) {
      // search
      setSearching(true);
      const search = async () => {
        unsubscribe = firestore()
          .collection('USERS')
          .onSnapshot(querySnapshot => {
            const items = querySnapshot.docs
              .filter(documentSnapshot => {
                const data = documentSnapshot.data();
                const index = _.findIndex(roomMembers, function(mb) {
                  return mb.id === documentSnapshot.id;
                });
                return (
                  documentSnapshot.id !== user.id &&
                  index < 0 &&
                  data.email.includes(searchKey.toLowerCase())
                );
              })
              .map(filteredSnapshot => {
                const item = {
                  id: filteredSnapshot.id,
                  ...filteredSnapshot.data(),
                };
                return item;
              });
            // console.log(items);
            setSearchResults(items);
            setSearching(false);
          });
      };
      setSearching(false);
      search();
    } else {
      setSearchResults([]);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [searchKey, roomMembers, user]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <DebounceInput
            handleInputChange={setTitle}
            placeholder="Tên nhóm chat"
            style={{ backgroundColor: '#fff' }}
            // heigth = 50, margin 8
          />
          <DebounceInput
            handleInputChange={setSearchKey}
            placeholder="Tìm và thêm thành viên qua email"
            style={{ backgroundColor: '#fff' }}
            enabled={_.isEmpty(title) ? false : true}
            // height = 50, margin 8
          />
          {!_.isEmpty(searchKey) && !_.isEmpty(searchResults) && (
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  textAlign: 'center',
                  color: '#000',
                  fontWeight: 'normal',
                  fontSize: 13,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                Kết quả tìm kiếm
              </Text>
              <FlatList
                data={searchResults}
                renderItem={({ item, index }) => {
                  const length = searchResults.length;
                  const onClick = () => {
                    setMembers(list => {
                      const idx = _.findIndex(list, function(mb) {
                        return mb.id === item.id;
                      });
                      if (idx < 0) {
                        return [
                          ...list,
                          {
                            id: item.id,
                            createdAt: Date.now(),
                            name: item.name ? item.name : 'Một bạn giấu tên',
                            photo: item.photo,
                          },
                        ];
                      } else {
                        return list;
                      }
                    });
                    ToastAndroid.showWithGravityAndOffset(
                      `Đã thêm ${item.name}`,
                      ToastAndroid.LONG,
                      ToastAndroid.TOP,
                      0,
                      100,
                    );
                  };
                  return (
                    <TouchableOpacity
                      key={'search-' + item.id}
                      onPress={() => onClick()}
                      style={{
                        minHeight: 50,
                        backgroundColor: '#fff',
                        marginTop: index === 0 ? 5 : 0, // first
                        marginBottom: index === length - 1 ? 10 : 5, // last
                        marginLeft: 10,
                        marginRight: 10,
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
                        borderRadius: 5,
                      }}>
                      <View style={styles.roomAvatarContainer}>
                        {item.role === 'admin' ? (
                          <Image
                            source={require('../../assets/logo.png')}
                            style={styles.roomAvatar}
                            resizeMethod="auto"
                          />
                        ) : item.photo ? (
                          <Image
                            source={{ uri: item.photo }}
                            style={styles.roomAvatar}
                            resizeMethod="auto"
                          />
                        ) : (
                          <Image
                            source={require('../../assets/default_avatar.png')}
                            style={styles.roomAvatar}
                            resizeMethod="auto"
                          />
                        )}
                      </View>
                      <View
                        style={{
                          width: windowWidth - 50,
                          padding: 5,
                          marginRight: 5,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'SF-Pro-Display-Regular',
                            textAlign: 'left',
                            color: '#000',
                            fontWeight: 'normal',
                            fontSize: 16,
                            // textTransform: 'uppercase',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.name ? item.name : 'Một bạn giấu tên'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
              />
            </View>
          )}
          {!_.isEmpty(searchKey) && _.isEmpty(searchResults) && (
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'center',
                color: '#000',
                fontWeight: 'normal',
                fontSize: 13,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              Không có thêm kết quả tương tự
            </Text>
          )}
          {!_.isEmpty(roomMembers) && (
            <>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: 13,
                  backgroundColor: 'rgba(63, 195, 128, 1)',
                  borderRadius: 5,
                  width: windowWidth / 3,
                  marginHorizontal: windowWidth / 3,
                  marginTop: 20,
                  marginBottom: 5,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {roomMembers.length} thành viên
              </Text>
              <View>
                <FlatList
                  data={roomMembers}
                  renderItem={({ item, index }) => {
                    const length = searchResults.length;
                    const onClick = () => {};
                    return (
                      <TouchableOpacity
                        key={'member-' + item.id}
                        onPress={() => onClick()}
                        style={{
                          minHeight: 50,
                          backgroundColor: '#fff',
                          marginTop: index === 0 ? 5 : 0, // first
                          marginBottom: index === length - 1 ? 10 : 5, // last
                          marginLeft: 10,
                          marginRight: 10,
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
                          borderRadius: 5,
                        }}>
                        <View style={styles.roomAvatarContainer}>
                          {item.role === 'admin' ? (
                            <Image
                              source={require('../../assets/logo.png')}
                              style={styles.roomAvatar}
                              resizeMethod="auto"
                            />
                          ) : item.photo ? (
                            <Image
                              source={{ uri: item.photo }}
                              style={styles.roomAvatar}
                              resizeMethod="auto"
                            />
                          ) : (
                            <Image
                              source={require('../../assets/default_avatar.png')}
                              style={styles.roomAvatar}
                              resizeMethod="auto"
                            />
                          )}
                        </View>
                        <View
                          style={{
                            width: windowWidth - 50,
                            padding: 5,
                            marginRight: 5,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Display-Regular',
                              textAlign: 'left',
                              color: '#000',
                              fontWeight: 'normal',
                              fontSize: 16,
                              // textTransform: 'uppercase',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.name ? item.name : 'Một bạn giấu tên'}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Display-Regular',
                              textAlign: 'left',
                              color: '#000',
                              fontWeight: 'normal',
                              fontSize: 11,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            Tham gia từ: {getCurrentTime(item.createdAt)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => {
                    return item.id;
                  }}
                />
              </View>
            </>
          )}
          {_.isEmpty(roomMembers) && (
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 13,
                backgroundColor: 'rgba(63, 195, 128, 1)',
                borderRadius: 5,
                width: windowWidth / 3,
                marginHorizontal: windowWidth / 3,
                marginTop: 20,
                marginBottom: 5,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              0 thành viên
            </Text>
          )}
          {true && (
            <TouchableOpacity
              disabled={_.isEmpty(title) || saving}
              style={{
                height: 50,
                width: windowWidth / 3,
                marginHorizontal: windowWidth / 3,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 15,
              }}
              onPress={async () => {
                // create new room
                console.log('Click!');
                if (!roomId) {
                  setSaving(true);
                  const time = Date.now();
                  const lastMessage = {
                    type: 'system',
                    content: `${
                      user.name ? user.name : 'Một bạn giấu tên'
                    } đã tạo nhóm`,
                    renderTime: true,
                    sendStatus: 1,
                    time: time,
                    isIPhoneX: isIPX,
                    targetId: user.role === 'admin' ? 'ADMIN_ID' : user.id,
                    chatInfo: {
                      // sender information
                      avatar:
                        user.role === 'admin'
                          ? require('../../assets/logo.png')
                          : user.photo
                          ? user.photo
                          : require('../../assets/default_avatar.png'),
                      id: user.role === 'admin' ? 'ADMIN_ID' : user.id,
                      nickName:
                        user.role === 'admin'
                          ? 'Admin'
                          : user.name
                          ? user.name
                          : 'Một bạn giấu tên',
                    },
                  };
                  const newRoom = {
                    type: ROOM_TYPES.GROUP,
                    name: title,
                    avatar: require('../../assets/teamwork.png'),
                    lastMessage,
                  };
                  newRoom.ownerId = user.id;
                  newRoom.ownerRef = firestore().doc('USERS/' + user.id);
                  // members
                  let list = [];
                  list = roomMembers.map(item => {
                    return { id: item.id, createdAt: item.createdAt };
                  });
                  newRoom.members = list;
                  try {
                    await firestore()
                      .collection('rooms')
                      .add(newRoom)
                      .then(docRef => {
                        firestore()
                          .collection('rooms')
                          .doc(docRef.id)
                          .collection('MESSAGES')
                          .doc(time + RANDOM_STR(5))
                          .set(lastMessage)
                          .then(() => {
                            console.log(docRef);
                            navigation.navigate('Chat', {
                              roomId: docRef.id,
                              roomInfo: {
                                name: newRoom.name,
                                type: newRoom.type,
                                id: newRoom.id,
                              },
                            });
                          });
                      });
                    setSaving(false);
                  } catch (e) {
                    // console.log(e);
                  }
                }
              }}>
              <Text
                style={{
                  backgroundColor:
                    !_.isEmpty(title) || saving
                      ? 'rgba(0, 181, 204, 1)'
                      : 'rgba(218, 223, 225, 1)',
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
                  textTransform: 'uppercase',
                }}>
                Lưu
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  opacityButton: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#F5FCFF',
    flex: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityButtonText: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontWeight: 'normal',
    fontSize: 19,
    textTransform: 'capitalize',
  },
  frolyBackground: {
    backgroundColor: 'rgba(241, 130, 141,1)',
    color: '#000',
  },
  purpleBackground: {
    backgroundColor: 'rgba(165, 55, 253, 1)',
    color: '#fff',
  },
  blueBackground: {
    backgroundColor: 'rgba(0, 181, 204, 1)',
    color: '#fff',
  },
  greenBackground: {
    backgroundColor: 'rgba(63, 195, 128, 1)',
    color: '#fff',
  },
  yellowBackground: {
    backgroundColor: 'rgba(255, 255, 126, 1)',
    color: '#000',
  },
  orangeBackground: {
    backgroundColor: 'rgba(241, 90, 34, 1)',
  },
  whiteText: {
    color: '#fff',
  },
  blackText: {
    color: '#000',
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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 65,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  kanaText: {
    color: '#000',
    flex: 1,
    fontFamily: 'KosugiMaru-Regular',
    fontSize: 85,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  roomAvatar: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderWidth: 2,
    borderColor: 'rgba(63, 195, 128, 1)',
  },
  roomAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});

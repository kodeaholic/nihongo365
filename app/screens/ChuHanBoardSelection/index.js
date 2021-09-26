/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  ToastAndroid,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
import { BOARD_TYPE } from '../../constants/board';
import _ from 'lodash';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PROGRAM_IDS, PROGRAM_TYPES } from '../Programs/data';
import { AD_UNIT_IDS } from '../../constants/ads';
const windowHeight = Dimensions.get('window').height;
export const ChuHanBoardSelection = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [adLoaded, setAdLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState(1);
  const user = useSelector(state => state.userReducer.user);
  const [completedItems, setCompletedItems] = useState([]);
  const fetchItems = async (filter, more = false) => {
    let list = [];
    const headers = await authHeader();
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    let url = `${apiConfig.baseUrl}${
      apiConfig.apiEndpoint
    }/boards?populate=cards`;
    if (_.get(filter, 'page')) {
      url += `&page=${_.get(filter, 'page')}`;
    }
    if (_.get(filter, 'limit')) {
      url += `&limit=${_.get(filter, 'limit')}`;
    }
    if (_.get(filter, 'level')) {
      url += `&level=${_.get(filter, 'level')}`;
    }
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.code) {
        ToastAndroid.showWithGravityAndOffset(
          'Kết nối mạng không ổn định',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      } else {
        list = data.results;
        if (_.isEmpty(list)) {
          const msg = 'Chưa có mục nào được tạo. Vui lòng quay lại sau';
          if (!more) {
            ToastAndroid.showWithGravityAndOffset(
              msg,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
          }
        } else {
        }
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Kết nối mạng không ổn định',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
    }
    return list;
  };

  // load data for the first time
  useEffect(() => {
    if (selectedLevel) {
      setPage(prev => 1);
      const loadData = async () => {
        setIsLoading(true);
        let filter = { limit: 20, level: selectedLevel, page: 1 };
        const results = await fetchItems(filter);
        setItems(results);
        setIsLoading(false);
      };
      loadData();
    }

    /** Update header */
    const title = `Học chữ Hán ${selectedLevel}`;
    navigation.setOptions({ headerProps: { title } });

    /** Get list completed items */
    let unsubscribe;
    if (user && user.id) {
      unsubscribe = firestore()
        .collection('USERS')
        .doc(user.id)
        .collection('COMPLETED_ITEMS')
        .onSnapshot(querySnapshot => {
          const results = querySnapshot.docs
            .filter(documentSnapshot => {
              const level = _.get(documentSnapshot.data(), 'level');
              const program = _.get(documentSnapshot.data(), 'program');
              return (
                level === selectedLevel &&
                program === PROGRAM_TYPES[PROGRAM_IDS.CHUHAN]
              );
            })
            .map(filteredSnapshot => {
              return filteredSnapshot.id;
            });
          setCompletedItems(results);
        });
    }
    return () => unsubscribe && unsubscribe();
  }, [navigation, selectedLevel, user]);
  const dispatch = useDispatch();

  const loadMore = () => {
    const load = async () => {
      setLoadingMore(true);
      let filter = { limit: 20, page: page + 1, level: selectedLevel };
      let more = true;
      const results = await fetchItems(filter, more);
      const currentItems = [...items];
      if (!_.isEmpty(results)) {
        const newList = _.concat(currentItems, results);
        setItems(newList);
        setPage(page + 1);
      }
      setTimeout(() => {
        setLoadingMore(false);
      }, 2000);
    };
    load();
  };

  // refresh
  const refresh = () => {
    const load = async () => {
      setRefreshing(true);
      let filter = { limit: 20, page: 1, level: selectedLevel };
      let more = true;
      const results = await fetchItems(filter, more);
      if (!_.isEmpty(results)) {
        setItems(results);
        setPage(1);
        setScrolled(false); // re-init the list
      }
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    };
    load();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e5dfd7' }}>
        {/* <Header title={`Học chữ Hán ${selectedLevel}`} /> */}
        <View
          style={{
            backgroundColor: '#e5dfd7',
            height: windowHeight - 56 * 2 - (adLoaded ? 70 : 0),
            paddingBottom: 16,
          }}>
          {!isLoading && !_.isEmpty(items) && (
            <>
              <FlatList
                data={items}
                renderItem={({ item, index }) => {
                  const navigateToChuHanLesson = (type = BOARD_TYPE.THEORY) => {
                    dispatch(
                      programActions.chuHanLessonSelected({
                        selectedChuHanLesson: {
                          board: item,
                          type,
                        },
                      }),
                    );
                    navigation.navigate('ChuHanLesson');
                  };
                  const completed =
                    completedItems && completedItems.includes(item.id);
                  return (
                    <List.Accordion
                      key={`${item.id}-board`}
                      title={
                        <>
                          <Text
                            style={{
                              fontFamily: 'SF-Pro-Detail-Regular',
                              color: '#000',
                            }}>
                            {`${item.title}`}{' '}
                          </Text>
                          {completed && (
                            <MaterialCommunityIcons
                              name="checkbox-marked-circle-outline"
                              color="#5cdb5e"
                              size={18}
                            />
                          )}
                        </>
                      }
                      titleStyle={{ color: '#000' }}
                      left={props => <List.Icon {...props} icon="folder" />}
                      titleEllipsizeMode="tail">
                      <List.Item
                        title={
                          <>
                            <Text
                              style={{
                                fontFamily: 'SF-Pro-Detail-Regular',
                                color: '#000',
                              }}>
                              Lý thuyết{' '}
                            </Text>
                            {completed && (
                              <MaterialCommunityIcons
                                name="checkbox-marked-circle-outline"
                                color="#5cdb5e"
                                size={18}
                              />
                            )}
                          </>
                        }
                        titleStyle={{ color: '#000' }}
                        key={`${item.id}-theory`}
                        titleEllipsizeMode="tail"
                        onPress={() => {
                          navigateToChuHanLesson(BOARD_TYPE.THEORY);
                        }}
                      />
                      {!_.isEmpty(item.quiz) && item.quiz.length && (
                        <List.Item
                          title={
                            <>
                              <Text
                                style={{
                                  fontFamily: 'SF-Pro-Detail-Regular',
                                  color: '#000',
                                }}>
                                {'Bài tập củng cố'}{' '}
                              </Text>
                              {completed && (
                                <MaterialCommunityIcons
                                  name="checkbox-marked-circle-outline"
                                  color="#5cdb5e"
                                  size={18}
                                />
                              )}
                            </>
                          }
                          titleStyle={{ color: '#000' }}
                          key={`${item.id}-excercise`}
                          titleEllipsizeMode="tail"
                          onPress={() => {
                            navigateToChuHanLesson(BOARD_TYPE.EXERCISE);
                          }}
                        />
                      )}
                    </List.Accordion>
                  );
                }}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                ListFooterComponent={() => {
                  return loadingMore ? (
                    <ActivityIndicator
                      size="small"
                      style={{
                        marginBottom: 20,
                      }}
                    />
                  ) : null;
                }}
                onEndReachedThreshold={0.01}
                scrollEventThrottle={0} // 250
                onEndReached={info => {
                  if (scrolled) {
                    loadMore();
                  }
                }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
                onScroll={() => setScrolled(true)}
              />
            </>
          )}
          {!isLoading && items.length === 0 && (
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  textAlign: 'center',
                }}>
                Chưa có bài học chữ Hán nào được tạo
              </Text>
            </View>
          )}
          {isLoading && (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          )}
        </View>
        {user.role !== 'admin' && (
          <View style={{ height: 70 }}>
            <BannerAd
              unitId={AD_UNIT_IDS.BANNER}
              size={BannerAdSize.SMART_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: false,
              }}
              onAdLoaded={() => {
                setAdLoaded(true);
              }}
              onAdFailedToLoad={error => {
                // console.error('Advert failed to load: ', error);
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

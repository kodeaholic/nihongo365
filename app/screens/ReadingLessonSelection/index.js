/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  ToastAndroid,
  Dimensions,
  RefreshControl,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import _ from 'lodash';
const windowHeight = Dimensions.get('window').height;
export const ReadingLessonSelection = ({ navigation }) => {
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

  const fetchItems = async (filter, more = false) => {
    let list = [];
    const headers = await authHeader();
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/reading-boards?`;
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
    const title = `Luyện đọc ${selectedLevel}`;
    navigation.setOptions({
      headerProps: { title },
    });
  }, [navigation, selectedLevel]);

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

  const dispatch = useDispatch();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Header title={`Luyện đọc ${selectedLevel}`} /> */}
        <View
          style={{
            backgroundColor: '#e5dfd7',
            height: windowHeight - 56 * 2 - 70,
          }}>
          {!isLoading && !_.isEmpty(items) && (
            <>
              <FlatList
                data={items}
                renderItem={({ item, index }) => {
                  const navigateToReadingLesson = () => {
                    dispatch(
                      programActions.readingLessonSelected({
                        selectedReadingLesson: {
                          board: item,
                        },
                      }),
                    );
                    navigation.navigate('ReadingLesson', {
                      lessonId: item.id,
                    });
                  };
                  return (
                    <List.Item
                      title={`${item.title}`}
                      titleStyle={{
                        fontFamily: 'SF-Pro-Detail-Regular',
                        color: '#000',
                      }}
                      key={item.id}
                      titleEllipsizeMode="tail"
                      left={props => <List.Icon {...props} icon="folder" />}
                      onPress={navigateToReadingLesson}
                    />
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
                Chưa có bài học nào được tạo
              </Text>
            </View>
          )}
          {isLoading && (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          )}
        </View>
        <View style={{ height: 70 }}>
          <BannerAd
            unitId={TestIds.BANNER}
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
      </SafeAreaView>
    </>
  );
};

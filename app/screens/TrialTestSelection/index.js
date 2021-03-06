/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
// import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { List, FAB } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import * as programActions from '../../actions/programActions';
import _ from 'lodash';
import Skeleton from '@thevsstech/react-native-skeleton';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
const windowHeight = Dimensions.get('window').height;
export const TrialTestSelection = ({ navigation }) => {
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
    let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/trial-tests?`;
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
          'K???t n???i m???ng kh??ng ???n ?????nh',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      } else {
        list = data.results;
        if (_.isEmpty(list)) {
          const msg = 'Ch??a c?? m???c n??o ???????c t???o. Vui l??ng quay l???i sau';
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
        'K???t n???i m???ng kh??ng ???n ?????nh',
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
      /** Update header */
      const title = `Thi th??? ${selectedLevel}`;
      navigation.setOptions({
        headerProps: { title },
      });
      setPage(prev => 1);
      const loadData = async () => {
        setIsLoading(true);
        let filter = { limit: 20, level: selectedLevel, page: 1 };
        const results = await fetchItems(filter);
        setItems(results);
        setIsLoading(false);
      };
      loadData();
    } else {
      const title = 'Thi th??? ';
      navigation.setOptions({
        headerProps: { title },
      });
    }
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
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e5dfd7' }}>
        {true && (
          <>
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
                      const navigateToTrial = () => {
                        dispatch(
                          programActions.trialTestSelected({
                            trialTest: {
                              item,
                            },
                          }),
                        );
                        navigation.navigate('TrialTest', {
                          itemId: item.id,
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
                          onPress={navigateToTrial}
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
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                      />
                    }
                    onScroll={() => setScrolled(true)}
                  />
                </>
              )}
              {isLoading && (
                <Skeleton speed={1000}>
                  {[...Array(16).keys()].map((item, index) => (
                    <View
                      key={'skeleton-' + index}
                      style={[
                        styles.skeletonRow,
                        {
                          marginTop: 10,
                          marginLeft: 8,
                          marginRight: 8,
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 40,
                          width: windowWidth - 16,
                          borderRadius: 3,
                        },
                      ]}
                    />
                  ))}
                </Skeleton>
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
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  opacityButton: {
    margin: 5,
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
    width: 180,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    padding: 0,
    backgroundColor: 'rgba(219, 10, 91, 1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.65,

    elevation: 8,
  },
});

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
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import { Divider, List } from 'react-native-paper';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { Dimensions } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { getPostTimeFromCreatedAt } from '../../helpers/time';
// import DebounceInput from '../../components/DebounceInput';
import * as programActions from '../../actions/programActions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const floorW = Math.floor(windowWidth);
const Rooms = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState({
    title: 'Tổng hợp',
  });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [title] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  const loadAsyncStorage = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user.socialUserDetails && typeof user.socialUserDetails === 'string') {
      user.socialUserDetails = JSON.parse(user.socialUserDetails);
    }
    console.log(user);
    return user;
  };

  // load data for the first time of selectedCategory
  useEffect(() => {
    if (selectedCategory) {
      setPage(prev => 1);

      const loadData = async () => {
        setLoading(true);
        let filter = { limit: 10, title };
        if (selectedCategory && selectedCategory.id) {
          filter.parent = selectedCategory.id;
        }
        loadAsyncStorage();
        setLoading(false);
      };
      loadData();
    }
  }, [selectedCategory, title, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container} scrollEnabled={true}>
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
                  onPress={() => navigateToItem()}
                  style={{
                    minHeight: 100,
                    backgroundColor: '#fff',
                    marginTop: index === 0 ? 5 : 0, // first
                    marginBottom: index === length - 1 ? 10 : 5, // last
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flexDirection: 'row',
                  }}>
                  <View style={{ width: 115, height: 115, padding: 5 }}>
                    <Image
                      source={
                        item.thumbnail
                          ? { uri: item.thumbnail }
                          : require('../../assets/logo.png')
                      }
                      style={{ width: 95, height: 95 }}
                      resizeMethod="auto"
                    />
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
                      {item.title}
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
                      {item.description}
                    </Text>
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
                      {getPostTimeFromCreatedAt(item.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            ListFooterComponent={() => {
              return loadingMore ? (
                <ActivityIndicator size="small" style={{ marginBottom: 10 }} />
              ) : null;
            }}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={0} // 250
            onEndReached={info => {
              if (scrolled) {
                // loadMore();
              }
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
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
});

export default Rooms;

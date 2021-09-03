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
import { useSelector, useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const floorW = Math.floor(windowWidth);
const CategoriesTreeModal = props => {
  const { visible, setVisible, onItemSelected } = props;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const defaultCategory = { title: 'Tổng hợp' };
  const parentTitleStyle = {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 18,
    color: '#000',
  };
  const childTitleStyle = {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
    color: '#000',
    // paddingLeft: 5,
  };
  useEffect(() => {
    async function fetchCategories() {
      const headers = await authHeader();
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      let url = `${apiConfig.baseUrl}${
        apiConfig.apiEndpoint
      }/news-categories?populate=children&sortBy=title:asc&limit=1000`;
      // if (searchTerm && searchTerm.length > 0) {
      //   url += `&title=${searchTerm}`;
      // }
      try {
        setLoading(true);
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (data.code) {
          setLoading(false);
          ToastAndroid.showWithGravityAndOffset(
            'Kết nối mạng không ổn định. Vui lòng thử lại sau',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100,
          );
          setCategories([]);
        } else {
          let list = data.results;
          list = list.filter(item => _.isEmpty(item.parent));
          if (_.isEmpty(list)) {
            ToastAndroid.showWithGravityAndOffset(
              'Kết nối mạng không ổn định. Vui lòng thử lại sau',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
          } else {
            setCategories(list);
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          'Kết nối mạng không ổn định. Vui lòng thử lại sau',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      }
    }
    fetchCategories();
  }, []);
  return (
    <Modal
      isVisible={visible}
      animationIn="bounceInLeft"
      animationOut="bounceOutLeft"
      animationInTiming={1500}
      animationOutTiming={500}
      onBackButtonPress={() => {
        if (visible) {
          setVisible(false);
        }
      }}
      onBackdropPress={() => {
        if (visible) {
          setVisible(false);
        }
      }}
      deviceHeight={windowHeight}
      deviceWidth={windowWidth}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text
            style={[
              {
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'left',
                color: '#fff',
                fontWeight: '500',
                fontSize: 16,
                textTransform: 'uppercase',
                width: windowWidth - 60,
                height: 50,
                margin: 0,
                paddingTop: 7,
              },
            ]}>
            Chuyên mục
          </Text>
          <Text
            onPress={() => {
              if (visible) {
                setVisible(false);
              }
            }}
            style={[
              {
                fontFamily: 'SF-Pro-Display-Regular',
                textAlign: 'center',
                color: '#fff',
                fontWeight: '500',
                fontSize: 10,
                textTransform: 'uppercase',
                width: 20,
                height: 20,
                margin: 0,
                borderRadius: 20,
                borderColor: 'white',
                borderWidth: 1,
              },
            ]}>
            X
          </Text>
        </View>

        <ScrollView style={{ height: windowHeight - 45, marginTop: 5 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingBottom: 7,
            }}>
            {loading && (
              <Skeleton speed={1500}>
                {[...Array(10).keys()].map(item => (
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
                        height: 50,
                        width: '95%',
                        borderRadius: 10,
                      },
                    ]}
                  />
                ))}
              </Skeleton>
            )}
            {!loading && (
              <List.AccordionGroup>
                {categories && categories.length > 0 && (
                  <>
                    <List.Item
                      title={defaultCategory.title}
                      // key={defaultCategory.id}
                      titleStyle={parentTitleStyle}
                      onPress={() => {
                        setTimeout(() => setVisible(!visible), 800);
                        onItemSelected(defaultCategory);
                      }}
                    />
                    <Divider />
                    {categories.map((category, index) => {
                      const n = categories.length;
                      const last = index === n - 1;
                      if (
                        _.isArray(category.children) &&
                        category.children.length
                      ) {
                        return (
                          <View key={category.id}>
                            <List.Accordion
                              // key={category.id}
                              title={category.title}
                              titleStyle={parentTitleStyle}
                              right={properties => null}
                              titleEllipsizeMode="tail"
                              id={category.id}
                              expanded={category.expanded}>
                              {category.children.map((child, idx) => {
                                const m = category.children.length;
                                return (
                                  <View key={child.id}>
                                    <List.Item
                                      title={child.title}
                                      // key={child.id}
                                      titleStyle={childTitleStyle}
                                      onPress={() => {
                                        setTimeout(
                                          () => setVisible(!visible),
                                          800,
                                        );
                                        onItemSelected(child);
                                      }}
                                      left={properties => (
                                        <List.Icon
                                          {...properties}
                                          icon="plus"
                                        />
                                      )}
                                      titleEllipsizeMode="tail"
                                    />
                                    {idx !== m - 1 && <Divider />}
                                  </View>
                                );
                              })}
                            </List.Accordion>
                            {!last && <Divider />}
                          </View>
                        );
                      } else {
                        return (
                          <View key={category.id}>
                            <List.Item
                              title={category.title}
                              // key={category.id}
                              titleStyle={parentTitleStyle}
                              onPress={() => {
                                setTimeout(() => setVisible(!visible), 800);
                                onItemSelected(category);
                              }}
                              titleEllipsizeMode="tail"
                            />
                            {!last && <Divider />}
                          </View>
                        );
                      }
                    })}
                  </>
                )}
              </List.AccordionGroup>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const News = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState({
    title: 'Tổng hợp',
  });
  const [treeModalVisible, setTreeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  // const headerProps = {
  //   title: 'Bảng tin',
  //   disableBackButton: true,
  //   leftAction: {
  //     color: '#fff',
  //     icon: 'table-of-contents',
  //     action: visible => setTreeModalVisible(visible),
  //   },
  // };

  const fetchItems = async (filter, more = false) => {
    let list = [];
    const headers = await authHeader();
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    let url = `${apiConfig.baseUrl}${
      apiConfig.apiEndpoint
    }/news?sortBy=createdAt:desc&populate=parent&mobile=1`;
    if (_.get(filter, 'parent')) {
      url += `&parent=${_.get(filter, 'parent')}`;
    }
    if (_.get(filter, 'title')) {
      url += `&title=${_.get(filter, 'title')}`;
    }
    if (_.get(filter, 'page')) {
      url += `&page=${_.get(filter, 'page')}`;
    }
    if (_.get(filter, 'limit')) {
      url += `&limit=${_.get(filter, 'limit')}`;
    }
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.code) {
        ToastAndroid.showWithGravityAndOffset(
          'Kết nối mạng không ổn định. Vui lòng thử lại sau',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      } else {
        list = data.results;
        if (_.isEmpty(list)) {
          const msg = more
            ? 'Tất cả bài viết đã được hiển thị'
            : 'Chưa có bài viết trong chuyên mục này. Vui lòng quay lại sau';
          ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100,
          );
        } else {
        }
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Kết nối mạng không ổn định. Vui lòng thử lại sau',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
    }
    return list;
  };

  // load data for the first time of selectedCategory
  useEffect(() => {
    if (selectedCategory) {
      setPage(prev => 1);

      navigation.setOptions({
        headerProps: {
          title: 'Bài viết',
          disableBackButton: true,
          leftAction: {
            color: '#fff',
            icon: 'table-of-contents',
            action: visible => setTreeModalVisible(visible),
          },
          subtitle:
            selectedCategory && selectedCategory.title
              ? selectedCategory.title
              : undefined,
        },
      });
      const loadData = async () => {
        setLoading(true);
        let filter = { limit: 10, title };
        if (selectedCategory && selectedCategory.id) {
          filter.parent = selectedCategory.id;
        }
        const results = await fetchItems(filter);
        setItems(results);
        setLoading(false);
      };
      loadData();
    }
  }, [selectedCategory, title, navigation]);

  // loadmore
  const loadMore = () => {
    const load = async () => {
      setLoadingMore(true);
      let filter = { limit: 10, title, page: page + 1 };
      let more = true;
      if (selectedCategory && selectedCategory.id) {
        filter.parent = selectedCategory.id;
      }
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
      let filter = { limit: 10, title, page: 1 };
      let more = true;
      if (selectedCategory && selectedCategory.id) {
        filter.parent = selectedCategory.id;
      }
      const results = await fetchItems(filter, more);
      if (!_.isEmpty(results)) {
        setItems(results);
        setPage(1);
      }
      setTimeout(() => {
        setRefreshing(false);
        ToastAndroid.showWithGravityAndOffset(
          'Bài viết mới nhất đã được cập nhật',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          100,
        );
      }, 2000);
    };
    load();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {treeModalVisible && (
        <CategoriesTreeModal
          visible={treeModalVisible}
          setVisible={setTreeModalVisible}
          onItemSelected={setSelectedCategory}
        />
      )}
      <View style={styles.container}>
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
                    margin: 5,
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
                    {_.isEmpty(_.get(selectedCategory, 'id')) && (
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
                        {_.get(item, 'parent.title')}
                      </Text>
                    )}
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
            ListFooterComponent={() =>
              loadingMore ? (
                <View
                  style={{
                    minHeight: 100,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <></>
              )
            }
            onEndReachedThreshold={0.01}
            scrollEventThrottle={250}
            onEndReached={info => {
              loadMore();
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF8D2',
    paddingTop: 5,
    flex: 1,
    // paddingBottom: 7,
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

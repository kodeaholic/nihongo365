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
import { List } from 'react-native-paper';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { Dimensions } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
// import DebounceInput from '../../components/DebounceInput';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CategoriesTreeModal = props => {
  const { visible, setVisible, onItemSelected } = props;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const defaultCategory = { title: 'Tổng hợp' };
  const parentTitleStyle = {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 15,
    color: '#000',
  };
  const childTitleStyle = {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 13,
    color: '#000',
    paddingLeft: 5,
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
      <View style={{ flex: 1, borderColor: '#fff', boderWidth: 1 }}>
        <Text
          style={[
            {
              fontFamily: 'SF-Pro-Display-Regular',
              textAlign: 'left',
              color: '#fff',
              fontWeight: '500',
              fontSize: 16,
              textTransform: 'uppercase',
              width: windowWidth,
              height: 50,
              margin: 0,
            },
          ]}>
          Chuyên mục
        </Text>
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
                {[...Array(6).keys()].map(item => (
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
                    {categories.map(category => {
                      if (
                        _.isArray(category.children) &&
                        category.children.length
                      ) {
                        return (
                          <List.Accordion
                            key={category.id}
                            title={category.title}
                            titleStyle={parentTitleStyle}
                            right={props => null}
                            titleEllipsizeMode="tail"
                            id={category.id}
                            expanded={category.expanded}>
                            {category.children.map(child => {
                              return (
                                <List.Item
                                  title={child.title}
                                  key={child.id}
                                  titleStyle={childTitleStyle}
                                  onPress={() => {
                                    setTimeout(() => setVisible(!visible), 800);
                                    onItemSelected(child);
                                  }}
                                />
                              );
                            })}
                          </List.Accordion>
                        );
                      } else {
                        return (
                          <List.Item
                            title={category.title}
                            key={category.id}
                            titleStyle={parentTitleStyle}
                            onPress={() => {
                              setTimeout(() => setVisible(!visible), 800);
                              onItemSelected(category);
                            }}
                          />
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
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [treeModalVisible, setTreeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState('');
  const headerProps = {
    title: 'Bảng tin',
    disableBackButton: true,
    leftAction: {
      color: '#fff',
      icon: 'table-of-contents',
      action: visible => setTreeModalVisible(visible),
    },
  };
  useEffect(() => {
    navigation.setOptions({
      headerProps: headerProps,
    });
  }, [navigation, headerProps]);
  useEffect(() => {
    if (selectedCategory) {
      navigation.setOptions({
        headerProps: { ...headerProps, subtitle: selectedCategory?.title },
      });
      setPage(prev => 1);
    }
  }, [selectedCategory, navigation, headerProps]);
  const fetchItems = async filter => {
    let list = [];
    const headers = await authHeader();
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    let url = `${apiConfig.baseUrl}${
      apiConfig.apiEndpoint
    }/news?sortBy=createdAt:desc`;
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
          ToastAndroid.showWithGravityAndOffset(
            'Kết nối mạng không ổn định. Vui lòng thử lại sau',
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
  useEffect(() => {
    const loadData = async () => {
      const results = await fetchItems({
        selectedCategory,
        limit,
        title,
      });
      console.log(results);
      setItems(results);
      setLoading(false);
    };
    setLoading(true);
    loadData();
  }, [selectedCategory, limit, title]);
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    paddingBottom: 7,
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

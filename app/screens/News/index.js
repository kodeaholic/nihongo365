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
} from 'react-native';
import { Badge } from 'react-native-paper';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { Dimensions } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
// import DebounceInput from '../../components/DebounceInput';
export default function News({ navigation }) {
  useEffect(() => {
    navigation.setOptions({ headerProps: { title: 'Trang chủ' } });
  }, [navigation]);
  const [keyWord, setKeyWord] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState('dictionary');
  useEffect(() => {
    function clean(object) {
      const obj = Object.assign({}, object);
      const result = {};
      for (var propName in obj) {
        if (obj[propName].length > 0) {
          result[propName] = obj[propName];
        }
      }
      return result;
    }
    async function search(key) {
      const headers = await authHeader();
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ search: key }),
      };
      let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/search`;
      try {
        setSearching(true);
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (data.code) {
          setSearching(false);
          ToastAndroid.showWithGravityAndOffset(
            'Có lỗi tìm kiếm. Vui lòng thử lại sau ít phút',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            100,
          );
        } else {
          //   console.log(htmlEntityDecode(data.quiz[0].question));
          let res = clean(data.results);
          /* Filter for empty */
          if (_.isEmpty(res)) {
            setSearching(false);
            ToastAndroid.showWithGravityAndOffset(
              'Không tìm thấy kết quả tương tự',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
          } else {
            setResults(res);
            setSearching(false);
            if (res.dictionary) {
              setSelected('dictionary');
            } else if (res.vocabs) {
              setSelected('vocabs');
            } else {
              setSelected('cards');
            }
          }
        }
      } catch (error) {
        setSearching(false);
        return error;
      }
    }
    if (keyWord.length) {
      // console.log(keyWord);
      search(keyWord);
    } else {
      setSearching(false);
      setResults({});
    }
  }, [keyWord]);
  const windowWidth = Dimensions.get('window').width;
  const getItemLabel = item => {
    switch (selected) {
      case 'dictionary':
        return item.phrase;
      case 'vocabs':
        return item.extractedVocab;
      case 'cards':
        return item.letter;
      default:
        return '';
    }
  };
  const getItemMeaning = item => {
    switch (selected) {
      case 'dictionary':
        return item.meaning;
      case 'vocabs':
        return item.vocabMeaning;
      case 'cards':
        return item.meaning;
      default:
        return '';
    }
  };
  const renderListItem = (item, index) => {
    return (
      <View style={styles.listItem} key={item.id}>
        <Text>{getItemLabel(item)}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFFFFF', paddingBottom: 15 }}>
      <View styles={styles.container}>
        {searching && (
          <Skeleton speed={1000}>
            <View
              style={[
                styles.skeletonRow,
                {
                  marginLeft: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 36,
                },
              ]}>
              <View
                style={[
                  {
                    width: (windowWidth - 32) / 3,
                    height: 36,
                    borderRadius: 50,
                    marginRight: 10,
                  },
                ]}
              />
              <View
                style={[
                  {
                    width: (windowWidth - 32) / 3,
                    height: 36,
                    borderRadius: 50,
                    marginRight: 10,
                  },
                ]}
              />
              <View
                style={[
                  {
                    width: (windowWidth - 32) / 3,
                    height: 36,
                    borderRadius: 50,
                    marginRight: 0,
                  },
                ]}
              />
            </View>
            <View
              style={[
                styles.skeletonRow,
                {
                  marginTop: 10,
                  marginLeft: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 80,
                  width: windowWidth - 16,
                  borderRadius: 10,
                },
              ]}
            />
            <View
              style={[
                styles.skeletonRow,
                {
                  marginTop: 10,
                  marginLeft: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 80,
                  width: windowWidth - 16,
                  borderRadius: 10,
                },
              ]}
            />
            <View
              style={[
                styles.skeletonRow,
                {
                  marginTop: 10,
                  marginLeft: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 80,
                  width: windowWidth - 16,
                  borderRadius: 10,
                },
              ]}
            />
            <View
              style={[
                styles.skeletonRow,
                {
                  marginTop: 10,
                  marginLeft: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 80,
                  width: windowWidth - 16,
                  borderRadius: 10,
                },
              ]}
            />
          </Skeleton>
        )}
        {!searching && !_.isEmpty(results) && (
          <View style={styles.buttonGroup}>
            {true && (
              <TouchableOpacity
                disabled={
                  selected === 'dictionary' ||
                  !_.get(results, 'dictionary.length')
                }
                onPress={() => setSelected('dictionary')}
                style={[
                  styles.buttonGroupItem,
                  selected === 'dictionary' ? styles.buttonActive : {},
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    selected === 'dictionary'
                      ? styles.textActivie
                      : styles.textNormal,
                  ]}>
                  Từ điển
                </Text>
                {_.get(results, 'dictionary.length') && (
                  <Badge
                    style={[
                      selected === 'dictionary'
                        ? styles.badgeActive
                        : styles.badge,
                    ]}>
                    {_.get(results, 'dictionary.length')}
                  </Badge>
                )}
              </TouchableOpacity>
            )}
            {true && (
              <TouchableOpacity
                onPress={() => setSelected('vocabs')}
                disabled={
                  selected === 'vocabs' || !_.get(results, 'vocabs.length')
                }
                style={[
                  styles.buttonGroupItem,
                  selected === 'vocabs' ? styles.buttonActive : {},
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    selected === 'vocabs'
                      ? styles.textActivie
                      : styles.textNormal,
                  ]}>
                  Từ vựng
                </Text>
                {_.get(results, 'vocabs.length') && (
                  <Badge
                    style={[
                      selected === 'vocabs' ? styles.badgeActive : styles.badge,
                    ]}>
                    {_.get(results, 'vocabs.length')}
                  </Badge>
                )}
              </TouchableOpacity>
            )}
            {true && (
              <TouchableOpacity
                onPress={() => setSelected('cards')}
                disabled={
                  selected === 'cards' || !_.get(results, 'cards.length')
                }
                style={[
                  styles.buttonGroupItem,
                  styles.buttonGroupItem_lastChild,
                  selected === 'cards' ? styles.buttonActive : {},
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    selected === 'cards'
                      ? styles.textActivie
                      : styles.textNormal,
                  ]}>
                  Chữ Hán
                </Text>
                {_.get(results, 'cards.length') && (
                  <Badge
                    style={[
                      selected === 'cards' ? styles.badgeActive : styles.badge,
                    ]}>
                    {_.get(results, 'cards.length')}
                  </Badge>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
        {!searching && !_.isEmpty(results[selected]) && (
          <FlatList
            data={results[selected]}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.listItem}>
                  <Text style={[styles.japaneseText]}>
                    {getItemLabel(item)}
                  </Text>
                  <Text style={[styles.japaneseText]}>
                    {getItemMeaning(item)}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeletonRow: {
    // marginLeft: 8,
    // marginRight: 8,
    // // paddingLeft: 8,
    // // paddingRight: 8,
  },
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

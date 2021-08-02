/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import Skeleton from '@thevsstech/react-native-skeleton';
import _ from 'lodash';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import DebounceInput from '../../components/DebounceInput';
export default function Dictionary({ navigation }) {
  useEffect(() => {
    navigation.setOptions({ headerProps: { title: 'Từ điển' } });
  }, [navigation]);
  const [keyWord, setKeyWord] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  useEffect(() => {
    function clean(object) {
      const obj = Object.assign({}, object);
      const result = {};
      for (var propName in obj) {
        if (obj[propName].length > 0) {
          console.log(propName);
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
          console.log(res);
          if (_.isEmpty(res)) {
            ToastAndroid.showWithGravityAndOffset(
              'Không tìm thấy kết quả tương tự',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
          } else {
            res = res.filter(item => _.isArray(item) && !_.isEmpty(item));
          }
          setResults(res);
          setSearching(false);
        }
      } catch (error) {
        setSearching(false);
        return error;
      }
    }
    if (keyWord.length) {
      // console.log(keyWord);
      search(keyWord);
    }
  }, [keyWord]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View styles={styles.container}>
        <DebounceInput handleInputChange={setKeyWord} />
        {searching && (
          <Skeleton speed={1000}>
            <View
              style={[
                styles.skeletonRow,
                { flexDirection: 'row', alignItems: 'center' },
              ]}>
              <View
                style={[
                  styles.skeletonRow,
                  { width: 60, height: 60, borderRadius: 50 },
                ]}
              />
              <View style={[styles.skeletonRow, {}]}>
                <View
                  style={[
                    styles.skeletonRow,
                    { width: 120, height: 20, borderRadius: 4 },
                  ]}
                />
                <View
                  style={[
                    styles.skeletonRow,
                    {
                      marginTop: 6,
                      width: 80,
                      height: 20,
                      borderRadius: 4,
                    },
                  ]}
                />
              </View>
            </View>
          </Skeleton>
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
    marginLeft: 8,
    marginRight: 8,
  },
});

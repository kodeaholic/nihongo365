/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
import _ from 'lodash';
import { getTestTypeName, TEST_TYPES } from '../../constants/test';
export const SubTestSelection = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState('');
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  useEffect(() => {
    if (!_.isEmpty(selectedTestType) && !_.isEmpty(selectedLevel)) {
      async function getItems() {
        const headers = await authHeader();
        const requestOptions = {
          method: 'GET',
          headers: headers,
        };
        let url = `${apiConfig.baseUrl}${
          apiConfig.apiEndpoint
        }/sub-tests?level=${selectedLevel}&limit=1000&type=${selectedTestType}`;
        try {
          setIsLoading(true);
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          if (data.code) {
            ToastAndroid.showWithGravityAndOffset(
              data.message,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
          } else {
            setItems(data.results);
            setIsLoading(false);
          }
        } catch (error) {
          return error;
        }
      }
      getItems();

      /** Update header */
      //   const title = `Luyện thi ${selectedLevel}`;
      //   const subtitle = '';
      //   navigation.setOptions({
      //     headerProps: { title },
      //   });
    }
    const title = `Luyện thi ${selectedLevel}`;
    navigation.setOptions({
      headerProps: { title },
    });
  }, [navigation, selectedLevel, selectedTestType]);
  const dispatch = useDispatch();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: '#e5dfd7' }}
          contentContainerStyle={{ flex: 1 }}>
          {_.isEmpty(selectedTestType) && (
            <>
              <View style={{ height: '100%', flex: 1 }}>
                <TouchableOpacity
                  style={[styles.opacityButton, styles.greenBackground]}
                  onPress={() => setSelectedTestType(TEST_TYPES.TUVUNG)}>
                  <Text style={[styles.opacityButtonText, styles.whiteText]}>
                    {getTestTypeName(TEST_TYPES.TUVUNG)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.opacityButton, styles.orangeBackground]}
                  onPress={() => setSelectedTestType(TEST_TYPES.CHUHAN)}>
                  <Text style={[styles.opacityButtonText, styles.whiteText]}>
                    {getTestTypeName(TEST_TYPES.CHUHAN)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.opacityButton, styles.blueBackground]}
                  onPress={() => setSelectedTestType(TEST_TYPES.NGUPHAP)}>
                  <Text style={[styles.opacityButtonText, styles.whiteText]}>
                    {getTestTypeName(TEST_TYPES.NGUPHAP)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.opacityButton, styles.frolyBackground]}
                  onPress={() => setSelectedTestType(TEST_TYPES.TIMNGHIA)}>
                  <Text style={[styles.opacityButtonText, styles.whiteText]}>
                    {getTestTypeName(TEST_TYPES.TIMNGHIA)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.opacityButton, styles.purpleBackground]}
                  onPress={() => setSelectedTestType(TEST_TYPES.GHEPCAU)}>
                  <Text style={[styles.opacityButtonText, styles.whiteText]}>
                    {getTestTypeName(TEST_TYPES.GHEPCAU)}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {!isLoading &&
            items.map(item => {
              const navigateToReadingLesson = () => {
                dispatch(
                  programActions.readingLessonSelected({
                    selectedReadingLesson: {
                      item,
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
                  key={item.id}
                  titleEllipsizeMode="tail"
                  left={props => <List.Icon {...props} icon="folder" />}
                  onPress={navigateToReadingLesson}
                />
              );
            })}
          {!isLoading && items.length === 0 && !_.isEmpty(selectedTestType) && (
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  textAlign: 'center',
                }}>
                Chưa có bài thi nào được tạo
              </Text>
            </View>
          )}
          {isLoading && (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          )}
        </ScrollView>
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
});

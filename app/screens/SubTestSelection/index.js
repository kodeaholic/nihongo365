/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { List, FAB } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
import _ from 'lodash';
import { getTestTypeName, TEST_TYPES } from '../../constants/test';
import Skeleton from '@thevsstech/react-native-skeleton';
export const SubTestSelection = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState(0);
  const [fabVisible, setFabVisible] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  useEffect(() => {
    if (selectedTestType > 0 && !_.isEmpty(selectedLevel)) {
      setIsLoading(true);
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
            if (_.isEmpty(data.results)) {
              ToastAndroid.showWithGravityAndOffset(
                'Chưa có bài thi trong mục này, vui lòng quay lại sau',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                0,
                100,
              );
            }
            setItems(data.results);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          return error;
        }
        setFabVisible(true);
      }
      getItems();

      /** Update header */
      const title = `Luyện thi ${selectedLevel}`;
      const subtitle = getTestTypeName(selectedTestType);
      navigation.setOptions({
        headerProps: { title, subtitle },
      });
    } else {
      const title = `Luyện thi ${selectedLevel}`;
      navigation.setOptions({
        headerProps: { title },
      });
    }
  }, [navigation, selectedLevel, selectedTestType]);
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {selectedTestType === 0 && (
          <>
            <View style={{ height: '100%', flex: 1 }}>
              <TouchableOpacity
                style={[styles.opacityButton, styles.greenBackground]}
                onPress={() => {
                  setSelectedTestType(TEST_TYPES.TUVUNG);
                }}>
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
                style={[
                  styles.opacityButton,
                  styles.purpleBackground,
                  { marginBottom: 5 },
                ]}
                onPress={() => setSelectedTestType(TEST_TYPES.GHEPCAU)}>
                <Text style={[styles.opacityButtonText, styles.whiteText]}>
                  {getTestTypeName(TEST_TYPES.GHEPCAU)}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {selectedTestType > 0 && (
          <>
            <ScrollView style={{ backgroundColor: '#e5dfd7' }}>
              {!isLoading && (
                <View style={{ height: '100%', flex: 1 }}>
                  {items.map(item => {
                    const navigateToSubTest = () => {
                      dispatch(
                        programActions.subTestSelected({
                          subTest: {
                            item,
                          },
                        }),
                      );
                      navigation.navigate('SubTest', {
                        itemId: item.id,
                        itemType: item.type,
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
                        onPress={navigateToSubTest}
                      />
                    );
                  })}
                </View>
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
            </ScrollView>
            {fabVisible && (
              <FAB
                style={styles.fab}
                //   small
                onPress={() => {
                  setFabVisible(false);
                  setSelectedTestType(0);
                }}
                label="phần thi khác"
              />
            )}
          </>
        )}
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

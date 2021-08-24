/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
// import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { List, FAB } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import * as programActions from '../../actions/programActions';
import _ from 'lodash';
import Skeleton from '@thevsstech/react-native-skeleton';
export const TrialTestSelection = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  useEffect(() => {
    if (!_.isEmpty(selectedLevel)) {
      setIsLoading(true);
      async function getItems() {
        const headers = await authHeader();
        const requestOptions = {
          method: 'GET',
          headers: headers,
        };
        let url = `${apiConfig.baseUrl}${
          apiConfig.apiEndpoint
        }/trial-tests?level=${selectedLevel}&limit=1000`;
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
      }
      getItems();

      /** Update header */
      const title = `Thi thử ${selectedLevel}`;
      navigation.setOptions({
        headerProps: { title },
      });
    } else {
      const title = 'Thi thử ';
      navigation.setOptions({
        headerProps: { title },
      });
    }
  }, [navigation, selectedLevel]);
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {true && (
          <>
            <ScrollView style={{ backgroundColor: '#e5dfd7' }}>
              {!isLoading && (
                <View style={{ height: '100%', flex: 1 }}>
                  {items.map(item => {
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
                        key={item.id}
                        titleEllipsizeMode="tail"
                        left={props => <List.Icon {...props} icon="folder" />}
                        onPress={navigateToTrial}
                      />
                    );
                  })}
                </View>
              )}
              {isLoading && (
                <Skeleton speed={1000}>
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                  <View
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
                </Skeleton>
              )}
            </ScrollView>
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

/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Text, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/commonHeader';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
export const ListeningLessonSelection = ({ navigation }) => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  useEffect(() => {
    async function getBoards() {
      const headers = await authHeader();
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      let url = `${apiConfig.baseUrl}${
        apiConfig.apiEndpoint
      }/listening-boards?level=${selectedLevel}&limit=100`;
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
          //   console.log(data.results);
          setBoards(data.results);
          console.log(data.results);
          setIsLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    getBoards();
    /** Update header */
    const title = `Luyện nghe ${selectedLevel}`;
    navigation.setOptions({ headerProps: { title } });
  }, [navigation, selectedLevel]);
  const dispatch = useDispatch();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Header title={`Luyện nghe ${selectedLevel}`} /> */}
        <ScrollView style={{ backgroundColor: '#e5dfd7' }}>
          {!isLoading &&
            boards.map(board => {
              const navigateToListeningLesson = () => {
                dispatch(
                  programActions.listeningLessonSelected({
                    selectedListeningLesson: {
                      board,
                    },
                  }),
                );
                navigation.navigate('ListeningLesson');
              };
              return (
                <List.Item
                  title={`${board.title}`}
                  key={board.id}
                  titleEllipsizeMode="tail"
                  left={props => <List.Icon {...props} icon="folder" />}
                  onPress={navigateToListeningLesson}
                />
              );
            })}
          {!isLoading && boards.length === 0 && (
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  textAlign: 'center',
                }}>
                Chưa có bài học nghe nào được tạo
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
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  text: {
    textAlign: 'center',
    margin: 8,
    fontSize: 20,
  },
  description: {
    margin: 8,
    fontSize: 20,
  },
});

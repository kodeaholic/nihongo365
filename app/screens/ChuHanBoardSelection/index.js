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
import { BOARD_TYPE } from '../../constants/board';
import _ from 'lodash';
const getLetters = board => {
  let letters = [];
  if (board.cards && board.cards.length) {
    letters = board.cards.map(function(card) {
      return card.letter;
    });
  }
  return letters.join();
};
export const ChuHanBoardSelection = ({ navigation }) => {
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
      }/boards?level=${selectedLevel}&limit=100&populate=cards`;
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
          setBoards(data.results);
          // console.log(data.results);
          setIsLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    getBoards();
    /** Update header */
    const title = `Học chữ Hán ${selectedLevel}`;
    navigation.setOptions({ headerProps: { title } });
  }, [navigation, selectedLevel]);
  const dispatch = useDispatch();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Header title={`Học chữ Hán ${selectedLevel}`} /> */}
        <ScrollView style={{ backgroundColor: '#e5dfd7' }}>
          {!isLoading &&
            boards.map(board => {
              const navigateToChuHanLesson = (type = BOARD_TYPE.THEORY) => {
                dispatch(
                  programActions.chuHanLessonSelected({
                    selectedChuHanLesson: {
                      board,
                      type,
                    },
                  }),
                );
                navigation.navigate('ChuHanLesson');
              };
              return (
                <List.Accordion
                  key={`${board.id}-board`}
                  title={`${board.title}: ${getLetters(board)}`}
                  left={props => <List.Icon {...props} icon="folder" />}
                  titleEllipsizeMode="tail">
                  <List.Item
                    title={'Lý thuyết'}
                    key={`${board.id}-theory`}
                    titleEllipsizeMode="tail"
                    onPress={() => {
                      navigateToChuHanLesson(BOARD_TYPE.THEORY);
                    }}
                  />
                  {!_.isEmpty(board.quiz) && board.quiz.length && (
                    <List.Item
                      title={'Bài tập củng cố'}
                      key={`${board.id}-excercise`}
                      titleEllipsizeMode="tail"
                      onPress={() => {
                        navigateToChuHanLesson(BOARD_TYPE.EXERCISE);
                      }}
                    />
                  )}
                </List.Accordion>
              );
            })}
          {!isLoading && boards.length === 0 && (
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  textAlign: 'center',
                }}>
                Chưa có bài học chữ Hán nào được tạo
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

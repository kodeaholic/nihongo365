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
export const VocabTopicSelection = () => {
  const [topics, setTopics] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const navigation = useNavigation();
  useEffect(() => {
    async function getTopics() {
      const headers = await authHeader();
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      let url = `${apiConfig.baseUrl}${
        apiConfig.apiEndpoint
      }/topics?name=${selectedLevel}`;
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
          setTopics(data.results);
          setChapters(data.chapters);
          setLessons(data.lessons);
          setIsLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    getTopics();
  }, [selectedLevel]);

  const Chapter = props => {
    const { data, listOfLessons } = props;
    const dispatch = useDispatch();
    return (
      <List.Accordion
        title={`${data.name} - ${data.description}`}
        id={data.id}
        left={() => <List.Icon {...props} icon="folder" />}>
        {listOfLessons.map(lesson => {
          const navigateToVocabLesson = () => {
            const chapterName = data.name;
            const id = lesson.id;
            const name = lesson.meaning;
            const chapterDescription = data.description;
            const audioSrc = data.audioSrc;
            dispatch(
              programActions.vocabLessonSelected({
                selectedVocabLesson: {
                  id,
                  chapterName,
                  name,
                  chapterDescription,
                  audioSrc,
                },
              }),
            );
            navigation.navigate('VocabLesson');
          };
          return (
            <List.Item
              title={`${lesson.name} - ${lesson.meaning}`}
              key={lesson.id}
              titleEllipsizeMode="tail"
              onPress={navigateToVocabLesson}
            />
          );
        })}
      </List.Accordion>
    );
  };

  const Topic = props => {
    const { item, listOfChapters } = props;
    // console.log(props);
    return (
      <List.AccordionGroup>
        <View>
          {/* <Text style={styles.text}>{item.name}</Text> */}
          <Text style={styles.text}>{item.description}</Text>
          {/**List of chapters goes here */}
          {listOfChapters &&
            listOfChapters.map(chapter => {
              const listOfLessons = lessons.filter(
                itx => itx.chapter === chapter.id,
              );
              return (
                <Chapter
                  data={chapter}
                  key={chapter.id}
                  listOfLessons={listOfLessons}
                />
              );
            })}
        </View>
      </List.AccordionGroup>
    );
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={`Học từ vựng ${selectedLevel}`} />
        <ScrollView>
          {!isLoading &&
            topics.map(topic => {
              return (
                <Topic
                  key={topic.id}
                  item={topic}
                  listOfChapters={chapters.filter(
                    item => item.topic === topic.id,
                  )}
                />
              );
            })}
          {!isLoading && topics.length === 0 && (
            <View>
              <Text style={{ fontFamily: 'SF-Pro-Display-Regular' }}>
                Chưa có chủ đề nào được tạo
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
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     backgroundColor: '#f0f6f9',
  //   },
});

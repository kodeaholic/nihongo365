/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
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
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const VocabTopicSelection = ({ navigation }) => {
  const [topics, setTopics] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [adLoaded, setAdLoaded] = useState(false);
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

    /** Update header */
    const title = `H???c t??? v???ng ${selectedLevel}`;
    navigation.setOptions({ headerProps: { title } });
  }, [navigation, selectedLevel]);

  const Chapter = props => {
    const { data, listOfLessons } = props;
    const dispatch = useDispatch();
    return (
      <List.Accordion
        title={`${data.name} - ${data.description}`}
        titleStyle={{
          fontFamily: 'SF-Pro-Detail-Regular',
          color: '#000',
        }}
        id={data.id}
        left={() => <List.Icon {...props} icon="folder" />}>
        {listOfLessons.map(lesson => {
          const navigateToVocabLesson = () => {
            const chapterName = data.name;
            const id = lesson.id;
            const name = lesson.meaning;
            const chapterDescription = data.description;
            const audioSrc = lesson.audioSrc;
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
              titleStyle={{
                fontFamily: 'SF-Pro-Detail-Regular',
                color: '#000',
              }}
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e5dfd7' }}>
        <View
          style={{
            backgroundColor: '#e5dfd7',
            height: windowHeight - 56 * 2 - 70,
          }}>
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
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Display-Regular',
                    textAlign: 'center',
                  }}>
                  Ch??a c?? ch??? ????? n??o ???????c t???o
                </Text>
              </View>
            )}
            {isLoading && (
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            )}
          </ScrollView>
        </View>
        <View style={{ height: 70 }}>
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: false,
            }}
            onAdLoaded={() => {
              setAdLoaded(true);
            }}
            onAdFailedToLoad={error => {
              // console.error('Advert failed to load: ', error);
            }}
          />
        </View>
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
    fontFamily: 'SF-Pro-Detail-Regular',
    color: '#000',
  },
  description: {
    margin: 8,
    fontSize: 20,
    fontFamily: 'SF-Pro-Detail-Regular',
    color: '#000',
  },
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     backgroundColor: '#f0f6f9',
  //   },
});

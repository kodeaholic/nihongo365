import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/commonHeader';
import { useSelector } from 'react-redux';
import { List } from 'react-native-paper';
import { SafeAreaView, FlatList } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
export const VocabTopicSelection = () => {
  const [topics, setTopics] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
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
          //   console.log(data.results);
          //   console.log(data.chapters);
          setTopics(data.results);
          setChapters(data.chapters);
          setIsLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    getTopics();
  }, [selectedLevel]);
  //   useEffect(() => {
  //     setIsLoading(false);
  //   }, [isLoading, topics, chapters]);
  //   const Lesson = item => {
  //     <List.Item title={item.name} key={item.id} id={item.id} />;
  //   };

  const Chapter = props => {
    const { data } = props;
    console.log(data);
    return (
      <List.Accordion
        title={`${data.name} - ${data.description}`}
        id={data.id}
        left={() => <List.Icon {...props} icon="folder" />}>
        <List.Item title={data.name} />
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
              return <Chapter data={chapter} />;
            })}
        </View>
      </List.AccordionGroup>
    );
  };
  return (
    <>
      <Header title={`Học từ vựng ${selectedLevel}`} />
      {!isLoading &&
        topics.map(topic => {
          return (
            <Topic
              item={topic}
              listOfChapters={chapters.filter(item => item.topic === topic.id)}
            />
          );
        })}
      {!isLoading && topics.length === 0 && (
        <View>
          <Text>Không có chủ đề nào được tạo</Text>
        </View>
      )}
      {isLoading && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}
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

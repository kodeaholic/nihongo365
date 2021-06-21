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
export const VocabLesson = () => {
  const [loading, setLoading] = useState(false);
  const [vocabs, setVocabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedVocabLesson = useSelector(
    state => state.programReducer.selectedVocabLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  useEffect(() => {
    async function getVocabs() {
      const headers = await authHeader();
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/vocabs?lesson=${
        selectedVocabLesson.id
      }`;
      try {
        setLoading(true);
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
          console.log(data.results);
          setVocabs(data.results);
          setLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    if (selectedVocabLesson.id) {
      getVocabs();
    }
    getVocabs();
  }, [selectedVocabLesson.id]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          title={`Học từ vựng ${selectedLevel}`}
          subtitle={`${selectedVocabLesson.chapterName} - ${
            selectedVocabLesson.chapterDescription
          } - ${selectedVocabLesson.name}`}
        />
        <ScrollView>
          <View>
            <Text style={styles.text}>{`Từ vựng ${selectedLevel} - ${
              selectedVocabLesson.chapterName
            } (${selectedVocabLesson.chapterDescription})`}</Text>
            <Text style={styles.text}>{`Bài『 ${
              selectedVocabLesson.name
            } 』`}</Text>
          </View>
          {loading && (
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

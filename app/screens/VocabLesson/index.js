/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, FlatList } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
// import * as programActions from '../../actions/programActions';
// import { furiganaHTML, rubyHtmlTransform } from '../../helpers/furigana';
import { AudioPlayer } from '../../components/audio-player';
// import { HeadlessAudioPlayer } from '../../components/headless-audio-player';
import _ from 'lodash';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import AutoHeightWebView from 'react-native-autoheight-webview';
export const VocabLesson = ({ navigation }) => {
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
      }&limit=100`;
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
          setVocabs(data.results);
          setLoading(false);
          if (!data.results.length) {
            ToastAndroid.showWithGravityAndOffset(
              'Chưa có từ vựng nào được thêm. Xin vui lòng quay lại sau',
              200,
              ToastAndroid.TOP,
              0,
              100,
            );
          }
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
  const renderFlatListItem = ({ item }) => {
    const { id, vocab, vocabMeaning, example, exampleMeaning } = item;
    return (
      <Card style={styles.card} key={id}>
        <Divider />
        <View style={styles.parentView}>
          <View
            style={{
              flex: 2,
              borderRightWidth: 0.5,
              marginLeft: 5,
            }}>
            <View style={styles.parentView}>
              <View
                style={{
                  flex: 5,
                  marginRight: 0,
                  marginLeft: 0,
                  height: 'auto',
                }}>
                <AutoHeightWebView
                  style={{ marginTop: 5, minHeight: 50, height: 'auto' }}
                  source={{
                    html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                      vocab,
                    )}</div>`,
                  }}
                  scalesPageToFit={true}
                  viewportContent={'width=device-width, user-scalable=no'}
                />
                <Text style={{ marginLeft: 5 }}>{vocabMeaning}</Text>
              </View>
            </View>
          </View>
          {!_.isEmpty(example) && (
            <View style={{ flex: 5, height: 'auto' }}>
              <AutoHeightWebView
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  minHeight: 100,
                  height: 'auto',
                }}
                source={{
                  html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                    example,
                  )}</div>`,
                }}
                scalesPageToFit={true}
                viewportContent={'width=device-width, user-scalable=no'}
              />
              <Text style={{ marginLeft: 5 }}>{exampleMeaning}</Text>
            </View>
          )}
        </View>
        <Divider />
      </Card>
    );
  };

  /* Update headerProps onMounted */
  useEffect(() => {
    const title = `Học từ vựng ${selectedLevel}`;
    const subtitle = `${selectedVocabLesson.chapterName} - ${
      selectedVocabLesson.chapterDescription
    } - ${selectedVocabLesson.name}`;
    navigation.setOptions({ headerProps: { title, subtitle } });
  }, [navigation, selectedLevel, selectedVocabLesson]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Header
          title={`Học từ vựng ${selectedLevel}`}
          subtitle={`${selectedVocabLesson.chapterName} - ${
            selectedVocabLesson.chapterDescription
          } - ${selectedVocabLesson.name}`}
        /> */}
        {/* <ScrollView style={{ flex: 1 }}> */}
        {!loading && (
          <FlatList
            data={vocabs}
            renderItem={renderFlatListItem}
            keyExtractor={item => item.id}
          />
        )}
        {loading && (
          <>
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          </>
        )}
        {/* </ScrollView> */}
        {selectedVocabLesson.audioSrc && (
          <View
            style={{
              // position: 'absolute',
              height: 60,
              marginTop: 8,
              fontSize: 18,
              textAlign: 'center',
              fontFamily: 'SF-Pro-Detail-Regular',
            }}>
            {!loading && selectedVocabLesson.audioSrc && (
              <AudioPlayer src={selectedVocabLesson.audioSrc} />
            )}
            {!loading && !selectedVocabLesson.audioSrc && (
              <Text style={{ textAlign: 'center', marginTop: 10 }}>
                Bài học không có file audio
              </Text>
            )}
          </View>
        )}
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
  cardTitle: { fontWeight: 'normal' },
  cardSub: { fontSize: 13, color: '#0097e8' },
  chip: {
    marginRight: 5,
    backgroundColor: '#5cdb5e',
    color: '#ffffff',
  },
  parentView: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 'auto',
  },
  childView: {
    flex: 1,
  },
  card: {
    margin: 0,
    backgroundColor: '#dbd4c8',
    flex: 1,
  },
});

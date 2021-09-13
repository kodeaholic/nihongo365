/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import { AudioPlayer } from '../../components/audio-player';
import _ from 'lodash';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import AutoHeightWebView from 'react-native-autoheight-webview';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const VocabLesson = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [vocabs, setVocabs] = useState([]);
  const selectedVocabLesson = useSelector(
    state => state.programReducer.selectedVocabLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [html, setHtml] = useState('');
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
  useEffect(() => {
    if (vocabs && vocabs.length) {
      let content = '';
      vocabs.map(item => {
        const { vocab, vocabMeaning, example, exampleMeaning } = item;
        content += `
            <div style="display: flex; flex-direction: row; width: ${windowWidth -
              10}px;border-bottom: 0.5px solid #000; margin-left: 5px;">
              <div style="width: ${(windowWidth - 10) / 3}px; margin: 5px;">
                ${htmlEntityDecode(vocab)}
                <div style="font-size: 15px;">${vocabMeaning}</div>
              </div>
              <div style="width: ${((windowWidth - 10) * 2) /
                3}px;margin: 5px;">
              ${htmlEntityDecode(example)}
                <div style="font-size: 15px;">${exampleMeaning}</div>
              </div>
            </div>
            `;
      });
      content = `<html lang="en" style="scroll-behavior: smooth;"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"><style>body{padding:0;margin:0}*{max-width:calc(100vw - 10px);outline:none;word-break:break-word}*{scroll-behavior:smooth;font-family:'Source Sans Pro',serif}*{scroll-behavior:smooth}main{font-family:'Source Sans Pro',serif;padding:10px 0 80px 0;width:calc(100vw);height:calc(100vh);display:flex;flex-direction:column;font-weight:normal;overflow-y:scroll;margin:0}.content{font-family:'Source Sans Pro',serif;font-weight:bold;line-height:220%;word-break:break-word}img{max-width:${windowWidth -
        10}px;margin:5px;height:auto}*{font-weight:normal;}</style></head><body cz-shortcut-listen="true" style="background-color: #dbd4c8;"> <main><div class="content">${content}</div><br/> </main></body></html>`;
      setHtml(content);
    }
  }, [vocabs]);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {!loading && !_.isEmpty(html) && (
          <>
            <WebView
              style={{
                flex: 1,
                backgroundColor: '#fff',
                height: windowHeight - 60,
                paddingBottom: 10,
              }}
              source={{
                html: html,
              }}
            />
            {/* <FlatList
            data={vocabs}
            renderItem={renderFlatListItem}
            keyExtractor={item => item.id}
          /> */}
          </>
        )}
        {loading && (
          <>
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          </>
        )}
        {!_.isEmpty(selectedVocabLesson.audioSrc) && (
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

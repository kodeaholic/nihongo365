/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Text, Chip, Card, Divider, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/commonHeader';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
import { furiganaHTML, rubyHtmlTransform } from '../../helpers/furigana';
import HTML from 'react-native-render-html';
import { AudioPlayer } from '../../components/audio-player';
import { HeadlessAudioPlayer } from '../../components/headless-audio-player';
import _ from 'lodash';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
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
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View style={{ flex: 0.15 }}> */}
        <Header
          title={`Học từ vựng ${selectedLevel}`}
          subtitle={`${selectedVocabLesson.chapterName} - ${
            selectedVocabLesson.chapterDescription
          } - ${selectedVocabLesson.name}`}
        />
        {/* </View> */}
        <ScrollView style={{ flex: 1 }}>
          {!loading &&
            vocabs.map((vocab, index) => {
              return (
                <Card style={styles.card} key={vocab.id}>
                  {/* <Card.Content> */}
                  <Divider />
                  <View style={styles.parentView}>
                    <View
                      style={{
                        flex: 1.5,
                        borderRightWidth: 0.5,
                        marginLeft: 5,
                      }}>
                      <View style={styles.parentView}>
                        {/* <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                          }}>
                          <Badge
                            style={{
                              marginRight: 3.5,
                              backgroundColor: '#fff',
                              color: '#000',
                              borderWidth: 0.5,
                            }}>
                            {index + 1}
                          </Badge>
                        </View> */}
                        <View
                          style={{
                            flex: 5,
                            marginRight: 0,
                            marginLeft: 0,
                            height: 100,
                          }}>
                          <AutoHeightWebView
                            style={{ marginTop: 5 }}
                            source={{
                              html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px; font-size: 15px;">${htmlEntityDecode(
                                vocab.vocab,
                              )}</div>`,
                            }}
                            scalesPageToFit={true}
                            viewportContent={
                              'width=device-width, user-scalable=no'
                            }
                          />
                          {/* <WebView
                            source={{
                              html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px; font-size: 15px;">${htmlEntityDecode(
                                vocab.vocab,
                              )}</div>`,
                            }}
                            style={{ backgroundColor: '#dbd4c8' }}
                            injectedJavaScript={
                              "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                            }
                            scalesPageToFit={false}
                          /> */}
                          <Text style={{ marginLeft: 5 }}>
                            {vocab.vocabMeaning}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 5, height: 'auto' }}>
                      {/* <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          borderRightWidth: 0.5,
                          alignItems: 'center',
                        }}>
                        <HeadlessAudioPlayer src={vocab.audioSrc} size={20} />
                      </View> */}
                      <AutoHeightWebView
                        style={{
                          marginTop: 5,
                          marginLeft: 5,
                          minHeight: 100,
                          height: 'auto',
                        }}
                        source={{
                          html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px; font-size: 15px;">${htmlEntityDecode(
                            vocab.example,
                          )}</div>`,
                        }}
                        scalesPageToFit={true}
                        viewportContent={'width=device-width, user-scalable=no'}
                      />
                      <Text style={{ marginLeft: 5 }}>
                        {vocab.exampleMeaning}
                      </Text>
                      {/* <View style={{ height: 120 }}>
                        <WebView
                          source={{
                            html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px; font-size: 15px;">${htmlEntityDecode(
                              vocab.example,
                            )}</div>`,
                          }}
                          style={{ backgroundColor: '#dbd4c8' }}
                          injectedJavaScript={
                            "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                          }
                          scalesPageToFit={false}
                        />
                      </View> */}
                    </View>
                  </View>
                  <Divider />
                  {/* </Card.Content> */}
                </Card>
              );
            })}
          {loading && (
            <>
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            </>
          )}
        </ScrollView>
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

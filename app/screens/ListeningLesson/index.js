/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Text, Card, Divider, Badge } from 'react-native-paper';
import { Header } from '../../components/commonHeader';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  AppState,
  TouchableOpacity,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import HTML from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import { AudioPlayer } from '../../components/audio-player';
const Sound = require('react-native-sound');
export const ListeningLesson = ({ navigation }) => {
  const selectedListeningLesson = useSelector(
    state => state.programReducer.selectedListeningLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [board, setBoard] = useState(selectedListeningLesson.board);
  const [script, setScript] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [displaySubtitle, setDisplaySubtitle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizes, setQuizes] = useState(selectedListeningLesson.board.quiz);
  const [value, setValue] = useState({});
  const [disabled, setDisabled] = useState({});
  const [answer, setAnswer] = useState({});
  const [count, setCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [displayScript, setDisplayScript] = useState(false);
  const falseColor = '#f00';
  const trueColor = '#5cdb5e';
  const normalColor = '#000';
  const answerOptionLabel = {
    fontSize: 18,
    backgroundColor: '#dbd4c8',
    borderWidth: 1,
    color: '#000000',
    height: 30,
    width: 30,
    borderRadius: 15,
    textAlign: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  };
  const answerOptionContainer = {
    flexDirection: 'row',
    height: 65,
    marginLeft: 5,
    marginRight: 5,
  };
  const answerOptionStyle = {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    alignItems: 'center',
  };
  const onAnswerOptionSelected = (val, index, correctAnswer) => {
    let copy = { ...value };
    copy['' + index] = val;
    setValue(copy);
    let clone = { ...disabled };
    clone['' + index] = true;
    setDisabled(clone);
    let dup = { ...answer };
    dup['' + index] = correctAnswer;
    setAnswer(dup);
    if (val === correctAnswer) {
      setCount(count + 1);
    }
    setAnswered(answered + 1);
  };
  useEffect(() => {
    async function getBoard() {
      const headers = await authHeader();
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      let url = `${apiConfig.baseUrl}${
        apiConfig.apiEndpoint
      }/listening-boards/${selectedListeningLesson.board.id}`;
      try {
        setLoading(true);
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (data.code) {
          setLoading(false);
          ToastAndroid.showWithGravityAndOffset(
            data.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            100,
          );
        } else {
          //   console.log(htmlEntityDecode(data.quiz[0].question));
          let scr = htmlEntityDecode(data.script);
          scr = scr.replace(/style="background: white;"/g, '');
          scr = scr.replace(/style="background: white"/g, '');
          scr = scr.replace(/style="background:white"/g, '');
          setScript(scr);
          let sub = htmlEntityDecode(data.subtitle);
          sub = sub.replace(/style="background: white;"/g, '');
          sub = sub.replace(/style="background: white"/g, '');
          sub = sub.replace(/style="background:white"/g, '');
          setSubtitle(sub);
          setQuizes(data.quiz);
          setLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    getBoard();
    const title = `Luyện nghe ${selectedLevel}`;
    const headerSubtitle = `${selectedListeningLesson.board.title}`;
    navigation.setOptions({ headerProps: { title, subtitle: headerSubtitle } });
  }, [navigation, selectedLevel, selectedListeningLesson]);
  useEffect(() => {
    if (displayScript) {
      const whoosh = new Sound(
        selectedListeningLesson.board.audioSrc,
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            //   console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          // console.log(
          //   'duration in seconds: ' +
          //     whoosh.getDuration() +
          //     'number of channels: ' +
          //     whoosh.getNumberOfChannels(),
          // );

          // Play the sound with an onEnd callback
          if (global.sound) {
            global.sound.stop();
          }
          global.sound = whoosh;
          whoosh.play(success => {
            if (success) {
              // console.log('successfully finished playing');
            } else {
              // console.log('playback failed due to audio decoding errors');
            }
          });
        },
      );
      const handleAppStateChange = currentAppState => {
        if (
          currentAppState === 'background' ||
          currentAppState === 'inactive'
        ) {
          if (whoosh && whoosh.isPlaying()) {
            whoosh.pause();
          }
        }
      };
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        if (!_.isEmpty(selectedListeningLesson.board.audioSrc)) {
          if (whoosh && whoosh.isPlaying()) {
            whoosh.pause();
          }
        }
      };
    }
  }, [displayScript, selectedListeningLesson.board.audioSrc]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* {selectedListeningLesson.board.title !== undefined && selectedLevel && (
          <Header
            title={`Luyện nghe ${selectedLevel}`}
            subtitle={`${selectedListeningLesson.board.title}`}
          />
        )}
        {!selectedLevel ||
          (!selectedListeningLesson.board.title && (
            <Header title={'Luyện nghe'} />
          ))} */}
        {loading && (
          <>
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          </>
        )}
        {!loading && (
          <>
            <ScrollView style={{ flex: 1, backgroundColor: '#dbd4c8' }}>
              {!displayScript && (
                <>
                  <View
                    style={{
                      margin: 5,
                      padding: 5,
                      borderRadius: 5,
                      borderColor: '#964B00',
                      borderWidth: 0.5,
                    }}>
                    <AudioPlayer src={selectedListeningLesson.board.audioSrc} />
                  </View>
                  {quizes.length &&
                    quizes.map((quiz, index) => {
                      let quizA = quiz.A;
                      let quizB = quiz.B;
                      let quizC = quiz.C;
                      let quizD = quiz.D;
                      quizA = htmlEntityDecode(quizA);
                      quizB = htmlEntityDecode(quizB);
                      quizC = htmlEntityDecode(quizC);
                      quizD = htmlEntityDecode(quizD);
                      quizA = quizA.replace(/style="background: white;"/g, '');
                      quizA = quizA.replace(/style="background: white"/g, '');
                      quizA = quizA.replace(/style="background:white"/g, '');

                      quizB = quizB.replace(/style="background: white;"/g, '');
                      quizB = quizB.replace(/style="background: white"/g, '');
                      quizB = quizB.replace(/style="background:white"/g, '');

                      quizC = quizC.replace(/style="background: white;"/g, '');
                      quizC = quizC.replace(/style="background: white"/g, '');
                      quizC = quizC.replace(/style="background:white"/g, '');

                      quizD = quizD.replace(/style="background: white;"/g, '');
                      quizD = quizD.replace(/style="background: white"/g, '');
                      quizD = quizD.replace(/style="background:white"/g, '');
                      return (
                        <>
                          <View
                            style={{
                              margin: 5,
                              padding: 5,
                              borderRadius: 5,
                              borderColor: '#964B00',
                              borderWidth: 0.5,
                              height: 300,
                            }}>
                            <WebView
                              source={{
                                html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                                  quiz.question,
                                )}</div>`,
                              }}
                              style={{ backgroundColor: '#dbd4c8' }}
                              injectedJavaScript={
                                "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                              }
                              scalesPageToFit={false}
                            />
                          </View>
                          <View
                            style={{
                              paddingTop: 0,
                              flex: 5,
                              flexDirection: 'column',
                            }}>
                            <View style={answerOptionContainer}>
                              <View style={answerOptionStyle}>
                                <Text
                                  style={[
                                    answerOptionLabel,
                                    {
                                      color: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'A'
                                        ? trueColor
                                        : value['' + index] === 'A'
                                        ? falseColor
                                        : normalColor,
                                      borderColor: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'A'
                                        ? trueColor
                                        : value['' + index] === 'A'
                                        ? falseColor
                                        : normalColor,
                                    },
                                  ]}
                                  onPress={() =>
                                    onAnswerOptionSelected(
                                      'A',
                                      index,
                                      quiz.answer,
                                    )
                                  }
                                  disabled={
                                    disabled['' + index]
                                      ? disabled[index + '']
                                      : false
                                  }>
                                  A
                                </Text>
                                <WebView
                                  source={{
                                    html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;color: ${
                                      !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'A'
                                        ? trueColor
                                        : value['' + index] === 'A'
                                        ? falseColor
                                        : normalColor
                                    };">${quizA}</div>`,
                                  }}
                                  style={{ backgroundColor: '#dbd4c8' }}
                                  injectedJavaScript={
                                    "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                                  }
                                  scalesPageToFit={false}
                                />
                              </View>
                              <View style={answerOptionStyle}>
                                <Text
                                  style={[
                                    answerOptionLabel,
                                    {
                                      color: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'B'
                                        ? trueColor
                                        : value['' + index] === 'B'
                                        ? falseColor
                                        : normalColor,
                                      borderColor: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'B'
                                        ? trueColor
                                        : value['' + index] === 'B'
                                        ? falseColor
                                        : normalColor,
                                    },
                                  ]}
                                  onPress={() =>
                                    onAnswerOptionSelected(
                                      'B',
                                      index,
                                      quiz.answer,
                                    )
                                  }
                                  disabled={
                                    disabled['' + index]
                                      ? disabled[index + '']
                                      : false
                                  }>
                                  B
                                </Text>
                                <WebView
                                  source={{
                                    html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;color: ${
                                      !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'B'
                                        ? trueColor
                                        : value['' + index] === 'B'
                                        ? falseColor
                                        : normalColor
                                    };">${quizB}</div>`,
                                  }}
                                  style={{ backgroundColor: '#dbd4c8' }}
                                  injectedJavaScript={
                                    "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                                  }
                                  scalesPageToFit={false}
                                />
                              </View>
                            </View>
                            <View style={answerOptionContainer}>
                              <View style={answerOptionStyle}>
                                <Text
                                  style={[
                                    answerOptionLabel,
                                    {
                                      color: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'C'
                                        ? trueColor
                                        : value['' + index] === 'C'
                                        ? falseColor
                                        : normalColor,
                                      borderColor: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'C'
                                        ? trueColor
                                        : value['' + index] === 'C'
                                        ? falseColor
                                        : normalColor,
                                    },
                                  ]}
                                  onPress={() =>
                                    onAnswerOptionSelected(
                                      'C',
                                      index,
                                      quiz.answer,
                                    )
                                  }
                                  disabled={
                                    disabled['' + index]
                                      ? disabled[index + '']
                                      : false
                                  }>
                                  C
                                </Text>
                                <WebView
                                  source={{
                                    html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;color: ${
                                      !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'C'
                                        ? trueColor
                                        : value['' + index] === 'C'
                                        ? falseColor
                                        : normalColor
                                    };">${quizC}</div>`,
                                  }}
                                  style={{ backgroundColor: '#dbd4c8' }}
                                  injectedJavaScript={
                                    "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                                  }
                                  scalesPageToFit={false}
                                />
                              </View>
                              <View style={answerOptionStyle}>
                                <Text
                                  style={[
                                    answerOptionLabel,
                                    {
                                      color: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'D'
                                        ? trueColor
                                        : value['' + index] === 'D'
                                        ? falseColor
                                        : normalColor,
                                      borderColor: !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'D'
                                        ? trueColor
                                        : value['' + index] === 'D'
                                        ? falseColor
                                        : normalColor,
                                    },
                                  ]}
                                  onPress={() =>
                                    onAnswerOptionSelected(
                                      'D',
                                      index,
                                      quiz.answer,
                                    )
                                  }
                                  disabled={
                                    disabled['' + index]
                                      ? disabled[index + '']
                                      : false
                                  }>
                                  D
                                </Text>
                                <WebView
                                  source={{
                                    html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;color: ${
                                      !value['' + index]
                                        ? normalColor
                                        : quiz.answer === 'D'
                                        ? trueColor
                                        : value['' + index] === 'D'
                                        ? falseColor
                                        : normalColor
                                    };">${quizD}</div>`,
                                  }}
                                  style={{ backgroundColor: '#dbd4c8' }}
                                  injectedJavaScript={
                                    "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                                  }
                                  scalesPageToFit={false}
                                />
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 120,
                              paddingVertical: 5,
                            }}>
                            <Button
                              mode="contained"
                              onPress={() => setDisplayScript(true)}
                              style={{
                                backgroundColor: '#5cdb5e',
                                borderRadius: 5,
                              }}>
                              Lời giải
                            </Button>
                          </View>
                        </>
                      );
                    })}
                </>
              )}
              {displayScript && (
                <>
                  <View
                    style={{
                      margin: 5,
                      padding: 5,
                      borderRadius: 5,
                      borderColor: '#964B00',
                      borderWidth: 0.5,
                      height: 500,
                    }}>
                    {!displaySubtitle && (
                      <WebView
                        source={{
                          html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                            script,
                          )}</div>`,
                        }}
                        style={{ backgroundColor: '#dbd4c8' }}
                        injectedJavaScript={
                          "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                        }
                        scalesPageToFit={false}
                      />
                    )}
                    {displaySubtitle && (
                      <WebView
                        source={{
                          html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                            subtitle,
                          )}</div>`,
                        }}
                        style={{ backgroundColor: '#dbd4c8' }}
                        injectedJavaScript={
                          "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
                        }
                        scalesPageToFit={false}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      textAlign: 'center',
                      paddingHorizontal: 120,
                      paddingVertical: 5,
                    }}>
                    <Button
                      mode="contained"
                      onPress={() => setDisplaySubtitle(!displaySubtitle)}
                      style={{
                        backgroundColor: '#5cdb5e',
                        borderRadius: 5,
                      }}>
                      {!displaySubtitle && 'Xem lời dịch'}
                      {displaySubtitle && 'Xem văn bản gốc'}
                    </Button>
                  </View>
                </>
              )}
            </ScrollView>
          </>
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

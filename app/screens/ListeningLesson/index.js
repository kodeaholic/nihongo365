/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
import { Button, Text, Card, Divider, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, AppState } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import { AudioPlayer } from '../../components/audio-player';
import firestore from '@react-native-firebase/firestore';
import { STATUS } from '../../constants/payment.constants';
import { RegisterPopup } from '../../components/registerPopup';
const Sound = require('react-native-sound');
const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const floorW = Math.floor(windowWidth);
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
  /* popup */
  const [popupVisible, setPopupVisible] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const [service, setService] = useState(selectedLevel); // fetch from fire-store
  useEffect(() => {
    if (selectedLevel !== 'N5') {
      async function getDoc() {
        let docRef;
        if (user && user.id) {
          try {
            docRef = firestore()
              .collection('services')
              .doc(user.id)
              .collection('SERVICES')
              .doc(selectedLevel);
            let doc = await docRef.get();
            doc = doc.data();
            if (_.isEmpty(doc) || doc.status !== STATUS.SUCCESS.value) {
              setPopupVisible(true);
              setService(selectedLevel);
            } else {
              setPopupVisible(false);
              setService('');
            }
          } catch (e) {
            setPopupVisible(true);
            setService(selectedLevel);
          }
        }
      }
      getDoc();
    }
  }, [user, selectedLevel]);
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
    flex: 1,
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
          // console.log(scr);
          setScript(scr);
          let sub = htmlEntityDecode(data.subtitle);
          sub = sub.replace(/style="background: white;"/g, '');
          sub = sub.replace(/style="background: white"/g, '');
          sub = sub.replace(/style="background:white"/g, '');
          // console.log(sub);
          setSubtitle(sub);
          setQuizes(data.quiz);
          setLoading(false);
        }
      } catch (error) {
        return error;
      }
    }
    getBoard();
    const title = `Luy???n nghe ${selectedLevel}`;
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
  let myInjectedJs = `(function(){let e=document.querySelectorAll("img");for(let t=0;t<e.length;t++)e[t]&&e[t].setAttribute("style", "width:${floorW}px;height:auto;margin-top:15px;margin-bottom:15px;")})()`;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {!_.isEmpty(service) && popupVisible && (
          <RegisterPopup
            service={service}
            visible={popupVisible}
            setVisible={setPopupVisible}
          />
        )}
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
                        <View key={'quiz-' + index}>
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
                              // injectJavaScript={myInjectedJs}
                              // injectedJavaScript={myInjectedJs}
                              style={{ flex: 1, backgroundColor: '#dbd4c8' }}
                              source={{
                                html: quiz.question
                                  ? `<html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"><style>body{padding:0;margin:0}*{max-width:calc(100vw - 10px);outline:none;word-break:break-word}*{scroll-behavior:smooth;font-family:'Source Sans Pro',serif}*{scroll-behavior:smooth}main{font-family:'Source Sans Pro',serif;padding:10px 0 80px 0;width:calc(100vw);height:calc(100vh);display:flex;flex-direction:column;font-weight:normal;overflow-y:scroll;margin:0}.content{font-family:'Source Sans Pro',serif;font-weight:bold;line-height:220%;word-break:break-word}img{max-width:${windowWidth -
                                      10}px;margin:5px;height:auto}</style></head><body cz-shortcut-listen="true" style="background-color: #dbd4c8;"> <main><div class="content">${htmlEntityDecode(
                                      quiz.question,
                                    )}</div> </main></body></html>`
                                  : '',
                              }}
                              javaScriptEnabled={true}
                              domStorageEnabled={true}
                              onLoadStart={() => {}}
                              // onLoad={() => setLoading(false)}
                            />
                            {/* <WebView
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
                            /> */}
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
                            </View>
                            <View style={answerOptionContainer}>
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
                            </View>
                            <View style={answerOptionContainer}>
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
                              L???i gi???i
                            </Button>
                          </View>
                        </View>
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
                      <>
                        <WebView
                          injectJavaScript={myInjectedJs}
                          injectedJavaScript={myInjectedJs}
                          style={{ flex: 1, backgroundColor: '#dbd4c8' }}
                          source={{
                            html: script
                              ? `<html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"><style>body{padding:0;margin:0}*{max-width:calc(100vw - 10px);outline:none;word-break:break-word}*{scroll-behavior:smooth;font-family:'Source Sans Pro',serif}*{scroll-behavior:smooth}main{font-family:'Source Sans Pro',serif;padding:10px 0 80px 0;width:calc(100vw);height:calc(100vh);display:flex;flex-direction:column;font-weight:normal;overflow-y:scroll;margin:0}.content{font-family:'Source Sans Pro',serif;font-weight:bold;line-height:220%;word-break:break-word}img{max-width:${windowWidth -
                                  10}px;margin:5px;height:auto}</style></head><body cz-shortcut-listen="true" style="background-color: #dbd4c8;"> <main><div class="content">${script}</div> </main></body></html>`
                              : '',
                          }}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          onLoadStart={() => {}}
                          // onLoad={() => setLoading(false)}
                        />
                        {/* <WebView
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
                        /> */}
                      </>
                    )}
                    {displaySubtitle && (
                      <>
                        {/* <WebView
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
                        /> */}
                        <WebView
                          injectJavaScript={myInjectedJs}
                          injectedJavaScript={myInjectedJs}
                          style={{ flex: 1 }}
                          source={{
                            html: subtitle
                              ? `<html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"><style>body{padding:0;margin:0}*{max-width:calc(100vw - 10px);outline:none;word-break:break-word}*{scroll-behavior:smooth;font-family:'Source Sans Pro',serif}*{scroll-behavior:smooth}main{font-family:'Source Sans Pro',serif;padding:10px 0 80px 0;width:calc(100vw);height:calc(100vh);display:flex;flex-direction:column;font-weight:normal;overflow-y:scroll;margin:0}.content{font-family:'Source Sans Pro',serif;font-weight:bold;line-height:220%;word-break:break-word}img{max-width:${windowWidth -
                                  10}px;margin:5px;height:auto}</style></head><body cz-shortcut-listen="true" style="background-color: #dbd4c8;"> <main><div class="content">${subtitle}</div> </main></body></html>`
                              : '',
                          }}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          onLoadStart={() => {}}
                          // onLoad={() => setLoading(false)}
                        />
                      </>
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
                      {!displaySubtitle && 'Xem l???i d???ch'}
                      {displaySubtitle && 'Xem v??n b???n g???c'}
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

/* eslint-disable react-native/no-inline-styles */
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, Card, Divider, Badge, RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import _ from 'lodash';
import { WebView } from 'react-native-webview';
import { BOARD_TYPE } from '../../constants/board';
import ScrollingButtonMenu from 'react-native-scroll-menu';
import firestore from '@react-native-firebase/firestore';
import { PROGRAM_IDS, PROGRAM_TYPES } from '../Programs/data';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { AD_UNIT_IDS, INTERSTITIAL_KEYWORDS } from '../../constants/ads';
const interstitial = InterstitialAd.createForAdRequest(
  AD_UNIT_IDS.INTERSTITIAL,
  {
    requestNonPersonalizedAdsOnly: false,
    keywords: INTERSTITIAL_KEYWORDS,
  },
);
export const ChuHanLesson = ({ navigation }) => {
  const selectedChuHanLesson = useSelector(
    state => state.programReducer.selectedChuHanLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [loading, setLoading] = useState(true);
  const [quizes] = useState(_.get(selectedChuHanLesson, 'board.quiz'));
  const [value, setValue] = useState({});
  const [disabled, setDisabled] = useState({});
  const [answer, setAnswer] = useState({});
  const [count, setCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [selectedCard, setSelectedCard] = useState(
    _.get(selectedChuHanLesson, 'board.cards')[0] || {},
  );
  const trueColor = '#5cdb5e';
  const falseColor = '#f00';
  const menus = _.get(selectedChuHanLesson, 'board.cards').map(
    (item, index) => {
      return { ...item, name: item.letter, index: index };
    },
  );
  const user = useSelector(state => state.userReducer.user);
  const [completed, setCompleted] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  useEffect(() => {
    // check if this is a completed item
    let unsubscribe;
    if (user && user.id) {
      unsubscribe = firestore()
        .collection('USERS')
        .doc(user.id)
        .collection('COMPLETED_ITEMS')
        .onSnapshot(querySnapshot => {
          const items = querySnapshot.docs
            .filter(documentSnapshot => {
              return documentSnapshot.id === selectedChuHanLesson.board.id;
            })
            .map(filteredSnapshot => {
              const item = {
                id: filteredSnapshot.id,
                ...filteredSnapshot.data(),
              };
              return item;
            });
          if (!_.isEmpty(items)) {
            setCompleted(true);
          } else {
            setCompleted(false);
          }
        });
    }

    setLoading(false);

    /* Update header title */
    const title = `Học chữ Hán ${selectedLevel}`;
    let subtitle = _.get(selectedChuHanLesson, 'board.title');
    subtitle +=
      selectedChuHanLesson.type === BOARD_TYPE.THEORY
        ? ' - Lý thuyết'
        : ' - Bài tập củng cố';
    let item = { ...selectedChuHanLesson.board };
    delete item.cards;
    delete item.quiz;
    delete item.createdAt;
    delete item.updatedAt;
    delete item.description;
    delete item.free;
    navigation.setOptions({
      headerProps: {
        title,
        subtitle,
        rightAction: {
          lessonCheck:
            selectedChuHanLesson.type === BOARD_TYPE.EXERCISE ||
            _.isEmpty(selectedChuHanLesson.board.quiz)
              ? {
                  program: PROGRAM_TYPES[PROGRAM_IDS.CHUHAN],
                  item: item,
                  level: selectedLevel,
                  completed: completed,
                }
              : {},
        },
      },
    });

    // ads
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setAdLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    return () => {
      unsubscribe && unsubscribe();
      eventListener();
    };
  }, [navigation, selectedChuHanLesson, selectedLevel, user, completed]);

  useEffect(() => {
    if (adLoaded !== false && interstitial.loaded) {
      interstitial.show();
    }
  }, [adLoaded]);

  const renderQuizItem = ({ item, index }) => {
    const quiz = item;
    const screenWidth = Dimensions.get('window').width;
    return (
      <Card style={styles.card} key={quiz.id}>
        <Divider />
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              // alignContent: 'center',
              justifyContent: 'flex-start',
              height: 'auto',
              paddingLeft: 5,
            }}>
            <Badge
              style={{
                backgroundColor: '#fff',
                color: '#000',
                borderWidth: 0.5,
                marginRight: 5,
                marginBottom: 5,
              }}>
              {index + 1}
            </Badge>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'SF-Pro-Detail-Regular',
                color: '#000',
              }}>
              {quiz.question}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 0,
              marginLeft: 0,
              flexDirection: 'column',
            }}>
            <RadioButton.Group
              style={{ marginTop: 0 }}
              onValueChange={val => {
                let copy = { ...value };
                copy['' + index] = val;
                setValue(copy);
                let clone = { ...disabled };
                clone['' + index] = true;
                setDisabled(clone);
                let dup = { ...answer };
                dup['' + index] = quiz.answer;
                setAnswer(dup);
                if (val === quiz.answer) {
                  setCount(count + 1);
                }
                setAnswered(answered + 1);
              }}
              value={value['' + index]}>
              <View
                style={{ flexDirection: 'row', paddingTop: 0, marginLeft: 0 }}>
                <View style={{ flex: 1, paddingTop: 0, marginLeft: 0 }}>
                  <RadioButton.Item
                    label={`A. ${quiz.A}`}
                    value="A"
                    disabled={disabled['' + index]}
                    style={{
                      wordWrap: 'break-word',
                      maxWidth: screenWidth / 2.6,
                    }}
                    labelStyle={
                      _.isEmpty(value['' + index])
                        ? { fontFamily: 'SF-Pro-Detail-Regular', color: '#000' }
                        : quiz.answer === 'A'
                        ? {
                            color: trueColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                        : {
                            color: falseColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                    }
                  />
                </View>
                <View style={{ flex: 1, paddingTop: 0, marginLeft: 0 }}>
                  <RadioButton.Item
                    label={`B. ${quiz.B}`}
                    value="B"
                    disabled={disabled['' + index]}
                    style={{
                      wordWrap: 'break-word',
                      maxWidth: screenWidth / 2.6,
                    }}
                    labelStyle={
                      _.isEmpty(value['' + index])
                        ? { fontFamily: 'SF-Pro-Detail-Regular', color: '#000' }
                        : quiz.answer === 'B'
                        ? {
                            color: trueColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                        : {
                            color: falseColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                    }
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: 'row', paddingTop: 0, marginLeft: 0 }}>
                <View style={{ flex: 1, paddingTop: 0, marginLeft: 0 }}>
                  <RadioButton.Item
                    label={`C. ${quiz.C}`}
                    value="C"
                    disabled={disabled['' + index]}
                    style={{
                      wordWrap: 'break-word',
                      maxWidth: screenWidth / 2.6,
                    }}
                    labelStyle={
                      _.isEmpty(value['' + index])
                        ? { fontFamily: 'SF-Pro-Detail-Regular', color: '#000' }
                        : quiz.answer === 'C'
                        ? {
                            color: trueColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                        : {
                            color: falseColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                    }
                    color={
                      _.isEmpty(value['' + index])
                        ? ''
                        : quiz.answer === 'C'
                        ? trueColor
                        : falseColor
                    }
                  />
                </View>
                <View style={{ flex: 1, paddingTop: 0, marginLeft: 0 }}>
                  <RadioButton.Item
                    label={`D. ${quiz.D}`}
                    value="D"
                    disabled={disabled['' + index]}
                    style={{
                      wordWrap: 'break-word',
                      maxWidth: screenWidth / 2.6,
                    }}
                    labelStyle={
                      _.isEmpty(value['' + index])
                        ? { fontFamily: 'SF-Pro-Detail-Regular', color: '#000' }
                        : quiz.answer === 'D'
                        ? {
                            color: trueColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                        : {
                            color: falseColor,
                            fontFamily: 'SF-Pro-Detail-Regular',
                          }
                    }
                  />
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <Divider />
      </Card>
    );
  };
  const ChuHanWebView = ({ card }) => {
    const [originalSrc] = useState(card.svgSrc);
    const [src, setSrc] = useState(card.svgSrc);
    const [clickable, setClickable] = useState(true);
    useEffect(() => {
      if (_.isEmpty(src)) {
        setClickable(false);
      } else {
        setClickable(true);
      }
    }, [src]);
    return (
      <>
        <View
          style={{
            flex: 5,
            marginRight: 5,
            marginLeft: 5,
            textAlign: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            height: 30,
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontFamily: 'SF-Pro-Detail-Regular',
              color: '#000',
            }}>
            {card.meaning}
          </Text>
        </View>
        <View
          style={{
            minHeight: 200,
            height: 200,
          }}>
          {!_.isEmpty(src) && (
            <WebView
              // injectJavaScript={myInjectedJs}
              // injectedJavaScript={myInjectedJs}
              style={{
                minHeight: 200,
                height: 'auto',
              }}
              source={{
                uri: src,
              }}
            />
          )}
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSrc(currentSrc => {
                setTimeout(() => {
                  setSrc(originalSrc);
                }, 500);
                return '';
              });
            }}
            disabled={!clickable}
            style={{
              borderWidth: 0.5,
              height: 35,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'SF-Pro-Detail-Regular',
                color: '#000',
                backgroundColor: '#fff',
              }}>
              Viết lại
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  if (selectedChuHanLesson.type === BOARD_TYPE.THEORY) {
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          {loading && (
            <>
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            </>
          )}
          {!loading && (
            <>
              <View
                style={{
                  marginBottom: 0,
                  paddingTop: 10,
                  paddingBottom: 15,
                  paddingLeft: 0,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginRight: 10,
                }}>
                <ScrollingButtonMenu
                  items={menus}
                  onPress={e => {
                    setSelectedCard(e);
                  }}
                  selectedOpacity={0.7}
                  selected={selectedCard.id}
                  activeBackgroundColor="#5cdb5e"
                  activeColor="#fff"
                />
              </View>

              <ScrollView
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                }}>
                {!_.isEmpty(selectedCard) && (
                  <>
                    <ChuHanWebView card={selectedCard} />
                    <WebView
                      style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        paddingBottom: 10,
                        minHeight: windowHeight,
                        maxHeight: windowHeight,
                        marginBottom: 15,
                      }}
                      source={{
                        html: `<html lang="en" style="scroll-behavior: smooth;"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"><style>body{padding:0;margin:0}*{max-width:calc(100vw - 10px);outline:none;word-break:break-word}*{scroll-behavior:smooth;font-family:'Source Sans Pro',serif}*{scroll-behavior:smooth}main{font-family:'Source Sans Pro',serif;padding:10px 0 80px 0;width:calc(100vw);height:calc(100vh);display:flex;flex-direction:column;font-weight:normal;overflow-y:scroll;margin:0}.content{font-family:'Source Sans Pro',serif;font-weight:bold;line-height:220%;word-break:break-word}img{max-width:${windowWidth -
                          10}px;margin:5px;height:auto}*{font-weight:normal;}</style></head><body cz-shortcut-listen="true" style="background-color: #fff;"> <main><div class="content">
                            <div style="display: flex; flex-direction: row; width: ${windowWidth -
                              10}px; margin-left: 5px;">
              <div style="width: ${(windowWidth - 10) /
                3}px; margin: 5px;text-align: center;">
                <span style="background-color: rgba(219, 10, 91, 1); color: #fff; border-radius: 5px;padding: 5px;">Mẹo nhớ</span>
              </div>
              <div style="width: ${((windowWidth - 10) * 2) /
                3}px;margin: 5px;text-align: center;">
                <span style="background-color: rgba(219, 10, 91, 1); color: #fff; border-radius: 5px;padding: 5px;">${selectedCard.note ||
                  ''}</span>
              </div>
            </div>
            <hr style="border: 0.5px solid #000;margin-left: 10px; margin-right: 10px; background: linear-gradient(
              130deg
              ,#ff7a18,#af002d 41.07%,#319197 76.05%); height: 2px;border-radius: 5px;"/>
                            <div style="display: flex; flex-direction: row; width: ${windowWidth -
                              10}px; margin-left: 5px;">
              <div style="width: ${(windowWidth - 10) /
                3}px; margin: 5px;text-align: center;">
                <span style="background-color: rgba(0, 181, 204, 1); color: #fff; border-radius: 5px;padding: 5px;">On</span>
              </div>
              <div style="width: ${((windowWidth - 10) * 2) /
                3}px;margin: 5px;text-align: center;">
                <span style="background-color: rgba(0, 181, 204, 1); color: #fff; border-radius: 5px;padding: 5px;">${
                  selectedCard.onText
                }</span>
              ${htmlEntityDecode(selectedCard.onTextExample)}
              </div>
            </div>
            <hr style="border: 0.5px solid #000;margin-left: 10px; margin-right: 10px; background: linear-gradient(
              130deg
              ,#ff7a18,#af002d 41.07%,#319197 76.05%); height: 2px;border-radius: 5px;"/>
            <div style="display: flex; flex-direction: row; width: ${windowWidth -
              10}px; margin-left: 5px;">
              <div style="width: ${(windowWidth - 10) /
                3}px; margin: 5px;text-align: center;">
                <span style="background-color: rgba(63, 195, 128, 1); color: #fff; border-radius: 5px;padding: 5px;">Kun</span>
              </div>
              <div style="width: ${((windowWidth - 10) * 2) /
                3}px;margin: 5px;text-align: center;">
                <span style="background-color: rgba(63, 195, 128, 1); color: #fff; border-radius: 5px;padding: 5px;">${
                  selectedCard.kunText
                }</span>
              ${htmlEntityDecode(selectedCard.kunTextExample)}
              </div>
            </div>
        </div><br/> </main></body></html>`,
                      }}
                    />
                  </>
                )}
              </ScrollView>
            </>
          )}
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          {loading && (
            <>
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            </>
          )}
          {!loading && (
            <>
              <Text
                style={{
                  fontSize: 22,
                  textAlign: 'center',
                  fontFamily: 'SF-Pro-Detail-Regular',
                  //borderBottomWidth: 0.5,
                  backgroundColor: '#fff',
                  color: '#000',
                }}>
                Bài tập củng cố
              </Text>
              <FlatList
                data={quizes}
                renderItem={renderQuizItem}
                keyExtractor={(item, index) => {
                  return index;
                }}
              />
              <Text
                style={{
                  height: 40,
                  marginTop: 8,
                  fontSize: 18,
                  textAlign: 'center',
                  fontFamily: 'SF-Pro-Detail-Regular',
                }}>
                Đã trả lời {`${answered}/${quizes.length}`} câu. Đúng{' '}
                {`${count}/${quizes.length}`} câu
              </Text>
            </>
          )}
        </SafeAreaView>
      </>
    );
  }
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
  },
  childView: {
    flex: 1,
  },
  card: {
    margin: 0,
    backgroundColor: '#fff',
    flex: 1,
  },
});

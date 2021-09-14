/* eslint-disable react-native/no-inline-styles */
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, Card, Divider, Badge, RadioButton } from 'react-native-paper';
import { Header } from '../../components/commonHeader';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import _ from 'lodash';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { BOARD_TYPE } from '../../constants/board';
import * as programActions from '../../actions/programActions';
import ScrollingButtonMenu from 'react-native-scroll-menu';
import GestureRecognizer from 'react-native-swipe-gestures';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ChuHanLesson = ({ navigation }) => {
  const selectedChuHanLesson = useSelector(
    state => state.programReducer.selectedChuHanLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [board] = useState(selectedChuHanLesson.board);
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
  const [cards] = useState(_.get(selectedChuHanLesson, 'board.cards'));
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const moveCard = (step = 0) => {
    let index = selectedCardIndex + step;
    if (index < 0) {
      index = cards.length - 1;
    } // move from first to last
    if (index >= cards.length) {
      index = 0;
    } // move from last to first
    setSelectedCardIndex(index);
    setSelectedCard(cards[index]);
  };
  const trueColor = '#5cdb5e';
  const falseColor = '#f00';
  const menus = _.get(selectedChuHanLesson, 'board.cards').map(
    (item, index) => {
      return { ...item, name: item.letter, index: index };
    },
  );
  useEffect(() => {
    if (!_.isEmpty(selectedChuHanLesson)) {
      setLoading(false);

      /* Update header title */
      const title = `Học chữ Hán ${selectedLevel}`;
      let subtitle = _.get(selectedChuHanLesson, 'board.title');
      subtitle +=
        selectedChuHanLesson.type === BOARD_TYPE.THEORY
          ? ' - Lý thuyết'
          : ' - Bài tập củng cố';
      navigation.setOptions({ headerProps: { title, subtitle } });
    }
  }, [navigation, selectedChuHanLesson, selectedLevel]);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // component will unmount
  //   return () => {
  //     console.log('cleaned up');
  //     dispatch(
  //       programActions.chuHanLessonSelected({
  //         selectedChuHanLesson: {},
  //       }),
  //     );
  //   };
  // }, [dispatch]);
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
              {/* {value['' + index] && (
                <Text
                  style={{
                    color:
                      value['' + index] === quiz.answer
                        ? trueColor
                        : falseColor,
                    textAlign: 'left',
                    fontSize: 16,
                    marginLeft: 17,
                  }}>{`${value['' + index] === quiz.answer ? 'Ｏ' : 'Ｘ'}. ${
                  quiz.answer
                }`}</Text>
              )} */}
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
        <SafeAreaView style={{ flex: 1 }}>
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
                  paddingRight: 2,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <ScrollingButtonMenu
                  items={menus}
                  onPress={e => {
                    setSelectedCard(e);
                    let index = _.findIndex(
                      cards,
                      card => {
                        return card.id === e.id;
                      },
                      0,
                    );
                    setSelectedCardIndex(index);
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
                  paddingBottom: 10,
                  borderBottomWidth: 0.5,
                }}>
                {!_.isEmpty(selectedCard) && (
                  <>
                    {/* <GestureRecognizer
                      onSwipeUp={() => {
                        moveCard(+1);
                      }}
                      onSwipeDown={() => {
                        moveCard(-1);
                      }}
                      onSwipeLeft={() => {
                        moveCard(+1);
                      }}
                      onSwipeRight={() => {
                        moveCard(-1);
                      }}>
                      <Card style={styles.card} key={selectedCard.id} />
                    </GestureRecognizer> */}
                    <ChuHanWebView card={selectedCard} />
                    <WebView
                      style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        paddingBottom: 10,
                        minHeight: windowHeight - 200 - 30,
                        maxHeight: windowHeight,
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

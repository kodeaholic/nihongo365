/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Text,
  Card,
  Divider,
  Badge,
  RadioButton,
  IconButton,
} from 'react-native-paper';
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
} from 'react-native';
import { htmlEntityDecode } from '../../helpers/htmlentities';
import HTML from 'react-native-render-html';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@summerkiflain/react-native-scrollable-tabview';
import { BOARD_TYPE } from '../../constants/board';
import * as programActions from '../../actions/programActions';
export const ChuHanLesson = ({ navigation }) => {
  const selectedChuHanLesson = useSelector(
    state => state.programReducer.selectedChuHanLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [board] = useState(selectedChuHanLesson.board);
  const [loading, setLoading] = useState(true);
  const [cards] = useState(_.get(selectedChuHanLesson, 'board.cards'));
  const [quizes] = useState(_.get(selectedChuHanLesson, 'board.quiz'));
  const [value, setValue] = useState({});
  const [disabled, setDisabled] = useState({});
  const [answer, setAnswer] = useState({});
  const [count, setCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const trueColor = '#5cdb5e';
  const falseColor = '#f00';
  useEffect(() => {
    if (!_.isEmpty(selectedChuHanLesson)) {
      setLoading(false);
    }
  }, [selectedChuHanLesson]);
  const dispatch = useDispatch();
  useEffect(() => {
    // component will unmount
    return () => {
      console.log('cleaned up');
      dispatch(
        programActions.chuHanLessonSelected({
          selectedChuHanLesson: {},
        }),
      );
    };
  }, [dispatch]);
  const renderQuizItem = ({ item, index }) => {
    const quiz = item;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
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
            <Text style={{ fontSize: 16 }}>{quiz.question}</Text>
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
                        ? {}
                        : quiz.answer === 'A'
                        ? { color: trueColor }
                        : { color: falseColor }
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
                        ? {}
                        : quiz.answer === 'B'
                        ? { color: trueColor }
                        : { color: falseColor }
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
                        ? {}
                        : quiz.answer === 'C'
                        ? { color: trueColor }
                        : { color: falseColor }
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
                        ? {}
                        : quiz.answer === 'D'
                        ? { color: trueColor }
                        : { color: falseColor }
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
    const [src, setSrc] = useState(card.svgSrc);
    const [index, setIndex] = useState(0);
    return (
      <>
        <AutoHeightWebView
          style={{
            marginTop: 5,
            minHeight: 200,
            height: 'auto',
          }}
          source={{
            uri: src,
          }}
          scalesPageToFit={true}
          viewportContent={'width=device-width, user-scalable=no'}
        />
        <View
          style={{
            flex: 5,
            marginRight: 5,
            marginLeft: 5,
            textAlign: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <IconButton
            icon="refresh-circle"
            size={26}
            onPress={() => {
              setSrc(`${card.svgSrc}?reload=${index}`);
              setIndex(index + 1);
            }}
            style={{ textAlign: 'center' }}
          /> */}
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
            }}>
            {card.meaning}
          </Text>
        </View>
      </>
    );
  };
  if (selectedChuHanLesson.type === BOARD_TYPE.THEORY) {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          {selectedChuHanLesson.board.title !== undefined && selectedLevel && (
            <Header
              title={`Học chữ Hán ${selectedLevel}`}
              subtitle={
                selectedChuHanLesson.type === BOARD_TYPE.THEORY
                  ? `${board.title} - Lý thuyết`
                  : `${board.title} - Bài tập củng cố `
              }
            />
          )}
          {!selectedLevel ||
            (!selectedChuHanLesson.board.title && (
              <Header title={'Học chữ Hán'} />
            ))}
          {loading && (
            <>
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            </>
          )}
          {!loading && (
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: '#dbd4c8',
                paddingBottom: 10,
                borderBottomWidth: 0.5,
              }}>
              {cards.length && (
                <>
                  {cards && (
                    <ScrollableTabView
                      style={{ borderBottomWidth: 0.5 }}
                      renderTabBar={() => (
                        <ScrollableTabBar
                          style={{ backgroundColor: '#dbd4c8' }}
                        />
                      )}>
                      {cards &&
                        cards.map(function(card, index) {
                          return (
                            <Card
                              style={styles.card}
                              key={card.id}
                              tabLabel={card.letter}>
                              <Divider />
                              <ChuHanWebView card={card} />
                              <Divider />
                              {!_.isEmpty(card.note) && (
                                <View style={styles.parentView}>
                                  <View
                                    style={{
                                      flex: 1.5,
                                      marginRight: 0,
                                      marginLeft: 0,
                                      height: 'auto',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        textAlign: 'center',
                                      }}>
                                      Mẹo nhớ
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 5,
                                      marginRight: 0,
                                      marginLeft: 0,
                                      height: 'auto',
                                      borderLeftWidth: 0.5,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        marginRight: 5,
                                        marginLeft: 10,
                                        // textAlign: 'center',
                                      }}>
                                      {card.note}
                                    </Text>
                                  </View>
                                </View>
                              )}
                              <Divider />
                              <View style={styles.parentView}>
                                <View
                                  style={{
                                    flex: 1.5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      marginRight: 5,
                                      marginLeft: 5,
                                      textAlign: 'center',
                                    }}>
                                    On
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 5,
                                    borderLeftWidth: 0.5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      margin: 5,
                                    }}>
                                    {card.onText}
                                  </Text>
                                  <AutoHeightWebView
                                    style={{
                                      minHeight: 150,
                                      height: 'auto',
                                      margin: 5,
                                    }}
                                    source={{
                                      html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                                        card.onTextExample,
                                      )}</div>`,
                                    }}
                                    scalesPageToFit={true}
                                    viewportContent={
                                      'width=device-width, user-scalable=no'
                                    }
                                  />
                                </View>
                              </View>
                              <Divider />
                              <View style={styles.parentView}>
                                <View
                                  style={{
                                    flex: 1.5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      marginRight: 5,
                                      marginLeft: 5,
                                      textAlign: 'center',
                                    }}>
                                    Kun
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 5,
                                    borderLeftWidth: 0.5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      margin: 5,
                                    }}>
                                    {card.kunText}
                                  </Text>
                                  <AutoHeightWebView
                                    style={{
                                      minHeight: 150,
                                      height: 'auto',
                                      margin: 5,
                                    }}
                                    source={{
                                      html: `<div style="background-color: #dbd4c8; margin: 0px; padding: 0px;">${htmlEntityDecode(
                                        card.kunTextExample,
                                      )}</div>`,
                                    }}
                                    scalesPageToFit={true}
                                    viewportContent={
                                      'width=device-width, user-scalable=no'
                                    }
                                  />
                                </View>
                                <Divider />
                              </View>
                              <Divider />
                            </Card>
                          );
                        })}
                    </ScrollableTabView>
                  )}
                </>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          {_.get(selectedChuHanLesson, 'board.title') !== undefined &&
            selectedLevel && (
              <Header
                title={`Học chữ Hán ${selectedLevel}`}
                subtitle={
                  selectedChuHanLesson.type === BOARD_TYPE.THEORY
                    ? `${board.title} - Lý thuyết`
                    : `${board.title} - Bài tập củng cố `
                }
              />
            )}
          {!selectedLevel ||
            (!_.get(selectedChuHanLesson, 'board.title') && (
              <Header title={'Học chữ Hán'} />
            ))}
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
                  backgroundColor: '#dbd4c8',
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
    backgroundColor: '#dbd4c8',
    flex: 1,
  },
});

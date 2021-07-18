/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
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
const getLetters = board => {
  let letters = [];
  if (board.cards && board.cards.length) {
    letters = board.cards.map(function(card) {
      return card.letter;
    });
  }
  return letters.join();
};
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const ChuHanLesson = ({ navigation }) => {
  const selectedChuHanLesson = useSelector(
    state => state.programReducer.selectedChuHanLesson,
  );
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  const [board, setBoard] = useState(selectedChuHanLesson.board);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(selectedChuHanLesson.board.cards);
  const [quizes, setQuizes] = useState(selectedChuHanLesson.board.quiz);
  const [value, setValue] = useState({});
  const [disabled, setDisabled] = useState({});
  const [answer, setAnswer] = useState({});
  const [count, setCount] = useState(0);
  const [answered, setAnswered] = useState(0);
  const trueColor = '#5cdb5e';
  const falseColor = '#f00';
  useEffect(() => {
    if (selectedChuHanLesson) {
      setLoading(false);
    }
  }, [selectedChuHanLesson]);
  const renderQuizItem = ({ item, index }) => {
    const quiz = item;
    return (
      <Card style={styles.card} key={quiz.id}>
        <Divider />
        <View style={styles.parentView}>
          <View
            style={{
              paddingTop: 10,
              flex: 0.6,
              justifyContent: 'flex-start',
              borderRightWidth: 0.5,
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
          </View>
          <View
            style={{
              flex: 3,
              borderRightWidth: 0.5,
              marginLeft: 5,
            }}>
            <View style={styles.parentView}>
              <View
                style={{
                  flex: 5,
                  marginRight: 5,
                  marginLeft: 5,
                }}>
                <Text style={{ fontSize: 16 }}>{quiz.question}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingTop: 0,
              marginLeft: 5,
              flex: 5,
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
              <RadioButton.Item
                label={`A. ${quiz.A}`}
                value="A"
                disabled={disabled['' + index]}
              />
              <RadioButton.Item
                label={`B. ${quiz.B}`}
                value="B"
                disabled={disabled['' + index]}
              />
              <RadioButton.Item
                label={`C. ${quiz.C}`}
                value="C"
                disabled={disabled['' + index]}
              />
              <RadioButton.Item
                label={`D. ${quiz.D}`}
                value="D"
                disabled={disabled['' + index]}
              />
              {value['' + index] && (
                <Text
                  style={{
                    color:
                      value['' + index] === quiz.answer
                        ? trueColor
                        : falseColor,
                    textAlign: 'left',
                    fontSize: 16,
                    marginLeft: 17,
                  }}>{`${value['' + index] === quiz.answer ? 'Ｘ' : 'Ｏ'}. ${
                  quiz.answer
                }`}</Text>
              )}
            </RadioButton.Group>
          </View>
        </View>
        <Divider />
      </Card>
    );
  };
  const ChuHanWebView = ({ card }) => {
    const [src, setSrc] = useState(card.svgSrc);
    return (
      <>
        {
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
        }
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
          <IconButton
            icon="refresh-circle"
            size={26}
            onPress={() => {
              setSrc('');
              setTimeout(() => {
                setSrc(`${card.svgSrc}`);
              }, 200);
            }}
            style={{ textAlign: 'center' }}
          />
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
        {!loading && selectedChuHanLesson.type === BOARD_TYPE.THEORY && (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: '#dbd4c8',
              paddingBottom: 10,
            }}>
            {cards.length && (
              <>
                {cards && (
                  <ScrollableTabView
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
        {!loading &&
          selectedChuHanLesson.type === BOARD_TYPE.EXERCISE &&
          quizes &&
          quizes.length > 0 && (
            <>
              <Text
                style={{
                  fontSize: 22,
                  textAlign: 'center',
                  fontFamily: 'SF-Pro-Detail-Regular',
                  backgroundColor: '#dbd4c8',
                }}>
                Bài tập củng cố
              </Text>
              <FlatList
                data={quizes}
                renderItem={renderQuizItem}
                keyExtractor={(item, index) => item.index}
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

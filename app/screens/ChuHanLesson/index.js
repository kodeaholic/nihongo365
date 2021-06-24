/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Divider, Badge } from 'react-native-paper';
import { Header } from '../../components/commonHeader';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { furiganaHTML, rubyHtmlTransform } from '../../helpers/furigana';
import HTML from 'react-native-render-html';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const [quizes, setQuizes] = useState(selectedChuHanLesson.board.cards);
  useEffect(() => {
    if (selectedChuHanLesson) {
      setLoading(false);
    }
  }, [selectedChuHanLesson]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {selectedChuHanLesson.board.title !== undefined && selectedLevel && (
          <Header
            title={`Học chữ Hán ${selectedLevel}`}
            subtitle={`${board.title}`}
          />
        )}
        {!selectedLevel ||
          (!selectedChuHanLesson.board.title && (
            <Header title={'Học chữ Hán'} />
          ))}
        <ScrollView style={{ flex: 1 }}>
          {loading && (
            <>
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            </>
          )}
          {!loading && cards.length && (
            <>
              {cards &&
                cards.map((card, index) => {
                  console.log(card);
                  return (
                    <Card style={styles.card} key={card.id}>
                      {/* <Card.Content> */}
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
                              <Text style={{ color: '#f00', fontSize: 20 }}>
                                {card.letter}
                              </Text>
                              <Text>{card.meaning}</Text>
                            </View>
                            <View
                              style={{
                                paddingTop: 10,
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                              }}>
                              <Badge
                                style={{
                                  marginRight: 3.5,
                                  backgroundColor: '#dbd4c8',
                                  color: '#000',
                                  borderWidth: 0.5,
                                }}
                                onPress={() => {
                                  navigation.navigate('ChuHanView', {
                                    svgSrc: card.svgSrc,
                                  });
                                }}>
                                {'?'}
                              </Badge>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            marginLeft: 5,
                            flex: 5,
                            flexDirection: 'column',
                          }}>
                          <Text>On: {card.onText}</Text>
                          <HTML
                            source={{ html: card.onTextExample }}
                            style={{ color: '#808080' }}
                          />
                          <Text>Kun: {card.kunText}</Text>
                          <HTML
                            source={{ html: card.kunTextExample }}
                            style={{ color: '#808080' }}
                          />
                          {card.note && <Text>Mẹo nhớ: {card.note}</Text>}
                        </View>
                      </View>
                      <Divider />
                      {/* </Card.Content> */}
                    </Card>
                  );
                })}
            </>
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

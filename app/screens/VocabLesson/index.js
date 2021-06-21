import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Text, Chip, Card, Divider, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/commonHeader';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { apiConfig } from '../../api/config/apiConfig';
import { authHeader } from '../../api/authHeader';
import { ActivityIndicator } from 'react-native';
import * as programActions from '../../actions/programActions';
import { furiganaHTML } from '../../helpers/furigana';
import HTML from 'react-native-render-html';

const tagsStyles = {
  // ruby: {
  //   display: 'inline-flex',
  //   flexDirection: 'column-reverse',
  // },
  // rb: { display: 'inline', lineHeight: 1 },
  // rt: {
  //   display: 'inline',
  //   lineHeight: 1,
  // },
  ruby: {
    fontSize: 20,
  },
  rb: { fontSize: 20 },
  rt: {
    fontSize: 10,
  },
};

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
      }`;
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
        <Header
          title={`Học từ vựng ${selectedLevel}`}
          subtitle={`${selectedVocabLesson.chapterName} - ${
            selectedVocabLesson.chapterDescription
          } - ${selectedVocabLesson.name}`}
        />
        <ScrollView>
          {/* <View>
            <Text style={styles.text}>{`Từ vựng ${selectedLevel} - ${
              selectedVocabLesson.chapterName
            } (${selectedVocabLesson.chapterDescription})`}</Text>
            <Text style={styles.text}>{`Bài『 ${
              selectedVocabLesson.name
            } 』`}</Text>
          </View> */}
          {/* <Card style={styles.card}>
            <Card.Content>
              <View style={styles.parentView}>
                <View style={{ flex: 4 }}>
                  <View style={styles.parentView}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: 'bold' }}>STT</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text style={{ fontWeight: 'bold' }}>Từ vựng</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>Ví dụ</Text>
                </View>
              </View>
            </Card.Content>
          </Card> */}
          {!loading &&
            vocabs.map((vocab, index) => {
              const html = furiganaHTML(vocab.vocab);
              const htmlExample = furiganaHTML(vocab.example);
              const normalVocab = !html.includes('ruby');
              const normalExample = !htmlExample.includes('ruby');
              return (
                <Card style={styles.card}>
                  {/* <Card.Content> */}
                  <Divider />
                  <View style={styles.parentView}>
                    <View
                      style={{ flex: 4, borderRightWidth: 0.5, marginLeft: 5 }}>
                      <View style={styles.parentView}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Badge style={{ marginRight: 3.5 }}>
                            {index + 1}
                          </Badge>
                        </View>
                        <View style={{ flex: 5, marginRight: 5, marginLeft: 5 }}>
                          {normalVocab && (
                            <Text style={{ fontSize: 20, color: '#000' }}>
                              {vocab.vocab}
                            </Text>
                          )}
                          {!normalVocab && (
                            <HTML
                              source={{ html: html }}
                              tagsStyles={tagsStyles}
                              style={{ fontSize: 20 }}
                            />
                          )}
                          <Text>{vocab.vocabMeaning}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 5, marginLeft: 5 }}>
                      {normalExample && (
                        <Text style={{ fontSize: 20, color: '#000' }}>
                          {vocab.example}
                        </Text>
                      )}
                      {!normalExample && (
                        <HTML
                          source={{ html: htmlExample }}
                          tagsStyles={tagsStyles}
                          style={{ fontSize: 20 }}
                        />
                      )}
                      <Text>{vocab.exampleMeaning}</Text>
                    </View>
                  </View>
                  <Divider />
                  {/* </Card.Content> */}
                </Card>
              );
            })}
          {loading && (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
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
  },
  childView: {
    flex: 1,
  },
  card: {
    margin: 0,
  },
});

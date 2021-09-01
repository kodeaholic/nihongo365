/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { Text } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { SafeAreaView, ScrollView, Platform } from 'react-native';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CONTRACTED_HIRAGANA,
  CONTRACTED_KATAKANA,
  TYPES,
  TYPE_NAMES,
} from './data';
import { FlatGrid } from 'react-native-super-grid';
import Tts from 'react-native-tts';
const text2SpeechOption = {
  androidParams: {
    KEY_PARAM_PAN: +1,
    KEY_PARAM_VOLUME: 1,
    KEY_PARAM_STREAM: 'STREAM_MUSIC',
  },
};
Tts.setDefaultLanguage('ja-JP');
Tts.setDefaultRate(0.6);
Tts.setDucking(true);
Tts.getInitStatus().then(
  () => {
    console.log('TTS engine started');
  },
  err => {
    if (err.code === 'no_engine') {
      ToastAndroid.showWithGravityAndOffset(
        'Vui lòng xác nhận cài đặt gói ngôn ngữ tiếng Nhật cho Nihongo365',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
      Tts.requestInstallEngine();
    }
  },
);
const SCREEN = {
  MASTER: 'MASTER',
  DETAIL: 'DETAIL',
};
const Alphabet = ({ navigation }) => {
  const [screen, setScreen] = useState(SCREEN.MASTER);
  const [type, setType] = useState('');
  const [fabVisible, setFabVisible] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerProps: {
        title: 'Bảng chữ',
        subtitle: TYPE_NAMES[type],
      },
    });
  }, [navigation, type]);
  useEffect(() => {
    if (screen === SCREEN.DETAIL) {
      setFabVisible(true);
    }
  }, [screen]);
  useEffect(() => {
    let data = [];
    if (type === TYPES.CONTRACTED_HIRAGANA) {
      data = CONTRACTED_HIRAGANA.map(item => {
        return {
          name: item.contracted,
          code: '#fff',
          romaji: item.romaji,
        };
      });
    }

    if (type === TYPES.CONTRACTED_KATAKANA) {
      data = CONTRACTED_KATAKANA.map(item => {
        return {
          name: item.contracted,
          code: '#fff',
          romaji: item.romaji,
        };
      });
    }

    setItems(data);
  }, [type]);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 60) / 3;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {screen === SCREEN.MASTER && (
          <>
            <View style={{ height: '100%', flex: 1 }}>
              <TouchableOpacity
                style={[styles.opacityButton, styles.greenBackground]}
                onPress={() => {
                  setScreen(SCREEN.DETAIL);
                  setType(TYPES.HIRAGANA);
                }}>
                <Text style={[styles.opacityButtonText, styles.whiteText]}>
                  Hiragana
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.opacityButton, styles.orangeBackground]}
                onPress={() => {
                  setScreen(SCREEN.DETAIL);
                  setType(TYPES.KATAKANA);
                }}>
                <Text style={[styles.opacityButtonText, styles.whiteText]}>
                  Katakana
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.opacityButton, styles.blueBackground]}
                onPress={() => {
                  setScreen(SCREEN.DETAIL);
                  setType(TYPES.CONTRACTED_HIRAGANA);
                }}>
                <Text style={[styles.opacityButtonText, styles.whiteText]}>
                  Ghép âm Hiragana
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.opacityButton, styles.frolyBackground]}
                onPress={() => {
                  setScreen(SCREEN.DETAIL);
                  setType(TYPES.CONTRACTED_KATAKANA);
                }}>
                <Text style={[styles.opacityButtonText, styles.whiteText]}>
                  Ghép âm Katakana
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {screen === SCREEN.DETAIL && type === TYPES.CONTRACTED_HIRAGANA && (
          <FlatGrid
            itemDimension={itemWidth}
            data={items}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  Tts.speak(item.name, text2SpeechOption);
                }}
                style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.romaji}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        {screen === SCREEN.DETAIL && type === TYPES.CONTRACTED_KATAKANA && (
          <FlatGrid
            itemDimension={itemWidth}
            data={items}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  Tts.speak(item.name, text2SpeechOption);
                }}
                style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.romaji}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        {fabVisible && (
          <FAB
            style={styles.fab}
            onPress={() => {
              setType('');
              setFabVisible(false);
              setScreen(SCREEN.MASTER);
            }}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="keyboard-variant"
                color="#fff"
                size={24}
              />
            )}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  opacityButton: {
    margin: 5,
    backgroundColor: '#F5FCFF',
    flex: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityButtonText: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontWeight: 'normal',
    fontSize: 19,
    textTransform: 'capitalize',
  },
  frolyBackground: {
    backgroundColor: 'rgba(241, 130, 141,1)',
    color: '#000',
  },
  purpleBackground: {
    backgroundColor: 'rgba(165, 55, 253, 1)',
    color: '#fff',
  },
  blueBackground: {
    backgroundColor: 'rgba(0, 181, 204, 1)',
    color: '#fff',
  },
  greenBackground: {
    backgroundColor: 'rgba(63, 195, 128, 1)',
    color: '#fff',
  },
  yellowBackground: {
    backgroundColor: 'rgba(255, 255, 126, 1)',
    color: '#000',
  },
  orangeBackground: {
    backgroundColor: 'rgba(241, 90, 34, 1)',
  },
  whiteText: {
    color: '#fff',
  },
  blackText: {
    color: '#000',
  },
  fab: {
    position: 'absolute',
    margin: 5,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(219, 10, 91, 1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.65,

    elevation: 8,
    textAlign: 'center',
    alignContent: 'center',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 65,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
});

export default Alphabet;

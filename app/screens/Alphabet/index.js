/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TYPES, TYPE_NAMES } from './data';
const SCREEN = {
  MASTER: 'MASTER',
  DETAIL: 'DETAIL',
};
const Alphabet = ({ navigation }) => {
  const [screen, setScreen] = useState(SCREEN.MASTER);
  const [type, setType] = useState('');
  const [fabVisible, setFabVisible] = useState(false);
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
        {fabVisible && (
          <FAB
            style={styles.fab}
            onPress={() => {
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
});

export default Alphabet;

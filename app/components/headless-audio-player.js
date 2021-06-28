/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { AppState, ActivityIndicator } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
var Sound = require('react-native-sound');

export const HeadlessAudioPlayer = props => {
  const { src, size = 20 } = props;
  //   const [playable, setPlayable] = useState(false);
  const [loading, setLoading] = useState(true);
  let [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    player.play(success => {
      if (success) {
        setPlaying(false);
        player.setCurrentTime(0);
        pause();
      }
    });
  };

  const pause = () => {
    player.pause();
    setPlaying(false);
  };

  useEffect(() => {
    if (!_.isEmpty(src)) {
      const handleAppStateChange = currentAppState => {
        if (
          currentAppState === 'background' ||
          currentAppState === 'inactive'
        ) {
          if (player && player.isPlaying()) {
            pause();
          }
        }
      };
      AppState.addEventListener('change', handleAppStateChange);
    }
    return () => {
      if (!_.isEmpty(src)) {
        if (player && player.isPlaying()) {
          pause();
        }
      }
    };
  });

  /** Load the file */
  useEffect(() => {
    if (!_.isEmpty(src)) {
      if (!player) {
        // Sound.setCategory('Playback');
        let soundPlayer;
        try {
          soundPlayer = new Sound(src, null, error => {
            if (error) {
              //   setPlayable(false);
              setPlayer({ player: false });
            }
          });
          //   setPlayable(true);
          setPlayer(soundPlayer);
          setLoading(false);
        } catch (e) {
          setPlayer({ player: false });
          setLoading(false);
        }
      }
    }
  }, [src, player]);
  if (_.isEmpty(src)) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Icon name="play-circle-outline" size={size} color="#808080" />
      </View>
    );
  } else if (loading && !player) {
    return <ActivityIndicator size="small" style={{ marginTop: 10 }} />;
  } else {
    // console.log('LOADING: ', loading);
    // console.log(playable);
    // console.log(player);
    return (
      <>
        {true && (
          <>
            {!playing && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  name="play-circle-outline"
                  size={size}
                  color="#5cdb5e"
                  onPress={play}
                />
              </View>
            )}
            {playing && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  name="pause-circle-outline"
                  size={size}
                  color="#5cdb5e"
                  onPress={pause}
                />
              </View>
            )}
          </>
        )}
      </>
    );
  }
};

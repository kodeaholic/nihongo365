/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
var Sound = require('react-native-sound');

export const HeadlessAudioPlayer = props => {
  const { src, size = 20 } = props;
  const [playable, setPlayable] = useState(false);
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
    const handleAppStateChange = currentAppState => {
      if (currentAppState === 'background' || currentAppState === 'inactive') {
        if (player && player.isPlaying()) {
          pause();
        }
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
  });

  /** Load the file */
  useEffect(() => {
    if (!player) {
      // Sound.setCategory('Playback');
      let soundPlayer;
      try {
        soundPlayer = new Sound(src, null, error => {
          if (error) {
            setPlayable(false);
            setPlayer({ player: false });
            console.log(src);
            console.log(error);
          } else {
            setPlayable(true);
            setPlayer(soundPlayer);
            setLoading(false);
          }
        });
      } catch (e) {
        setPlayer({ player: false });
      }
    } else {
      setPlayable(false);
    }
  }, [src, player]);

  if (loading && !player) {
    // return (
    //   <View style={styles.container}>
    //     <ActivityIndicator size="small" style={{ marginTop: 10 }} />
    //   </View>
    // );
    return <></>;
  } else {
    return (
      <>
        {playable && (
          <>
            {!playing && (
              <Icon
                name="play-circle-outline"
                size={size}
                color="#5cdb5e"
                onPress={play}
              />
            )}
            {playing && (
              <Icon
                name="pause-circle-outline"
                size={size}
                color="#5cdb5e"
                onPress={pause}
              />
            )}
          </>
        )}
      </>
    );
  }
};

// const styles = StyleSheet.create({
//   container: {
//     height: 60,
//     paddingTop: 2,
//     paddingBottom: 5,
//     marginVertical: 0,
//   },
//   slider: {
//     flex: 1,
//     // marginVertical: 5,
//     marginHorizontal: 20,
//   },
//   button: {
//     height: 35,
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     justifyContent: 'center',
//     marginTop: 0,
//   },
// });

import React from 'react';
import { View } from 'react-native';

import Programs from './index.mobile';
import VocabProgramGuideline from '../../screens/ProgramGuideline/Vocab';
import Calendar from 'app/screens/Calendar';

export default function TaletPrograms({ navigation }) {
  const onClick = () => navigation.navigate('VocabProgramGuideline');
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1.2 }}>
        <Programs />
      </View>
      <View style={{ flex: 1.2 }}>
        <VocabProgramGuideline />
      </View>
      <View style={{ flex: 2 }}>
        <Calendar />
      </View>
    </View>
  );
}

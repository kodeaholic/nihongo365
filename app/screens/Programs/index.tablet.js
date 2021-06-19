import React from 'react';
import { View } from 'react-native';

import Programs from './index.mobile';
import ProgramDetail from 'app/screens/ProgramDetail';
import Calendar from 'app/screens/Calendar';

export default function TaletPrograms({ navigation }) {
  const onClick = () => navigation.navigate('ProgramDetail');
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1.2 }}>
        <Programs />
      </View>
      <View style={{ flex: 1.2 }}>
        <ProgramDetail />
      </View>
      <View style={{ flex: 2 }}>
        <Calendar />
      </View>
    </View>
  );
}

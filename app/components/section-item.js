import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

function SectionItem({ icon, name, color }) {
  return (
    <View style={styles.section}>
      <IconButton icon={icon} color={color} size={20} onPress={() => {}} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  name: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Regular',
    letterSpacing: 1,
    borderColor: '#00aea2',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  },
});

export default SectionItem;

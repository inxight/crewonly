import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style/Style';

export default function Loading(props) {

  return (
    <View style={styles.container1}>
      <Text>{'잠시만 기다려주세요...'}</Text>
    </View>
  );
}

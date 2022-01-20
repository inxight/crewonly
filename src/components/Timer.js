import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../components/BOOTSTRAP.js';
import CountDown from 'react-native-countdown-component';
import styles from '../style/Style';

export default function Timer(props){

  return(
    <CountDown
      size={7}
      until={props.items}
      onFinish={() => props.timeFinish()}
      // onChange={() => setTimes(props.items)}
      digitStyle={{backgroundColor: 'transparent'}}
      digitTxtStyle={{ ...styles.ff1l, color: 'red', fontSize: 12 }}
      separatorStyle={{ ...styles.ff1l, color: 'red', fontSize: 12 }}
      timeToShow={['M', 'S']}
      timeLabels={{m: null, s: null}}
      showSeparator
    />
  );
}

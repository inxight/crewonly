import React, {Component} from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Fonts } from './Fonts';

export default StyleSheet.create({
    a: {
        color: '#FF3366', fontSize: 14, fontFamily: (Platform.OS === 'ios')?Fonts.Montserrat:Fonts.MontserratRegular, fontWeight: 'normal'
    },
    p: {
        color: '#333', fontSize: 14, fontFamily: (Platform.OS === 'ios')?Fonts.Montserrat:Fonts.MontserratRegular, fontWeight: 'normal'
    },
});

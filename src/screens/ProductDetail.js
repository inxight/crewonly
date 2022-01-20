import React, { Component, useEffect, useState, useRef, createRef } from 'react';
import { View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Dimensions, Platform, StatusBar, Linking, Share, Alert, processColor, Keyboard } from 'react-native';
import { Container, Content, Header, Body, Title, Left, Right, Footer, FooterTab, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import BottomSheet from 'reanimated-bottom-sheet';
// import ScrollView from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import Modal from 'react-native-modal';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import CusCarousel from '../components/CusCarousel'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, Btn01, MenuTab, PageLoadingIcon, CusImage, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function ProductDetail(props) {

  return (
    <Container>
      <HeaderWrap title={'상품상세'} navigation={props.navigation} route={props.route} />
      
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_idx:(idx) => {
      dispatch(ActionCreator.updateIndex(idx));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

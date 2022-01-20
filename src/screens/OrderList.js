import React, { PureComponent, useState, useEffect } from 'react';
import { View, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Platform, Alert } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import Modal from 'react-native-modal';
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import PickDate from '../components/PickDate'
import ProductRowLi from '../components/ProductRowLi'
import cusToast from '../components/CusToast'
import { BtnFrmline, CusImage, PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

var date = new Date();
date.setDate(date.getDate());
const nowDate = Api.formatDate(date);

var minDate = new Date();
minDate.setDate(minDate.getDate() - 365);
minDate = Api.formatDate(minDate);

function OrderList(props){

  return (
    <Container style={styles.bg0}>
      <HeaderWrap title={'주문내역'} navigation={props.navigation} route={props.route} />
      <Content>

      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

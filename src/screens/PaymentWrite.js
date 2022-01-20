import React, { Component, useEffect, useState, useCallback } from 'react';
import { View, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Keyboard, BackHandler, Dimensions, Platform } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Header, Body, Title, Button } from 'native-base';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from '@react-native-community/async-storage';
// import SmsRetriever from 'react-native-sms-retriever';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import Timer from '../components/Timer'
import CouponLi from '../components/CouponLi'
import ProductRowLi from '../components/ProductRowLi'
import { BtnSubmit, BtnFrmline, CusCheckbox, CusHtml, CusWebview, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

// import { useForm } from 'react-hook-form';

//------------------------------------------------------------------------------
function PaymentWrite(props){
  const dispatch = useDispatch();
  const ct_idx = props.route.params.ct_idx;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const backAction = (str) => {
    return true;
  };

  return(
    <Container style={styles.bg0}>
      <HeaderWrap title={'주문/결제'} navigation={props.navigation} route={props.route} backAction={() => backAction('payment')} right={'none'} />
      <Content enableResetScrollToCoords={false}>

      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_name: state.login.mt_name,
    mt_hp: state.login.mt_hp,
    mt_email: state.login.mt_email,
    mt_point: state.login.mt_point,
    mt_coupon: state.login.mt_coupon,
    mt_coupon2: state.login.mt_coupon2,
    mt_deposit: state.login.mt_deposit,

    // abank_account: state.sconf.abank_account,
    // abank_date: state.sconf.abank_date,
    temp_mt_id: state.sconf.temp_mt_id,
    aorder_point: state.sconf.aorder_point,
    avoucher_point: state.sconf.avoucher_point,
    areview_point: state.sconf.areview_point,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWrite);

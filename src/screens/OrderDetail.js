import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ProductRowLi from '../components/ProductRowLi'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
function OrderDetail(props){
  
  return(
    <Container style={styles.bg0}>
      <HeaderWrap title={'주문상세'} navigation={props.navigation} route={props.route} right={'none'} />
      <Content>
        
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);

import React, { Component, useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';
import Axios from 'axios';

import HeaderWrap from '../components/Header'
import ProductRowLi from '../components/ProductRowLi'
import cusToast from '../components/CusToast'
import InfoTxt from '../components/InfoTxt'
import { BtnSubmit, CusSelect, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
function PaymentCancel(props){
  
  return(
    <Container>
      <HeaderWrap title={''} navigation={props.navigation} route={props.route} right={'none'} />
      <Content style={styles.bg0} enableResetScrollToCoords={false}>
        
      </Content>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCancel);

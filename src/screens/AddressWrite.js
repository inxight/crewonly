import React, { Component, useEffect, useState, useRef } from 'react';
import { ScrollView, View, TextInput, Image, TouchableOpacity, Dimensions, Alert, Keyboard } from 'react-native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, CusCheckbox, CusSelect, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
function AddressWrite(props) {

  return(
    <Container>
      <HeaderWrap title={'배송지 입력'} navigation={props.navigation} route={props.route} />
      <Content ref={c => { global.appContent = c; }} enableResetScrollToCoords={false}>
        
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_name: state.login.mt_name,
    mt_hp: state.login.mt_hp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressWrite);

import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, Dimensions, Alert, Keyboard } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content } from 'native-base';
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, CusCheckbox } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
// 회원가입(스타일선택)
function RegisterInfo(props) {
  
  useEffect(()=>{
  },[]);
  
  const Submit_frm = async (values) => {
    
  }
  
  return(
    <Container>
      <HeaderWrap title={""} navigation={props.navigation} route={props.route} />
      <Content>
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInfo);

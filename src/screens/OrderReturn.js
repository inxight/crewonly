import React, { Component, useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Keyboard, Platform, Alert } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import ImagePicker from 'react-native-image-crop-picker';
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ProductRowLi from '../components/ProductRowLi'
// import FilePick from '../components/FileListPick'
import FilePick from '../components/FilePick'
import cusToast from '../components/CusToast'
import CusAlert from '../components/CusAlert'
import InfoTxt from '../components/InfoTxt'
import { BtnSubmit, CusSelect, CusCheckbox, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
function OrderReturn(props) {
  
  return(
    <Container>
      <HeaderWrap title={'교환/반품요청'} navigation={props.navigation} route={props.route} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderReturn);

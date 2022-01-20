import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Icon, Button } from 'native-base';
// import Clipboard from '@react-native-community/clipboard';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import ProductRowLi from '../components/ProductRowLi'
import { BtnSubmit, BtnFrmline, PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
function PaymentResult(props) {
  
  return (
    <Container>
      <HeaderWrap title={''} navigation={props.navigation} route={props.route} right={'none'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentResult);
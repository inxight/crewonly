import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Switch } from 'react-native';
import { Container, Content, Button, } from 'native-base';
import Modal from "react-native-modal";
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { BtnFrmline, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function PushSetting(props) {
  
  return (
    <Container>
      <HeaderWrap title={'알림설정'} navigation={props.navigation} route={props.route} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PushSetting);

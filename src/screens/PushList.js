import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { CusImage, MenuTab, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function PushList(props){

  return (
    <Container>
      <HeaderWrap title={'알림내역'} navigation={props.navigation} route={props.route} />
      <Content>
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    push_cnt: state.login.push_cnt,
    loginInfo: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PushList);

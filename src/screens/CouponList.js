import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import CouponLi from '../components/CouponLi'
import { Btn01, PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function CouponList(props){

  return (
    <Container>
      <HeaderWrap title={'쿠폰함'} navigation={props.navigation} route={props.route} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CouponList);

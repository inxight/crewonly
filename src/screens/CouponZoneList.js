import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import CouponLi from '../components/CouponLi'
import { CusImage, Text } from '../components/BOOTSTRAP';
import cusToast from '../components/CusToast'

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function CouponZoneList(props) {
  
  return (
    <Container>
      <HeaderWrap title={'CouponZone'} navigation={props.navigation} route={props.route} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CouponZoneList);

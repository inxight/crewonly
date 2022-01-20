import React, { Component, useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import ShopLi from '../components/ShopLi'
import { Text } from '../components/BOOTSTRAP';

import {connect} from 'react-redux';
import ActionCreator from '../redux/actions';

function ShopList(props){

  return(
    <Container>
      <HeaderWrap title={'스토어'} navigation={props.navigation} route={props.route} />
      <Content>
        
      </Content>
      <FooterWrap actMenu={"shop"} navigation={props.navigation} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList);

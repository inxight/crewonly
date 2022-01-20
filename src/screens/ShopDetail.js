import React, {Component, useEffect, useState, useRef} from 'react';
import { View, Image, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator, Dimensions, Platform, ImageBackground, Alert } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ProductLi from '../components/ProductLi'
import { BtnFrmline, Btn01, CusTag, CusImage, Text } from '../components/BOOTSTRAP';

import {connect} from 'react-redux';
import ActionCreator from '../redux/actions';

function ShopDetail(props){

  return(
    <Container>
      <HeaderWrap title={'스토어상세'} navigation={props.navigation} route={props.route} />
      <Content>
        
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    idx: state.index.idx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_idx:(idx, idx1) => {
      dispatch(ActionCreator.updateIndex(idx, idx1));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);

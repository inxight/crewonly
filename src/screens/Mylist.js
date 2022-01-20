import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import ProductLi from '../components/ProductLi'
import { PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function Mylist(props){
  
  return (
    <Container>
      <HeaderWrap title={'찜'} navigation={props.navigation} route={props.route} />
      <Content>
        
      </Content>
      <FooterWrap actMenu={"mylist"} navigation={props.navigation} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    idx: state.index.idx,
    idx1: state.index.idx1,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_idx:(idx) => {
      dispatch(ActionCreator.updateIndex(idx));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mylist);

import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button, CheckBox } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ReviewLi from '../components/ReviewLi'
import { Score_Star, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function ReviewList(props){

  return(
    <Container>
      <HeaderWrap title={'리뷰내역'} navigation={props.navigation} route={props.route} right={'none'} />
      
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);

import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Platform, BackHandler, Keyboard, Linking } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button } from 'native-base';
import IMP from 'iamport-react-native';
import Loading from '../components/Loading';
import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import Axios from 'axios';
import Api from '../Api';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

//------------------------------------------------------------------------------
function Payment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  },[])

  const backAction = (str) => {
    props.navigation.goBack();
    return true;
  };

  function callback(response) {
    Keyboard.dismiss();
    const { imp_success, success, imp_uid, merchant_uid, error_msg } = response;
    const isSuccess = !(imp_success === 'false' || imp_success === false || success === 'false' || success === false);

    console.log("response..", response);
    console.log('od_id..', props.route.params.od_id, props.route.params.amount, isSuccess);

    pg_Auth(imp_uid, isSuccess, response);
  }

  const pg_Auth = async (imp_uid, isSuccess, res) => {
      var obj = { od_id: props.route.params.od_id, amount: props.route.params.amount, temp_mt_id: props.temp_mt_id, rescode: '0000' };
      console.log(obj);

      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Main', params: {modal: false} },
          { name: 'PaymentResult', params: obj},
        ],
      });
      props.navigation.dispatch(resetAction);
  }
 
  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = { ...props.route.params.data.pay };
  
  return (
    <Container>
      <HeaderWrap title={'결제진행'} navigation={props.navigation} route={props.route} backAction={() => backAction('payment_iam')} />
      <IMP.Payment
        userCode={''}
        loading={<Loading />}
        data={data}
        callback={callback}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
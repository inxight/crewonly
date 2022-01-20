import React, {Component, useEffect, useState, useRef} from 'react';
import { View, PermissionsAndroid, Alert, Linking, Platform } from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// import firebase from '@react-native-firebase/app';
// import iid from '@react-native-firebase/iid';
// import messaging from '@react-native-firebase/messaging';

import Api from '../Api';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function Auth(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    SiteInfo();
    Auth_info();
  }, []);
  //----------------------------------------------------------------------------
  const SiteInfo = async () => {
    var temp_mt_id = await AsyncStorage.getItem("temp_mt_id");
    if (!temp_mt_id) {
      temp_mt_id = "Guest-"+Api.formatDateTime(new Date(),'YmdHis')+"-"+Math.round( Math.random()*100000 );
      await AsyncStorage.setItem('temp_mt_id', temp_mt_id);
    }
    var args = {
      resultItem: {result: 'Y'},
      arrItems: {
        st_email: '',
      }
    };
    // Api.send('customer_center_info', {}, (args)=>{

      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        props.set_sconf('CREWONLY', arrItems.st_email, arrItems.st_customer_tel, arrItems.st_company_add, arrItems.st_company_boss
        , arrItems.st_company_name, arrItems.st_company_num2, arrItems.st_company_num1, arrItems.st_privacy_admin, arrItems.st_customer_admin
        , arrItems.bank_account, arrItems.bank_date, temp_mt_id);
      }
    // });
  }
  //----------------------------------------------------------------------------
  async function Auth_info() {
    let mt_id = await AsyncStorage.getItem("mt_id");
    var temp_mt_id = await AsyncStorage.getItem("temp_mt_id");
    console.log('mt_id:', mt_id, ', temp_mt_id:', temp_mt_id);
    
    const id = "";//await iid().get();
    const fcmToken = "";//await firebase.iid().getToken();
    const token = "";//await messaging().getToken();

    getLogin(mt_id, temp_mt_id, token);
  }

  const getLogin = async (mt_id, temp_mt_id, token) => {
    if (mt_id) {
      var args = {
        resultItem: {result: 'Y'},
        arrItems: {
          mt_id: mt_id, mt_level: 2, mt_login_type: '1', cart_cnt: 0, cart_sum: 0
        }
      };
      //Api.send('member_login_chk', { mt_app_token: token, mt_id: mt_id, vi_os: Platform.OS }, async (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
          props.set_rconf('', arrItems.mt_login_type==='1'?arrItems.mt_id:'');
          //----------------------------------------------------------------------------
          props.navigation.dispatch(
            StackActions.replace('Main', {})
          );
        } else {
          // 다른 기기 혹은 관리자에서 탈퇴한 경우 스토리지 삭제 처리
          await AsyncStorage.removeItem('mt_id');
          temp_info(temp_mt_id);
        }
      //});
    } else {
      temp_info(temp_mt_id);
    }
  }

  const temp_info = async (temp_mt_id) => {
    var args1 = {
      resultItem: {result: 'Y'},
      arrItems: {
        mt_id: temp_mt_id, mt_level: 0, mt_login_type: '1', cart_cnt: 0, cart_sum: 0
      }
    };
    // Api.send('member_info', { temp_mt_id: temp_mt_id, vi_os: Platform.OS }, (args1)=>{

      let resultItem1 = args1.resultItem;
      let arrItems1 = args1.arrItems;
      if (resultItem1.result === 'Y') {
        dispatch(loginAction.updateLogin(JSON.stringify(arrItems1)));
        //----------------------------------------------------------------------------
        props.navigation.dispatch(
          StackActions.replace('Main', {})
        );
      }
    // });
  }

  return (
    <Container>
      <Content>
        <View style={{ marginTop: "49%" }}>
          <Spinner color='#999' />
        </View>
      </Content>
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    set_sconf:(aname, aemail, acallno, aaddress, aceo, abizname, abizelc, abizno, aprivacy, acustomer, abank_account, abank_date, temp_mt_id) => {
      dispatch(ActionCreator.updateSconf(aname, aemail, acallno, aaddress, aceo, abizname, abizelc, abizno, aprivacy, acustomer, abank_account, abank_date, temp_mt_id));
    },
    set_rconf:(routeName, last_mt_id, recommend) => {
      dispatch(ActionCreator.updateRoute(routeName, last_mt_id, recommend));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
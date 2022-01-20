import React, { Component, useEffect, useState } from 'react';
import { View, PermissionsAndroid, Alert, Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import Api from './Api';
import CusAlert from './components/CusAlert'
import cusToast from './components/CusToast'

import { connect, useDispatch } from 'react-redux';
import ActionCreator from './redux/actions';
import * as loginAction from './redux/actions/loginAction';

async function callScreen(props, data) {
  var link_screen = data.push_link,
      link_param = JSON.parse(data.ref_param);

  console.log('callScreen..', link_screen, link_param);

  if (link_screen==='Main') {
    props.navigation.navigate('Main', {});
  } else {
    props.navigation.navigate(link_screen, link_param);
  }
}
//------------------------------------------------------------------------------
async function registerAppWithFCM() {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
}
//------------------------------------------------------------------------------
async function requestUserPermission(props) {
  let settings = await messaging().hasPermission();
  if (settings !== messaging.AuthorizationStatus.AUTHORIZED) {
    settings = await messaging().requestPermission();
  }
  const enabled =
    settings === messaging.AuthorizationStatus.AUTHORIZED ||
    settings === messaging.AuthorizationStatus.PROVISIONAL;

  // console.log(settings, enabled);
  if (enabled) { // settings
    // console.log('Permission settings:', settings);

    const fcmToken = await messaging().getToken();
    let mt_id = await AsyncStorage.getItem('mt_id');
    if (mt_id) {
      id = mt_id;
    } else {
      id = props.mt_id;
    }
    let token = props.mt_app_token;
    // console.log(fcmToken, id);
    // console.log(token);
    if (fcmToken && fcmToken !== token) {
      if (id) {
        console.log("_updateTokenToServer.............................................");
        Api.send('member_login_chk', { mt_id: id, mt_app_token: fcmToken, vi_os: Platform.OS }, (args)=>{
          let resultItem = args.resultItem;
          if (resultItem.message==='member_login_history') {
            //setIsCusAlertVisible(true);
            //setCAmessage("로그인이 만료되었습니다.\n재로그인이 필요합니다.");
            Alert.alert(
              ("로그인이 만료되었습니다.\n재로그인이 필요합니다."),
              [
                { text: 'OK', onPress: () => { props.navigation.navigate('Login', {}); } },
              ],
              { cancelable: false }
            );
          }
        });
      }
    }
  }
}
//------------------------------------------------------------------------------
function Fcm(props){
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerAppWithFCM();
    requestUserPermission(props);

    // foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      console.log(props.routeName, '/', (remoteMessage.data?'data':'noti'), '/', remoteMessage.data.push_type, '/', remoteMessage.data.push_type2, '/', remoteMessage.data.send_to, '/', props.mt_id);
      /*
      if (remoteMessage.data) {
        var msg = remoteMessage.data;
        if ( !(props.routeName==='QaChat' && (msg.push_type==='chat' || msg.push_type2==='chat')) &&
        (msg.send_to.indexOf(props.mt_id) != -1 || msg.send_to===props.mt_id) ) {
          // setIsCusAlertVisible(true); setCAmessage([msg.message,2,msg,msg.push_type]);
          Alert.alert(
            msg.title,
            msg.message,
            [
              {text: 'CANCEL', onPress: () => console.log('Cancel'), style: 'cancel'},
              {text: 'OK', onPress: () => { callScreen(props, msg) }},
            ],
            { cancelable: false }
          );
        }
      } else {
        var msg = remoteMessage.notification;
        Alert.alert(
          msg.title,
          msg.body,
          [
            {text: 'CANCEL', onPress: () => console.log('Cancel'), style: 'cancel'},
            {text: 'OK', onPress: () => { callScreen(props, msg) }},
          ],
          { cancelable: false }
        );
      }
      */
      if (remoteMessage.data) {
        var msg = remoteMessage.data;
        if (msg.send_to.indexOf(props.mt_id) != -1 || msg.send_to===props.mt_id) {
          if ( !(props.routeName==='QaChat' && (msg.push_type==='chat' || msg.push_type2==='chat')) ) {
            var newArray = props.loginInfo;
            newArray.push_cnt = (props.push_cnt*1)+1;
            console.log('add push_cnt', newArray.push_cnt);
            dispatch(loginAction.updateLogin(JSON.stringify(newArray)));
          }
          if (!(msg.push_type2==='chat' || msg.push_type2==='orderConfirm')) { // || msg.push_type2==='login_history'
            // cusToast(msg.message, 'info', 3000);
            cusToast(msg.message, 'push', props, remoteMessage.data);
          }
        }
      }
    });

    return unsubscribe;
  }, [props.mt_id, props.push_cnt]);

  useEffect(() => {

    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(remoteMessage);
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
      callScreen(props, remoteMessage.data);
    });

    // Check whether an initial notification is available // app closed 일때 받은 메시지가 있는 경우
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log(remoteMessage);
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
          callScreen(props, remoteMessage.data);
        }
        setLoading(false);
    });

  }, []);

  // if (loading) {
    return null;
  // }

}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_app_token: state.login.mt_app_token,
    push_cnt: state.login.push_cnt,
    loginInfo: state.login,
    routeName: state.rconf.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fcm);

import React, { Component, useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, ActivityIndicator, Keyboard, Platform, BackHandler } from 'react-native';
import { Container, Content, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
// import SmsRetriever from 'react-native-sms-retriever';
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import CusAlert from '../components/CusAlert'
import cusToast from '../components/CusToast'
import Timer from '../components/Timer'
import { BtnSubmit, BtnFrmline, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function RegisterCheck(props) {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [hpDisabled, setHpDisabled] = useState(true);
  const [mt_certify, setCertify] = useState(false);
  const [certno, setCertno] = useState('');
  const [certno_txt, setCertno_txt] = useState('');

	const [certLimit, setCertLimit] = useState(1);
	const [seconds, setSeconds] = useState(0);

	const [mt_id, setMt_id] = useState('');
  const [app_token, setApp_token] = useState('');

  const [act, setAct] = useState(props.route.params.act);
  const [headTitle, setHeadTitle] = useState('');
  const [findResult, setFindResult] = useState('');

  useEffect(()=>{
    setAct(props.route.params.act);
    if (props.route.params.act==='findpw') { setHeadTitle('비밀번호 찾기');
    } else if (props.route.params.act==='findid') { setHeadTitle('아이디 찾기');
    } else if (props.route.params.act==='update') { setHeadTitle('휴대폰번호 변경');
    } else if (props.route.params.act==='update2') { setHeadTitle('새 인증필요');
    } else {
      setHeadTitle('');
    }

    Auth_info();

    if (props.route.params.mt_id) {
      setMt_id(props.route.params.mt_id);
    }
    if (props.mt_id) {
      setMt_id(props.mt_id);
    }
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
      // BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  },[props.route.params]);
  
  //------------------------------------------------------------------
  const Send_certno = async (val) => {
    if (val) {
      var param = { mt_hp: val, act: props.route.params.act };
      if (mt_id) { param.mt_id = mt_id; }
      
      if (val.length < 10) {
        cusToast("휴대폰번호를 올바르게 입력해주세요.");
        return false;
      }
      setCertno_txt('');

      if (props.act==='update2') { param.act = 'update'; }
      console.log(param);
      
      var param1 = { mt_hp: val };
      // if (Platform.OS === 'android') {
      //   param1.hash = await SmsRetriever.getAppSignature();
      // }
      console.log(param1);

      // Api.send('member_hp_chk', param, (args1)=>{

      //   let resultItem1 = args1.resultItem;
      //   if (resultItem1.result === 'Y') {

      //     setSeconds(0);
      //     Api.send('member_sms_send', param1, (args)=>{
            
      //       let resultItem = args.resultItem;
      //       let arrItems = args.arrItems;
      //       if (resultItem.result === 'Y') {
      //         console.log(arrItems);
      //         setCertify(false);
      //         setCertno(arrItems.certno);
      //         setHpDisabled(false);
              
      //         setCertLimit(1);
              
      //         var sTimeout = "";
      //         clearTimeout(sTimeout);
      //         sTimeout = setTimeout(() => {
      //           setSeconds(300);
      //         }, 500);

      //         Platform.OS === 'android' && _onSmsListenerPressed();
      //       }
      //     });
      //   }
      // });
    } else {
      cusToast("휴대폰번호를 입력해주세요");
      return false;
    }
  }

  const Check_certno = async (values) => {
    console.log(values);
    console.log(certno, certno_txt);

    Keyboard.dismiss();
    if (certLimit===0) {
			cusToast('인증시간이 만료되었습니다. 재인증해주세요.');
			return false;
		}
    if (certno && certno*1===certno_txt*1) {
      var method = '';
      var param = { mt_hp: values.mt_hp, certno: certno_txt };
      param.mt_name = values.mt_name;
      if (act==='findid') {
        method = 'member_find_id';
      } else if (act==='findpw') {
        method = 'member_find_pwd';
        param.mt_id = values.mt_id;
        param.act = (mt_id ? 'update':'');
      } else {
        method = 'member_update_hp';
        param.mt_id = values.mt_id;
        param.act = 'update';
        param.mt_app_token = app_token;
      }
      console.log(method, param);
      setButtonDisabled(true);
      setPageLoading(true);

      Api.send(method, param, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setCertify(true);
          setSeconds(0);

          if (resultItem.message) {
            cusToast(resultItem.message);
          }
  
          if (act==='findid') {
            setPageLoading(false);
            setFindResult(arrItems.mt_id);
          } else if (act==='findpw') {
            setPageLoading(false);
            setFindResult(true);
            props.navigation.navigate('RegisterUpdatePwd', {temp_id: arrItems.mt_id, mt_hp: values.mt_hp});
          } else {
            setCertify(false);
            setCertLimit(1);

            setCertno('');
            setCertno_txt('');

            dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
            
            if (act==='update2') {
              member_login(arrItems);

              setTimeout(() => {
                setButtonDisabled(false);
                setPageLoading(false);
                props.navigation.navigate('Main', {modal: false});
              }, 500);
            } else {
              setButtonDisabled(false);
              setPageLoading(false);
              props.navigation.navigate('Myinfo');
            }
          }
        } else {

          if (resultItem.message==='member_login_history') {
            setIsCusAlertVisible(true);
            setCAtitle("");
            setCAmessage("로그인이 만료되었습니다.\n재로그인이 필요합니다.");
          } else {
            setButtonDisabled(false);
            setCertify(false);
            cusToast(resultItem.message);
          }
          
        }
      });
    } else {
      setCertify(false);
      cusToast('인증번호가 일치하지 않습니다');
      return false;
    }
  }
  //----------------------------------------------------------------------------
  const _onSmsListenerPressed = async () => {
    /*
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        const text = await SmsRetriever.addSmsListener((data) => {
          console.log(data);
          if (data.message !== undefined) {
            const search = data.message.search('장보고');
            const split = data.message.split('/');
            if (search !== -1) {
              return setTimeout(async () => {
                var sms_certno = split[0].replace(/[^0-9]/g, '');
                if (sms_certno) {
                  setCertno_txt(sms_certno);
                }
                await SmsRetriever.removeSmsListener();
              }, 1000);
            } else {
              SmsRetriever.removeSmsListener();
            }

            return data.message;
          }
        });
        // console.log('text ::::::', text);
        // console.log(`SMS Listener Registered: ${registered}`);
      }
    } catch (error) {
      console.log(error);
      console.log(`SMS Listener Error: ${JSON.stringify(error)}`);
    }
    */
  };
  //------------------------------------------------------------------
  const timeFinish = () => {
    console.log('Finished')
    setCertLimit(0);
    if (!mt_certify) {
      setHpDisabled(true);
    }
  }
  //----------------------------------------------------------------------------
  async function Auth_info() {
    // const token = await messaging().getToken();
    // setApp_token(token);
  }

  const [isCusAlertVisible, setIsCusAlertVisible] = useState(false);
  const [CAtitle, setCAtitle] = useState('');
  const [CAmessage, setCAmessage] = useState('');
  const CApress = (bool) => {
    setIsCusAlertVisible(false);
    if (bool) {
      props.navigation.navigate('Login', {});
    }
  }
  const member_login = async (arrItems) => {
    await AsyncStorage.setItem("mt_id", arrItems.mt_id);
    props.set_rconf('RegisterCheck', arrItems.mt_login_type==='1'?arrItems.mt_id:'', props.recommend);
  }
  //----------------------------------------------------------------------------
  const backAction = async (val) => {
    if (act==='update2') {
      await AsyncStorage.removeItem('mt_id');
      // Api.send('member_logout', { mt_id: (mt_id?mt_id:''), mt_app_token: app_token, temp_mt_id: props.temp_mt_id }, (args)=>{

      //   let resultItem = args.resultItem;
      //   let arrItems = args.arrItems;
      //   if (resultItem.result === 'Y') {
      //     dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
      //   }
      // });
      
      props.navigation.navigate('Login', {});
      return true;
    } else {
      props.navigation.goBack();
    }
  };

  return(
    <Container>
      <HeaderWrap title={headTitle} navigation={props.navigation} route={props.route} backAction={() => backAction(act)} right={'none'} />
      <Content style={styles.bg0}>
        <View style={[styles.contentWrap2]}>

          <Formik
        		enableReinitialize={true}
            initialValues={{
              w: (mt_id?true:false),
              act: (act==='findpw'&&!mt_id?false:true),
              mt_id: (mt_id?mt_id:''),
              mt_name: '',
              mt_hp: '',
            }}
            onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
              Check_certno(values);
            }}
            validationSchema={yup.object().shape({
              w: yup.boolean(),
              act: yup.boolean(),
              mt_hp: yup.string().required("휴대폰번호를 입력해주세요."),//.min(9, '9자리이상 입력해주세요.')
            })}
            >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
            <React.Fragment>

              {act==='update2'?
              <View style={{marginBottom: 33, marginTop: 40}}>
                <Text style={[styles.subTitle06, {textAlign: 'center'}]}>{'동일한 휴대폰번호로\n다른 사용자가 인증하였습니다.'}</Text>
                <View style={{marginBottom: 10}} />
                <Text style={[styles.text2, styles.clr2, {textAlign: 'center'}]}>{'다시 인증하거나 새로운 번호로 변경해 주세요.'}</Text>
              </View> : null}

              <View style={[styles.inputLabel0]}>
                <Text style={styles.subTitle00}>{'휴대폰 인증'}</Text>
              </View>
              <View style={styles.inputGroup0}>
                <View style={{flex: 1}}>
                  <TextInput style={[styles.textInput, {flex: 1, backgroundColor: (hpDisabled?'#fff':'#efefef')}]} placeholder={'휴대폰번호를 입력해주세요'}
                    autoCorrect={false} keyboardType='numeric' editable={hpDisabled}
                    onChangeText={handleChange('mt_hp')}
                    onBlur={() => setFieldTouched('mt_hp')}
                    value={values.mt_hp}
                  />
                </View>
                {findResult ? null :
                <View style={{width: 100, marginLeft: 10}}>
                  <BtnFrmline title={hpDisabled?'인증요청':'재전송'} onPress={() => Send_certno(values.mt_hp)} 
                  disabled={errors.mt_hp||values.mt_hp.length<10?true:false} 
                  style={[styles.btn_bg0, errors.mt_hp||values.mt_hp.length<10?styles.btn_bg5:null]} />
                </View>}
              </View>

              <View style={styles.inputGroup0}>
                <View style={[{flex: 1}, styles.rowVerticalCenterB, styles.bg2]}>
                  <View style={{flex: 1}}>
                    <TextInput style={[styles.textInput, {borderWidth: 0}]} placeholder={'인증번호를 입력해주세요'}
                      autoCorrect={false} keyboardType='numeric'
                      onChangeText={(val) => setCertno_txt(val)}
                      value={certno_txt+""}
                    />
                  </View>
                  {seconds ? <View style={{paddingRight: 12}}><Timer items={seconds} timeFinish={timeFinish.bind(this)} /></View> : null}
                </View>
              </View>

              {(errors.mt_hp) ? //touched.mt_hp && 
                <Text style={[styles.txtChkInfo, {marginTop: 0, marginBottom: 0}]}>{errors.mt_hp}</Text> : null}
              {(certLimit===1 && certno_txt && certno_txt!=certno) ?
                <Text style={[styles.txtChkInfo, {marginTop: 0, marginBottom: 0}]}>{'인증번호가 틀립니다.'}</Text> : null}
              {certLimit===0 ?
                <Text style={[styles.txtChkInfo, {marginTop: 0, marginBottom: 0}]}>{'인증시간이 지났습니다. 새로운 인증번호를 받으세요'}</Text> : null}

              {findResult ? null :
              <View style={[styles.btnConfirm]}>
                <BtnSubmit title={act==='update'?"변경":(act==='update2'?"인증완료":"다음")} onPress={handleSubmit} disabled={buttonDisabled} rightComponent={pageLoading ? <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 4 }} /> : null} />
              </View>}
          
            </React.Fragment>
            )}
          </Formik>

          {(findResult && act==='findid') ? 
          <View style={[styles.mt24]}>
            <Text style={[styles.text1, {textAlign: 'center'}]}>{'회원님의 아이디는'}{"\n"}<Text style={[styles.txtStrong, {fontWeight: 'bold'}]}> {findResult} </Text>{'입니다.'}</Text>
            <View style={[styles.btnConfirm, styles.mt24]}>
              <BtnSubmit title="로그인" onPress={() => props.navigation.navigate('Login', {})} />
            </View>
          </View> : null}

        </View>
      </Content>
      <CusAlert title={CAtitle} message={CAmessage} isVisible={isCusAlertVisible} onPress={CApress.bind(this)} btnName={CAtitle} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    temp_mt_id: state.sconf.temp_mt_id,
    recommend: state.rconf.recommend,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_rconf:(routeName, last_mt_id, recommend) => {
      dispatch(ActionCreator.updateRoute(routeName, last_mt_id, recommend));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCheck);

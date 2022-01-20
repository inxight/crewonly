import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Dimensions, Keyboard, Platform, Alert } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
// import messaging from '@react-native-firebase/messaging';

// import { appleAuthAndroid, appleAuth } from '@invertase/react-native-apple-authentication';
// import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

// import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
// import KakaoLogins from '@react-native-seoul/kakao-login';
import * as yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, SocialBtn, CusCheckbox, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

const naver_iosKeys = {
  kConsumerKey: "",
  kConsumerSecret: "",
  kServiceAppName: "",
  kServiceAppUrlScheme: "" // only for iOS
};

const naver_aosKeys = {
  kConsumerKey: "",
  kConsumerSecret: "",
  kServiceAppName: ""
};

function Login(props){
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);
  const [app_token, setApp_token] = useState('');
  const [secure, setSecure] = useState(true);

  const [loginLoading, setLoginLoading] = useState(false);

  const initials = Platform.OS === "ios" ? naver_iosKeys : naver_aosKeys;
  
  useEffect(() => {
    Auth_info();
    //----------------------------------------------------------------------
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  async function Auth_info() {
    // const token = await messaging().getToken();
    // setApp_token(token);
  }

  const onPressNav = (scrName, param) => {
    props.navigation.navigate(scrName, param);
  };

  //----------------------------------------------------------------------------
  const socialCheckApi = async (type, id, name, email) => {
    try {
      var param = { mt_app_token: app_token, mt_id: id, mt_login_type: type, mt_name: (name?name:''), mt_email: (email?email:'') };
      if (props.route.params.screen==='PaymentWrite') {
        param.ct_idx = props.route.params.param.ct_idx;
        param.temp_mt_id = props.temp_mt_id;
      }

      var args = {
        resultItem: {result: 'Y'},
        arrItems: {
          mt_id: id, mt_level: 2, mt_login_type: type, cart_cnt: 0, cart_sum: 0
          , mt_name: (name?name:''), mt_email: (email?email:'')
        }
      };
      // Api.send('member_login_social', param, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          cusToast(type+" SNS로그인되었습니다.");
          Submit_frm(arrItems, true);
        } else {
          console.log("member_login_social Fail");
        }
      // });
    } catch (e) {
      console.log(e);
    }
  };
  //----------------------------------------------------------------------------
  // Apple Login
  const appleLogin = async () => {
    /*
    try {
      Keyboard.dismiss();
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,        
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });      

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      if(credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken, user} = appleAuthRequestResponse;
        await socialCheckApi('apple', user); 
      }
    }
    catch(err) {
      if (err.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(err);
        alert('Fail Apple Login.');
      }
    }
    */
  }
  const appleLogin_aos = async() => {
    Keyboard.dismiss();
    /*
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();
    try {
      // Configure the request
      appleAuthAndroid.configure({
        clientId: '', // identify -> serviceID 에서 설정
        redirectUri: '',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });
      // Open the browser window for user sign in
      const response = await appleAuthAndroid.signIn();
      console.log("user..", response);
      await socialCheckApi('apple', response.code);
      // Send the authorization code to your backend for verification
    }
    catch(err) {
      console.log(err);
    }
    */
  }
  //----------------------------------------------------------------------------
  const naverLogin = async () => {
    try {
      Keyboard.dismiss();
      /*
      NaverLogin.logout();
      NaverLogin.login(initials, (err, token) => {
        console.log(token);
        if (err) {
          return;
        } else {
          naverProfile(token);
        }
      });
      */
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
  const naverProfile = async (token) => {
    /*
    const profileResult = await getProfile(token.accessToken);
    console.log("profileResult", profileResult);
    if (profileResult.resultcode === "024") {
      cusToast("로그인 실패", profileResult.message);
      return false;
    }
    await socialCheckApi('naver', profileResult.response.id, profileResult.response.name, profileResult.response.email);
    */
  }
  //----------------------------------------------------------------------------
  // kakao Login
  const kakaoLogin = async () => {
    try {
      Keyboard.dismiss();
      /*
      KakaoLogins.login()
      .then(result1 => {
        logCallback(
          `Login Finished:${JSON.stringify(result1)}`,
          setLoginLoading(false),
        );

        KakaoLogins.getProfile()
        .then(async result => {
          console.log("profile..", result);
          if (result.id && result.id != undefined) {
            await socialCheckApi('kakao', result.id); 
          } else {
            cusToast('재시도 해주세요');
          }
        })
        .catch(err => {
          logCallback(`Get Profile Failed:${err.code} ${err.message}`, setLoginLoading(false));
        });
        
      })
      .catch(err1 => {
        if (err1.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err1.message}`, setLoginLoading(false));
        } else {
          logCallback(`Login Failed:${err1.code} ${err1.message}`, setLoginLoading(false));
        }
      });
      */
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
  //----------------------------------------------------------------------------
  const logCallback = (log, callback) => {
    console.log(log);
    callback;
  };
  //----------------------------------------------------------------------------
  const Submit_frm = async (arrItems, autoL) => {
    if ((arrItems.mt_hp && !arrItems.mt_certify) || arrItems.mt_new_certify) {
      props.navigation.navigate('RegisterCheck', {act: 'update2', mt_id: arrItems.mt_id});
    } else {
      //--------------------------------------------------------------------------
      if (autoL) {
        await AsyncStorage.setItem("mt_id", arrItems.mt_id);
      }
      dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
      props.set_rconf('Login', arrItems.mt_login_type==='1'?arrItems.mt_id:'', props.recommend);
      
      goMain(arrItems);
    }
  }
  
  const goMain = (arrItems) => {
    if (arrItems.mt_level===0 && arrItems.mt_login_type) {
      // props.navigation.navigate('Register', {});
      props.navigation.navigate('Main', {});
    } else {

      var screen = 'Main';
      var screenParams = {};
      if (props.route.params.screen) {
        screen = props.route.params.screen;
        screenParams = props.route.params.param;
        
        const resetAction = CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Main', params: {modal: false} },
            { name: screen, params: screenParams },
          ],
        });
        props.navigation.dispatch(resetAction);

      } else {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Main', params: {} },
          ],
        });
        props.navigation.dispatch(resetAction);
      }
    }
  }

  // const initialValues = { mt_id: props.last_mt_id, mt_pwd: '' };
  const initialValues = { mt_id: 'test1', mt_pwd: '1016' };

  return(
    <Container>
      <HeaderWrap title={'로그인'} navigation={props.navigation} route={props.route} right={'none'} />
      <Content>
        <View style={{alignItems: 'center', paddingTop: 40, paddingBottom: 20}}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, setFieldValue, setValues, resetForm }) => {
              Keyboard.dismiss();
              setButtonDisabled(true);
              var param = { mt_app_token: app_token, mt_id: values.mt_id, mt_pwd: values.mt_pwd, mt_level: '2' };
              if (props.route.params.screen==='PaymentWrite') {
                param.ct_idx = props.route.params.param.ct_idx;
                param.temp_mt_id = props.temp_mt_id;
              }
              
              var args = {
                resultItem: {result: 'Y'},
                arrItems: {
                  mt_id: values.mt_id, mt_level: 2, mt_login_type: '1', cart_cnt: 0, cart_sum: 0
                }
              };
              // Api.send('member_login', param, (args)=>{

                let resultItem = args.resultItem;
                let arrItems = args.arrItems;
                if (resultItem.result === 'Y') {
                  setButtonDisabled(false);
                  Submit_frm(arrItems, autoLogin);
                  resetForm({values: initialValues});
                } else {
                  setButtonDisabled(false);
                }
              // });
            }}
            validationSchema={yup.object().shape({
              mt_id: yup
              .string()
              .required('휴대폰번호를 입력해주세요.'),
              mt_pwd: yup
              .string()
              .required('비밀번호를 입력해주세요.'),
            })}
            >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
            <React.Fragment>
              <View style={[styles.login_btnGroup2, {marginBottom: 10}]}>
                <TextInput style={[styles.textInput, styles.textInput2]} placeholder={'휴대폰번호를 입력해주세요'}
                  keyboardType='numeric'
                  onChangeText={handleChange('mt_id')}
                  onBlur={() => setFieldTouched('mt_id')}
                  value={values.mt_id}
                />
                {values.mt_id ? 
                <TouchableOpacity onPress={() => setFieldValue('mt_id', '')} style={styles.textInputIcn} activeOpacity={1}>
                  <View style={styles.container1}>
                    <Icon name={'x'} size={18} color={'#333'} />
                  </View>
                </TouchableOpacity> : null}
              </View>
              {touched.mt_id && errors.mt_id &&
                <View style={[styles.login_btnGroup2]}><Text style={[styles.txtChkInfo]}>{errors.mt_id}</Text></View>}

              <View style={[styles.login_btnGroup2, {marginBottom: 10}]}>
                <TextInput style={[styles.textInput, styles.textInput2]} placeholder={'비밀번호를 입력해주세요'}
                  secureTextEntry={secure}
                  onChangeText={handleChange('mt_pwd')}
                  onBlur={() => setFieldTouched('mt_pwd')}
                  value={values.mt_pwd}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.textInputIcn} activeOpacity={1}>
                  <View style={styles.container1}>
                    <Icon name={secure?'eye-off':'eye'} size={18} color={'#333'} />
                  </View>
                </TouchableOpacity>
              </View>
              {touched.mt_pwd && errors.mt_pwd &&
                <View style={[styles.login_btnGroup2]}><Text style={[styles.txtChkInfo]}>{errors.mt_pwd}</Text></View>}

              <View style={[styles.login_btnGroup2]}>
                <BtnSubmit title={"로그인"} onPress={handleSubmit} disabled={buttonDisabled}
                style={[(!values.mt_id || !values.mt_pwd || (touched.mt_id && errors.mt_id) || (touched.mt_pwd && errors.mt_pwd))?styles.btn_bg2:styles.btn_bg1]} />
              </View>

              {/* <View style={[styles.login_btnGroup2]}>
                <CusCheckbox check={autoLogin} name={'자동로그인'} onPress={()=> setAutoLogin(!autoLogin)} cusStyle={{alignItems: 'flex-end'}} />
              </View> */}

              <View style={[styles.rowVerticalCenter, {marginTop: 12, marginBottom: 10}]}>
                <TouchableOpacity style={[styles.login_btnGroup, {padding: 10, letterSpacing: -0.4}]}
                  onPress={() => onPressNav('Register', {})}><Text style={[styles.text7, styles.txtStrong, {textAlign: 'center'}]}>{'회원가입'}</Text>
                </TouchableOpacity>
                <Text style={{color: '#ddd', fontSize: 12}}>|</Text>
                <TouchableOpacity style={[styles.login_btnGroup, {padding: 10, letterSpacing: -0.4}]}
                  onPress={() => onPressNav('RegisterCheck', {act: 'findpw'})} ><Text style={[styles.text7, {textAlign: 'center'}]}>{'비밀번호 찾기'}</Text>
                </TouchableOpacity>
              </View>
              
            </React.Fragment>
            )}
          </Formik>

          <View style={[styles.login_btnGroup2, styles.rowVerticalCenterB, {marginTop: 48}]}>
            <View style={{flex: 1, backgroundColor: '#ccc', height: 1}} />
            <View style={{marginHorizontal: 6}}><Text style={[styles.ff1m, {textAlign: 'center', color: '#999', fontSize: 13}]}>{'SNS 계정으로 로그인'}</Text></View>
            <View style={{flex: 1, backgroundColor: '#ccc', height: 1}} />
          </View>

          <View style={[styles.contentWrap4, styles.rowVerticalCenterB, {marginHorizontal: 10}]}>
            <SocialBtn title={''/*'카카오로 로그인'*/} onPress={() => kakaoLogin()} 
              leftComponent={(<Image source={require('./../images/sns_kakao.png')} style={[styles.imgContain]} />)} />
            <SocialBtn title={''/*'네이버로 로그인'*/} onPress={() => naverLogin()} 
              leftComponent={(<Image source={require('./../images/sns_naver.png')} style={[styles.imgContain]} />)} />
            {//Platform.OS==='ios' && appleAuth.isSupported ?
            <SocialBtn title={''/*'Apple로 로그인'*/} onPress={() => appleLogin()} 
              leftComponent={(<Image source={require('./../images/sns_apple.png')} style={[styles.imgContain]} />)} />// : null
            }
            {/* {Platform.OS==='android' && appleAuthAndroid.isSupported ?
            <SocialBtn title={''} onPress={() => appleLogin_aos()} 
              leftComponent={(<Image source={require('./../images/sns_apple.png')} style={[styles.imgContain]} />)} /> : null} */}
          </View>
        </View>
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    last_mt_id: state.rconf.last_mt_id,
    recommend: state.rconf.recommend,
    
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_rconf:(routeName, last_mt_id, recommend) => {
      dispatch(ActionCreator.updateRoute(routeName, last_mt_id, recommend));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

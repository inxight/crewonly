import React, { Component, useEffect, useState, useRef } from 'react';
import { ScrollView, View, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert, Dimensions, Keyboard, Platform } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Footer, FooterTab } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import AsyncStorage from '@react-native-community/async-storage';
import ModalSelector from 'react-native-modal-selector';
// import SmsRetriever from 'react-native-sms-retriever';
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import Timer from '../components/Timer'

import { BtnSubmit, BtnFrmline, CusCheckbox, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

//------------------------------------------------------------------------------
function Register(props) {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const step = 2;

  const [mt_id_dup, setId_dup] = useState(false);
  const [mt_id_dup_error, setId_dup_error] = useState('');
  const [certno, setCertno] = useState('');
  const [certno_txt, setCertno_txt] = useState('');
  const [mt_certify, setCertify] = useState(false);
  const [edit_hp, setEdit_hp] = useState(props.mt_hp ? false : true);
  const [hpDisabled, setHpDisabled] = useState(true);

	const [certLimit, setCertLimit] = useState(1);
	const [seconds, setSeconds] = useState(0);

  const [mt_birth_y, setBirthY] = useState('2000');
  const [mt_birth_m, setBirthM] = useState('01');
  const [mt_birth_d, setBirthD] = useState('01');

  const [app_token, setApp_token] = useState('');
  
  //----------------------------------------------------------------------------
  const yearArr = [];
  for (var i=0;i<80;i++) {
    yearArr.push(new Date().getFullYear()-i);
  }
  const yearArr_option = yearArr.map((arr, index) => {
    return { key: index, label: arr+'' }
  });

  const monthArr = [];
  for (var i=1;i<=12;i++) {
    monthArr.push(i<10?'0'+i:i);
  }
  const monthArr_option = monthArr.map((arr, index) => {
    return { key: index, label: arr+'' }
  });

  const dateArr = [];
  for (var i=1;i<=31;i++) {
    dateArr.push(i<10?'0'+i:i);
  }
  const dateArr_option = dateArr.map((arr, index) => {
    return { key: index, label: arr+'' }
  });
  
  useEffect(()=>{
    mounted.current = true;
    //----------------------------------------------------------------------
    if (mounted.current) {
      
      Auth_info();
      if (props.mt_id && props.mt_level>1) {
        // Api.send('member_info', {mt_id: props.mt_id}, (args)=>{
          
        //   let resultItem = args.resultItem;
        //   let arrItems = args.arrItems;
        //   if (resultItem.result === 'Y' && arrItems) {
        //     setCertify(arrItems.mt_certify?true:false);
        //     setHpDisabled(arrItems.mt_hp?false:true);
            
        //     setBirthY(arrItems.mt_birth_y);
        //     setBirthM(arrItems.mt_birth_m);
        //     setBirthD(arrItems.mt_birth_d);
        //   }
        // });
      }
    }
    return () => {
      mounted.current = false;
    };
  },[]);
  //----------------------------------------------------------------------------
  async function Auth_info() {
    // const token = await messaging().getToken();
    // setApp_token(token);
  }

  const Submit_frm = async (values) => {
    var params = { mt_id: (props.mt_id?props.mt_id:values.mt_id), certno: certno_txt
      , mt_pwd: values.mt_pwd
      , mt_name: values.mt_name, mt_nick: values.mt_nick, mt_hp: values.mt_hp, mt_email: values.mt_email
      , mt_birth: mt_birth_y+'-'+mt_birth_m+'-'+mt_birth_d };
    Keyboard.dismiss();

    if (props.mt_id && props.mt_level>1) {

      setButtonDisabled(true);
      // Api.send('member_update', params, (args)=>{

      //   let resultItem = args.resultItem;
      //   let arrItems = args.arrItems;
      //   if (resultItem.result === 'Y') {
      //     arrItems.updateTime = Api.formatDateTime(new Date(),'YmdHis');
      //     dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));

          const resetAction = CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Main', params: {reload: true} },
            ],
          });
          props.navigation.dispatch(resetAction);
      //   } else {
      //     setButtonDisabled(false);
      //   }
      // });
    } else {
      if (!mt_certify) {
        cusToast('휴대폰인증을 진행해주세요');
        return false;
      }
      
      if (mt_id_dup===true) {
        cusToast(mt_id_dup_error);
        return false;
      }

      params.mt_level = 2;//props.mt_level;
      params.mt_app_token = app_token;
      params.mt_login_type = props.mt_login_type;
      console.log(params);

      setButtonDisabled(true);

      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Login', params: {} },
          { name: 'RegisterResult', params: {mt_id: (props.mt_id?props.mt_id:values.mt_id), mt_name: values.mt_name} },
        ],
      });
      props.navigation.dispatch(resetAction);

      // Api.send('member_join', params, (args)=>{

      //   let resultItem = args.resultItem;
      //   let arrItems = args.arrItems;
      //   if (resultItem.result === 'Y') {
      //     setId_dup(false);
      //     setId_dup_error('');
          
      //     props.set_rconf('Register', arrItems.mt_login_type==='1'?arrItems.mt_id:'');
      //     //--------------------------------------------------------------------------
      //     var screen = 'Main';
      //     var screenParams = {};
      //     if (props.route.params.screen) {
      //       screen = props.route.params.screen;
      //       screenParams = props.route.params.param;
      //       cusToast("회원가입이 완료되었습니다.");
            
      //       const resetAction = CommonActions.reset({
      //         index: 1,
      //         routes: [
      //           { name: 'Main', params: {reload: true} },
      //           { name: screen, params: screenParams },
      //         ],
      //       });
      //       props.navigation.dispatch(resetAction);
      //     } else {
      //       const resetAction = CommonActions.reset({
      //         index: 1,
      //         routes: [
      //           { name: 'Login', params: {} },
      //           { name: 'RegisterResult', params: {mt_id: arrItems.mt_id, mt_name: arrItems.mt_name} },
      //         ],
      //       });
      //       props.navigation.dispatch(resetAction);
      //     }
      //   } else {
      //     if (arrItems.duplicate) {
      //       setId_dup(arrItems.duplicate?true:false);
      //       setId_dup_error(arrItems.duplicate_msg);
      //     }
      //     setButtonDisabled(false);
      //   }
      // });
    }
  }
  //----------------------------------------------------------------------------
  const Check_id = (val, chk) => {
    if (chk) {
      if (!val) {
        cusToast('아이디를 입력해주세요');
        return false;
      }
    }
    // Api.send('member_id_chk', {mt_id: val}, (args)=>{

    //   let resultItem = args.resultItem;
    //   let arrItems = args.arrItems;
    //   if (resultItem.result === 'Y') {
    //     console.log(arrItems);
    //     setId_dup(arrItems.duplicate?true:false);
    //     setId_dup_error(arrItems.duplicate_msg);
    //   } else {
    //     setId_dup(true);
    //     setId_dup_error(resultItem.message);
    //   }
    // });
  }

  const Send_certno = async (mt_hp) => {
    if (mt_hp) {
      Keyboard.dismiss();

      var params = { mt_hp: mt_hp, mt_level: 2 };
      if (props.mt_id) {
        params.act = 'update';
        params.mt_id = props.mt_id;
      }
      // Api.send('member_hp_chk', params, (args)=>{

      //   let resultItem = args.resultItem;
      //   let arrItems = args.arrItems;
      //   if (resultItem.result === 'Y') {
      //     Send_certno_modal(mt_hp);
      //   }
      // });
    } else {
      cusToast('휴대폰번호를 입력해주세요');
      return false;
    }
  }

  const Send_certno_modal = async (val) => {
    setSeconds(0);

    var param1 = { mt_hp: val };
    // if (Platform.OS === 'android') {
    //   param1.hash = await SmsRetriever.getAppSignature();
    // }
    console.log(param1);
    // Api.send('member_sms_send', param1, (args)=>{

    //   let resultItem = args.resultItem;
    //   let arrItems = args.arrItems;
    //   if (resultItem.result === 'Y') {
    //     console.log(arrItems);
    //     setCertify(false);
    //     setCertno(arrItems.certno);
    //     setHpDisabled(false);

    //     setCertLimit(1);

    //     var sTimeout = "";
    //     clearTimeout(sTimeout);
    //     sTimeout = setTimeout(() => {
    //       setSeconds(300);
    //     }, 500);

    //     Platform.OS === 'android' && _onSmsListenerPressed(arrItems.certno, 1); /// 실행할때 true 값 전달 받아야됨
    //   }
    // });
  }

  const Check_certno = (no, txt, climit) => {
    var cno = no ? no : certno;
    var ctxt = txt ? txt : certno_txt;
    var clmt = climit ? climit : certLimit;
		console.log(cno, ',', ctxt, ',', clmt);
    if (clmt===0) {
      setCertify(false);
			cusToast('인증시간이 만료되었습니다. 재인증해주세요.');
			return false;
		}
    if (cno && cno*1===ctxt*1) {
      Keyboard.dismiss();

      setCertify(true);
      setSeconds(0);
    } else {
      setCertify(false);
      cusToast('인증번호가 일치하지 않습니다');
      return false;
    }
  }
  //----------------------------------------------------------------------------
  const _onSmsListenerPressed = async (cno, clmt) => {
    /*
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        const text = await SmsRetriever.addSmsListener((data) => {
          console.log(data);
          if (data.message !== undefined) {
            const search = data.message.search(props.aname);
            const split = data.message.split('/');
            if (search !== -1) {
              return setTimeout(async () => {
                var sms_certno = split[0].replace(/[^0-9]/g, '');
                if (sms_certno) {
                  setCertno_txt(sms_certno);
                  Check_certno(cno, sms_certno, clmt);
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

  return(
    <Container>
      <HeaderWrap title={props.mt_id?"회원 정보수정":""} navigation={props.navigation} route={props.route} right={'none'} />
      <Formik
        initialValues={{
          w: (props.mt_id?true:false),
          mt_id: (props.mt_id?props.mt_id:''),
          mt_pwd: '',
          mt_pwd_re: '',
          mt_name: (props.mt_name?props.mt_name:''),
          mt_nick: (props.mt_nick?props.mt_nick:''),
          mt_hp: (props.mt_hp?props.mt_hp.replace(/-/gi,''):''),
          mt_email: (props.mt_email?props.mt_email:''),
        }}
        onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
          if (!values.w) {
            if (values.mt_id=='') {
              cusToast('아이디를 입력해주세요.');
              return false;
            }
          }
          // if (values.w===false) {
          //   values.mt_id = values.mt_hp;
          // }
          if (values.mt_hp.length<10) {
            cusToast('휴대폰번호를 10자리이상 입력해주세요.');
            return false;
          }
          if (values.mt_hp=='') {
            cusToast('휴대폰번호를 입력해주세요.');
            return false;
          }

          Submit_frm(values);
        }}
        validationSchema={yup.object().shape({
          w: yup.boolean(),
          mt_id: yup.string().trim().when('w', {
            is: false,
            then: yup.string().min(3, '최소 3자이상 입력해주세요.').max(32, '최대 32자이하 입력해주세요.')
            .required('아이디를 입력해주세요')
          }),
          mt_pwd: yup.string().when('w', {
            is: false,
            then: yup.string().required('비밀번호는 8자 이상의 영문 및 숫자 조합 사용')
            .min(8, '비밀번호는 8자 이상의 영문 및 숫자 조합 사용')
            .matches(
              /^((?=.*[A-Za-z])(?=.*\d))/,
              "비밀번호는 8자 이상의 영문 및 숫자 조합 사용"
            )
          }),
          mt_pwd_re: yup.string().when('w', {
            is: false,
            then: yup.string().required('비밀번호를 한번더 입력해주세요.')
            .oneOf([yup.ref('mt_pwd'), null], '비밀번호가 일치하지 않습니다.')
          }),
          mt_name: yup.string().trim().required("이름을 입력해주세요."),
          mt_email: yup.string().trim().email('이메일 양식으로 입력해주세요.').required("이메일을 입력해주세요."),
          mt_hp: yup.string().required("휴대폰번호를 입력해주세요."),//.min(9, '9자리이상 입력해주세요.')
        })}
        >
        {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit, setFieldValue, setValues }) => (
        <React.Fragment>
          
          <Content ref={c => { global.appContent = c; }} enableResetScrollToCoords={false}>
            
            <View style={[styles.contentWrap3, {paddingBottom: 10}]}>
              {!props.mt_id &&
              <View>
                <View style={[styles.inputLabel0]}>
                  <Text style={styles.subTitle00}>{'아이디'}</Text>
                </View>
                <View style={[styles.inputGroup0]}>
                  <View style={{flex: 1}}>
                    <TextInput style={[styles.textInput]} placeholder={'아이디를 입력해주세요'} placeholderTextColor={'#555'}
                      autoCorrect={false}
                      onChangeText={(val) => { setFieldValue('mt_id', val); /*Check_id(val)*/setId_dup(false); setId_dup_error(''); }}
                      onBlur={() => {setFieldTouched('mt_id'); Check_id(values.mt_id) }}
                      value={values.mt_id}
                    />
                  </View>
                  <View style={{width: 100, marginLeft: 10}}>
                    <BtnFrmline title={'중복확인'} onPress={() => Check_id(values.mt_id, 'check')} style={styles.btn_bg1} />
                  </View>
                </View>
                
                {(touched.mt_id && errors.mt_id) ? <Text style={styles.txtChkInfo}>{errors.mt_id}</Text>
                : mt_id_dup_error ? <Text style={styles.txtChkInfo}>{mt_id_dup_error}</Text>
                : (!mt_id_dup_error && !mt_id_dup && values.mt_id) ? <Text style={styles.txtChkInfo}>{'사용가능한 아이디입니다'}</Text>
                : null}
              </View>}

              {props.mt_id && props.mt_level>1 ? null:
              (props.mt_login_type==='1'?
              <View>
                <View style={[styles.inputLabel0]}>
                  <Text style={styles.subTitle00}>{'비밀번호'}</Text>
                </View>
                <View style={styles.inputGroup0}>
                  <View style={[styles.rowVerticalCenter, {flex: 1}]}>
                    <TextInput style={styles.textInput} placeholder={'비밀번호 입력'} placeholderTextColor={'#555'}
                      autoCorrect={false} secureTextEntry={true}
                      onChangeText={handleChange('mt_pwd')}
                      onBlur={() => {setFieldTouched('mt_pwd')}}
                    />
                  </View>
                  <View style={{marginHorizontal: 6}} />
                  <View style={[styles.rowVerticalCenter, {flex: 1}]}>
                    <TextInput style={styles.textInput} placeholder={'비밀번호 확인 입력'} placeholderTextColor={'#555'}
                      autoCorrect={false} secureTextEntry={true}
                      onChangeText={handleChange('mt_pwd_re')}
                      onBlur={() => {setFieldTouched('mt_pwd_re')}}
                    />
                  </View>
                </View>
                {((touched.mt_pwd && errors.mt_pwd) || (touched.mt_pwd_re && errors.mt_pwd_re)) ?
                  <Text style={[styles.txtChkInfo, {marginTop: 0}]}>{errors.mt_pwd ? errors.mt_pwd :errors.mt_pwd_re}</Text> : null}
              </View> : null)}
              
              <View style={[styles.inputLabel0]}>
                <Text style={styles.subTitle00}>{'이메일 주소'}</Text>
              </View>
              <View style={styles.inputGroup0}>
                <TextInput style={styles.textInput} placeholder={'주로 사용하는 이메일 주소를 입력해주세요.'} placeholderTextColor={'#555'}
                  autoCorrect={false} maxLength={30}
                  onChangeText={handleChange('mt_email')}
                  onBlur={() => setFieldTouched('mt_email')}
                  value={values.mt_email}
                />
              </View>
              
              {touched.mt_email && errors.mt_email &&
                <Text style={styles.txtChkInfo}>{errors.mt_email}</Text>
              }

              <View style={[styles.inputLabel0]}>
                <Text style={styles.subTitle00}>{'이름'}</Text>
              </View>
              <View style={styles.inputGroup0}>
                <TextInput style={styles.textInput} placeholder={'본인 실명을 입력해주세요.'} placeholderTextColor={'#555'}
                  autoCorrect={false} maxLength={30}
                  onChangeText={handleChange('mt_name')}
                  onBlur={() => setFieldTouched('mt_name')}
                  value={values.mt_name}
                />
              </View>
              
              {touched.mt_name && errors.mt_name &&
                <Text style={styles.txtChkInfo}>{errors.mt_name}</Text>
              }

              <View style={[styles.inputLabel0]}>
                <Text style={styles.subTitle00}>{'생년월일'}</Text>
              </View>
              <View style={styles.inputGroup0}>
                <ModalSelector
                  data={yearArr_option} initValue=""
                  accessible={true} backdropPressToClose={true}
                  cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1}} overlayStyle={styles.selectBox1}
                  onChange={(option)=>{ setBirthY(option.label); }}>
                  <TextInput style={styles.textInput} placeholder={'년도'} placeholderTextColor={'#555'}
                    value={mt_birth_y}
                    autoCorrect={false} editable={false}
                  />
                  <Icon name={'chevron-down'} style={styles.selectBoxIcn} />
                </ModalSelector>
                <View style={{flex: 0.05}}></View>
                <ModalSelector
                  data={monthArr_option} initValue=""
                  accessible={true} backdropPressToClose={true}
                  cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1}} overlayStyle={styles.selectBox1}
                  onChange={(option)=>{ setBirthM(option.label); }}>
                  <TextInput style={styles.textInput} placeholder={'월'} placeholderTextColor={'#555'}
                    value={mt_birth_m}
                    autoCorrect={false} editable={false}
                  />
                  <Icon name={'chevron-down'} style={styles.selectBoxIcn} />
                </ModalSelector>
                <View style={{flex: 0.05}}></View>
                <ModalSelector
                  data={dateArr_option} initValue=""
                  accessible={true} backdropPressToClose={true}
                  cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1}} overlayStyle={styles.selectBox1}
                  onChange={(option)=>{ setBirthD(option.label); }}>
                  <TextInput style={styles.textInput} placeholder={'일'} placeholderTextColor={'#555'}
                    value={mt_birth_d}
                    autoCorrect={false} editable={false}
                  />
                  <Icon name={'chevron-down'} style={styles.selectBoxIcn} />
                </ModalSelector>
              </View>
              
              {//props.mt_id && props.mt_level>1 ? null :
              <View>
                <View style={[styles.inputLabel0]}>
                  <Text style={styles.subTitle00}>{"휴대폰번호"}</Text>
                  {/* <Text style={[styles.text5, styles.txtStrong, {marginLeft: 6}]}>{'숫자만 입력'}</Text> */}
                </View>
                <View style={[styles.inputGroup0]}>
                  <View style={{flex: 1}}>
                    <TextInput style={[styles.textInput, {backgroundColor: (hpDisabled?'#fff':'#efefef')}]}
                      placeholder={'휴대폰번호를 입력해주세요'} placeholderTextColor={'#555'}
                      autoCorrect={false} keyboardType='numeric' editable={hpDisabled}
                      onChangeText={handleChange('mt_hp')}
                      onBlur={() => setFieldTouched('mt_hp')}
                      value={values.mt_hp}
                    />
                  </View>
                  <View style={{width: 100, marginLeft: 10}}>
                    {edit_hp ? <BtnFrmline title={hpDisabled?'인증요청':'재전송'} onPress={() => Send_certno(values.mt_hp)} 
                    disabled={errors.mt_hp||values.mt_hp.length<10?true:false}
                    style={[styles.btn_bg0, errors.mt_hp||values.mt_hp.length<10?styles.btn_bg5:null]} />
                    : <BtnFrmline title={'변경'} onPress={() => { setEdit_hp(true); setHpDisabled(true); }} />}
                  </View>
                </View>

                {edit_hp ? 
                <View style={[styles.inputGroup0]}>
                  <View style={[{flex: 1}, styles.rowVerticalCenterB]}>
                    <View style={{flex: 1}}>
                      <TextInput style={[styles.textInput]} placeholder={'인증번호 입력'} placeholderTextColor={'#555'}
                        autoCorrect={false} keyboardType='numeric'
                        onChangeText={(val) => setCertno_txt(val)}
                        value={certno_txt+""}
                      />
                    </View>
                    {seconds ? <View style={[styles.rowVerticalCenter, {paddingRight: 12}]}>
                      {/* <Text style={[styles.text6, styles.ff2l, styles.txtStrong]}>{'남은시간'}</Text> */}
                      <Timer items={seconds} timeFinish={timeFinish.bind(this)} /></View> : null}
                  </View>
                  <View style={{width: 100, marginLeft: 10}}>
                    <BtnFrmline title={mt_certify?'인증완료':'인증확인'} onPress={() => Check_certno()}
                    disabled={certno_txt===""?true:mt_certify} />
                  </View>
                </View> : null}

                {/* <Text style={styles.text4}>{'제한 시간(5분) 내에 인증번호를 입력해 주세요'}</Text> */}

                {(touched.mt_hp && errors.mt_hp) &&
                  <Text style={[styles.txtChkInfo, {marginTop: 0, marginBottom: 0}]}>{errors.mt_hp}</Text>}
                {(certLimit===1 && certno_txt && certno_txt!=certno) ?
                  <Text style={[styles.txtChkInfo, {marginTop: 0, marginBottom: 0}]}>{'인증번호가 틀립니다.'}</Text> : null}
                {certLimit===0 ?
                  <Text style={[styles.txtChkInfo, {marginTop: 0, marginBottom: 0}]}>{'인증시간이 지났습니다. 새로운 인증번호를 받으세요'}</Text> : null}
                {/* <View style={{marginBottom: 10}} /> */}
              
              </View>}

            </View>

            <View style={styles.contentWrap4}>
              {props.mt_id?
              <TouchableOpacity style={[styles.login_btnGroup]}
                onPress={() => props.navigation.navigate('RegisterConfirm', {})}>
                <Text style={[styles.text7, {textDecorationLine: 'underline', textAlign: 'center'}]}>{props.aname+' 탈퇴하기'}</Text>
              </TouchableOpacity>
              : null}
              
              <BtnSubmit title={props.mt_id?("수정하기"):("회원가입")} onPress={handleSubmit} disabled={buttonDisabled} style={[styles.btn_bg1]} />
            </View>

          </Content>

        </React.Fragment>
      )}
      </Formik>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
    mt_nick: state.login.mt_nick,
    mt_hp: state.login.mt_hp,
    mt_email: state.login.mt_email,
    mt_login_type: state.login.mt_login_type,
    updateTime: state.login.updateTime,

    aname: state.sconf.aname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_rconf:(routeName, last_mt_id) => {
      dispatch(ActionCreator.updateRoute(routeName, last_mt_id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

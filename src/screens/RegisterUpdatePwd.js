import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, Dimensions, Alert, Keyboard } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button, CheckBox } from 'native-base';
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

//------------------------------------------------------------------------------
function RegisterUpdatePwd(props) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [temp_id, setTempId] = useState('');
  //----------------------------------------------------------------------------
  useEffect(()=>{
    setTempId(props.mt_id?props.mt_id:props.route.params.temp_id);
  },[props.route.params]);
  
  const Submit_frm = async (values) => {
    if (!values.mt_pwd) {
      cusToast("비밀번호를 입력해주세요");
      return false;
    }
    if (values.mt_pwd && values.mt_pwd!==values.mt_pwd_re) {
      cusToast("비밀번호 확인이 일치하지 않습니다");
      return false;
    }

    var params = { mt_id: temp_id, mt_pwd: values.mt_pwd, mt_pwd_re: values.mt_pwd_re, act: 'pwd', login_status: (props.mt_id?'1':'0') };
    console.log(params);
    Keyboard.dismiss();
    setButtonDisabled(true);
    Api.send('member_update', params, (args)=>{

      let resultItem = args.resultItem;
      if (resultItem.result === 'Y') {
        if (resultItem.message) {
          cusToast(resultItem.message);
        }
      
        if (props.mt_id) {
          props.navigation.navigate('Mypage', {});
        } else {
          props.navigation.navigate('Login', {});
        }
        
      } else {
        setButtonDisabled(false);
      }
    });
  }
  //----------------------------------------------------------------------------
  
  return(
    <Container>
      <HeaderWrap title={"비밀번호 재설정"} navigation={props.navigation} route={props.route} right={'none'} />
      <Content>
        <View style={styles.contentWrap2}>
          
          <View style={[styles.mt24, styles.subTitleWr]}>
            <Text style={styles.subTitle00}>{'새로운 비밀번호'}</Text>
          </View>
          
          <Formik
            initialValues={{ mt_pwd: '', mt_pwd_re: '' }}
            onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
              Submit_frm(values);
            }}
            validationSchema={yup.object().shape({
              mt_pwd: yup.string().required('비밀번호를 입력해주세요.')
              .min(6, '6자리이상 입력해주세요.')
              .matches(
                /^((?=.*[A-Za-z])(?=.*\d))|((?=.*[A-Za-z])(?=.*[@$!%*#?&]))|((?=.*\d)(?=.*[@$!%*#?&]))/,
                "영문, 숫자, 특수문자 중 2가지 이상 조합하여 6자리 이상 입력해주세요."
              ),
              mt_pwd_re: yup.string().required('비밀번호를 한번더 입력해주세요.')
              .oneOf([yup.ref('mt_pwd'), null], '비밀번호가 일치하지 않습니다.'),
            })}
            >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
            <React.Fragment>
            
              <View style={[styles.inputGroup0, {marginBottom: 6}]}>
                <TextInput style={styles.textInput} placeholder={'비밀번호 입력'}
                  autoCorrect={false} secureTextEntry={true}
                  onChangeText={handleChange('mt_pwd')}
                  onBlur={() => {setFieldTouched('mt_pwd')}}
                  value={values.mt_pwd}
                  textContentType="oneTimeCode"
                />
              </View>
              
              <View style={styles.inputGroup0}>
                <TextInput style={styles.textInput} placeholder={'비밀번호 재입력'}
                  autoCorrect={false} secureTextEntry={true}
                  onChangeText={handleChange('mt_pwd_re')}
                  onBlur={() => {setFieldTouched('mt_pwd_re')}}
                  value={values.mt_pwd_re}
                  textContentType="oneTimeCode"
                />
              </View>
              {((touched.mt_pwd && errors.mt_pwd) || (touched.mt_pwd_re && errors.mt_pwd_re)) ?
                <Text style={styles.txtChkInfo}>{errors.mt_pwd ? errors.mt_pwd :errors.mt_pwd_re}</Text> : null}

              <View style={[styles.btnConfirm]}>
                <BtnSubmit title={"변경하기"} onPress={handleSubmit} disabled={buttonDisabled} />
              </View>

            </React.Fragment>
            )}
          </Formik>
        </View>
        
      </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUpdatePwd);

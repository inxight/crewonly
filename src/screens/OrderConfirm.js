import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Dimensions, Alert, Keyboard } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';
import * as yup from 'yup';
import { Formik } from 'formik';

import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import { BtnSubmit, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

//------------------------------------------------------------------------------
function OrderConfirm(props) {
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [findResult, setFindResult] = useState(false);
  
  useEffect(() => {

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
  },[]);

  const Submit_frm = async (values) => {
    if (props.mt_id) {
      props.navigation.navigate('OrderList', {});
    } else {
      Keyboard.dismiss();

      props.navigation.navigate('OrderDetail', {ot_code: values.ot_code});
    }
  }
  //----------------------------------------------------------------------------
  
  return(
    <Container style={styles.bg0}>
      <HeaderWrap title={'주문조회'} navigation={props.navigation} route={props.route} />
      <Content enableResetScrollToCoords={false} contentContainerStyle={[{alignItems: 'center', paddingTop: 66}]}>
        <Formik
          initialValues={{ ot_code: '', ot_pwd: '' }}
          onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
            Submit_frm(values);
          }}
          validationSchema={yup.object().shape({
            ot_code: yup
            .string()
            .required('주문번호를 입력해주세요.'),
            ot_pwd: yup
            .string()
            .required('비밀번호를 입력해주세요.'),
          })}
          >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
          <React.Fragment>
            <View style={styles.login_btnGroup2}>
              
              <Text style={[styles.subTitle06, {textAlign: 'center', marginBottom: 40}]}>{'주문내역 조회를 위해\n주문번호를 입력하세요.'}</Text>
              {findResult ?
              <View style={[styles.container1, styles.rowVerticalCenter, {marginBottom: 14}]}>
                <Text style={[styles.text1, {textAlign: 'center', color: '#FF9F29'}]}>
                  <Icon name={'alert-circle'} size={22} color={'#FF9F29'} /> &nbsp;{'일치하는 주문번호가 없습니다.'}</Text>
              </View> : null}

              <View style={styles.inputGroup0}>
                <TextInput style={styles.textInput} placeholder={'주문번호를 입력해주세요.'}
                  autoCorrect={false} 
                  onChangeText={handleChange('ot_code')}
                  onBlur={() => setFieldTouched('ot_code')}
                  value={values.ot_code}
                />
              </View>
              {touched.ot_code && errors.ot_code &&
                <Text style={[styles.txtChkInfo]}>{errors.ot_code}</Text>}

              {/* <View style={[styles.inputLabel0]}>
                <Text style={styles.subTitle00}>{'비밀번호'}</Text>
              </View> */}
              <View style={styles.inputGroup0}>
                <TextInput style={styles.textInput} placeholder={'비밀번호를 입력해주세요'}
                  secureTextEntry={true}
                  onChangeText={handleChange('ot_pwd')}
                  onBlur={() => setFieldTouched('ot_pwd')}
                  value={values.ot_pwd}
                />
              </View>
              {touched.ot_pwd && errors.ot_pwd &&
                <Text style={[styles.txtChkInfo]}>{errors.ot_pwd}</Text>}

              <View style={[styles.btnConfirm]}>
                <BtnSubmit title={"조회하기"} onPress={handleSubmit} style={{marginBottom: 10}} />
                <BtnSubmit title={"로그인"} onPress={() => props.navigation.navigate('Login', {screen: 'OrderList', param: {return_screen: 'Main'}})}
                  style={styles.btn_bg2} />
              </View>
            </View>
        
          </React.Fragment>
          )}
        </Formik>
      </Content>
      {isKeyboardVisible===false ? <FooterWrap actMenu={"odlist"} navigation={props.navigation} /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);

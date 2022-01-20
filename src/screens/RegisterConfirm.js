import React, { Component, useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Container, Content, Footer, FooterTab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import InfoTxt from '../components/InfoTxt'
import { BtnSubmit, CusCheckbox, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

//------------------------------------------------------------------------------
export function ListCheckbox(props){
  return(
    <View></View>
  );
}
function RegisterConfirm(props) {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const [mt_memo, setMemo] = useState('');
  const [categories, setCategories] = useState([]);
  const [category_etc, setCategory_etc] = useState('');
  const [isChecked, setIsChecked] = useState([]);
  const [listCheckbox, setListCheckbox] = useState();
  
  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      Api.send('category_list', { tbl: 'retire' }, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setCategories(arrItems.items);
          setCategory_etc(arrItems.etc);
        }
      });
    }
    return () => {
      mounted.current = false;
    };
  },[]);

  const toggleSwitch = (val) => {
    var chked = false;
    let newArray = isChecked;
    if (newArray.includes(val)) {
      newArray.splice(newArray.indexOf(val), 1);
      if (val===category_etc.ct_id) {
        setMemo('');
      }
    } else {
      if (newArray.length>2) {
        Alert.alert('최대 3개 선택가능');
        return false;
      }
      chked = true;
      newArray.push(val);
    }
    const newArray1 = newArray.filter((arr, index) => {
      return newArray.indexOf(arr) === index;
    });
    setIsChecked(newArray1);

    const rs2 = <ListCheckbox checked={chked} items={val} />;
    setListCheckbox(rs2);
  }

  const Submit_frm = async (values) => {
    Keyboard.dismiss();
    if (props.mt_id) {
      var params = { act: 'check', mt_id: props.mt_id, mt_pwd: values.mt_pwd, mt_retire_category: isChecked.join('|'), mt_retire_memo: mt_memo, temp_mt_id: props.temp_mt_id };
      Api.send('member_retire', params, (args)=>{
        
        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          if (resultItem.message) {
            cusToast(resultItem.message);
          }
          AsyncStorage.removeItem('mt_id');
          // let arrItems = { mt_id: null, mt_level: 2, mt_login_type: '1' };
          dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
          
          props.navigation.navigate('Main');
        }
      });
    } else {
      props.navigation.navigate('Main');
    }
  }
  //----------------------------------------------------------------------------
  
  return(
    <Container>
      <HeaderWrap title={"회원탈퇴"} navigation={props.navigation} route={props.route} right={'none'} />
      
      <Formik
        initialValues={{ w: (props.mt_login_type==='1'?false:true), mt_pwd: '' }}
        onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
          Submit_frm(values);
        }}
        validationSchema={yup.object().shape({
          w: yup.boolean(),
          mt_pwd: yup.string().when('w', {
            is: false,
            then: yup.string().required('비밀번호를 입력해주세요.')
          }),
        })}
        >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
        <React.Fragment>
          <Content enableResetScrollToCoords={false} style={styles.bg0}>
            <View style={[styles.bg2, styles.contentWrap2]}>

              {props.mt_login_type==='1'?
              <View>
                <View style={[styles.inputLabel0]}>
                  <Text style={styles.subTitle00}>{'비밀번호'}</Text>
                </View>
                <View style={styles.inputGroup0}>
                  <TextInput style={styles.textInput} placeholder={'비밀번호를 입력해주세요'}
                    autoCorrect={false} secureTextEntry={true}
                    onChangeText={handleChange('mt_pwd')}
                    onBlur={() => {setFieldTouched('mt_pwd')}}
                    value={values.mt_pwd}
                  />
                </View>
                {touched.mt_pwd && errors.mt_pwd &&
                  <Text style={styles.txtChkInfo}>{errors.mt_pwd}</Text>}
              </View> : null}
              
              <View style={[styles.inputLabel0]}>
                <Text style={styles.subTitle00}>{'탈퇴 사유'}</Text>
                <Text style={[styles.text5, styles.clr2, {marginLeft: 6}]}>({'복수 선택 가능'})</Text>
              </View>
              {categories.length?
              categories.map((arr, i) => 
              (<View key={i}>
                <CusCheckbox check={isChecked.find((cb) => cb === arr.ct_id)?true:false} name={arr.ct_name} 
                onPress={() => toggleSwitch(arr.ct_id)} 
                cusStyle2={{paddingLeft: 0, paddingRight: 30, paddingVertical: 8, height: 'auto', alignItems: 'flex-start'}}
                cusStyle3={[styles.ff1l, {marginLeft: 4, marginTop: 1, lineHeight: 18}]} />
              </View>)) : null}
              <View style={[styles.inputGroup0, {marginLeft: (4+28)}]}>
                <TextInput style={[styles.textInput, (isChecked.find((cb) => cb === category_etc.ct_id)?styles.bg2:styles.bg0)]} placeholder={'상세 사유를 입력해주세요.'}
                  autoCorrect={false} editable={isChecked.find((cb) => cb === category_etc.ct_id)?true:false} 
                  onChangeText={(val) => setMemo(val)}
                  value={mt_memo}
                />
              </View>

            </View>
            <InfoTxt type={'RegisterConfirm'} />
          </Content>
          <Footer style={{height: 56}}>
            <FooterTab style={styles.bg2}>
              <BtnSubmit title={'회원탈퇴'} onPress={handleSubmit} style={styles.btn_st1} />
            </FooterTab>
          </Footer>
      
        </React.Fragment>
        )}
      </Formik>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_login_type: state.login.mt_login_type,

    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConfirm);

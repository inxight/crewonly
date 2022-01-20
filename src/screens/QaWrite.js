import React, { Component, useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import * as yup from 'yup';
import { Formik } from 'formik';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FilePick from '../components/FilePick'
import { BtnSubmit, BtnFrmline, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function QaWrite(props){
  const [idx, setIdx] = useState(props.route.params.idx);
  const [shop_id, setShop_id] = useState(props.route.params.shop_id);
  const [pt_idx, setPt_idx] = useState(props.route.params.pt_idx);
  const [get_category, setGet_category] = useState(<></>);
  const [data, setData] = useState({qt_idx: '', qt_title: '', qt_content: '', qt_file: '', del_file1: false});
  const [qt_file, setFile1] = useState({ data: '', uri: '', imgurl: '' });

  useEffect(() => {
    setIdx(props.route.params.idx);
    setShop_id(props.route.params.shop_id);
    setPt_idx(props.route.params.pt_idx);

    if (props.route.params.idx) {
      Api.send('qna_detail', { mt_id: props.mt_id, qt_idx: props.route.params.idx }, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setFile1({ data: '', uri: '', imgurl: arrItems.qt_file });
          setData(arrItems);
        }
      });
    }
  },[props.route.params]);

  const set_file = (p) => {
    if (p) {
      setFile1({data: p.data, uri: p.uri, imgurl: p.uri});
    }
  }
  const del_file = () => {
    setFile1({data: '', uri: '', imgurl: ''});
    var obj = data;
    obj.del_file1 = true;
    setData(obj);
  }

  const Submit_frm = (values) => {
    var params = { mt_id: props.mt_id, act: idx?'update':'', qt_idx: idx
    , qt_title: values.qt_title
    , qt_content: values.qt_content };
    if (pt_idx) { params.pt_idx = pt_idx; }
    if (shop_id) { params.st_idx = shop_id; }
    if (qt_file.data) {
      params.qt_file = qt_file.data;
      params.del_file1 = true;
    } else {
      if (data.del_file1) {
        params.del_file1 = data.del_file1;
      }
    }
    Api.send('qna_input', params, (args)=>{

      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        if (props.route.params.pt_idx) {
          const resetAction = CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Main', params: {modal: false} },
              { name: 'ProductDetail', params: {pt_idx: props.route.params.pt_idx} },
            ],
          });
          props.navigation.dispatch(resetAction);
        } else {
         props.navigation.navigate('QaList', {mylist: true, reload: true});
        }
      }
    });
  }

  return(
    <Container>
      <HeaderWrap title={'1:1문의 작성'} navigation={props.navigation} route={props.route} right={'none'} />
      <Content enableResetScrollToCoords={false}>
        <View style={styles.contentWrap2}>
          {/* { get_category } */}

          <Formik
            enableReinitialize={true}
            initialValues={{ qt_title: data.qt_title, qt_content: data.qt_content, qt_file: data.qt_file, del_file1: data.del_file1 }}
            onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
              Submit_frm(values);
            }}
            validationSchema={yup.object().shape({
              qt_title: yup
              .string()
              .required('제목을 입력해주세요.'),
              qt_content: yup
              .string()
              .required('문의내용을 입력해주세요.'),
            })}
            >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
            <React.Fragment>

              <View style={styles.inputLabel0}>
                <Text style={styles.subTitle00}>제목</Text>
              </View>
              <View style={styles.inputGroup0}>
                <TextInput style={styles.textInput} placeholder={'제목을 입력하세요'}
                  autoCorrect={false}
                  onChangeText={handleChange('qt_title')}
                  onBlur={() => {setFieldTouched('qt_title')}}
                  value={values.qt_title}
                />
              </View>
              {touched.qt_title && errors.qt_title ?
                <Text style={styles.txtChkInfo}>{errors.qt_title}</Text> : null}

              <View style={styles.inputLabel0}>
                <Text style={styles.subTitle00}>문의내용</Text>
              </View>
              <View style={styles.inputGroup0}>
                <TextInput style={[styles.textInput, styles.textArea]} placeholder={'문의내용을 입력하세요'}
                  autoCorrect={false}
                  multiline={true} numberOfLines={6} maxLength={255}
                  onChangeText={handleChange('qt_content')}
                  onBlur={() => {setFieldTouched('qt_content')}}
                  value={values.qt_content}
                />
              </View>
              {touched.qt_content && errors.qt_content ?
                <Text style={styles.txtChkInfo}>{errors.qt_content}</Text> : null}

              <View style={styles.inputLabel0}>
                <Text style={styles.subTitle00}>사진첨부</Text>
              </View>
              <View style={styles.inputGroup0}>
                <View style={styles.rowVerticalCenter}>
                  <FilePick index={0} file={qt_file} setFile={set_file.bind(this)} del_file={del_file.bind(this)} />
                </View>
              </View>

              <View style={[styles.btnConfirm]}>
                <BtnSubmit title={'문의'+(idx?'수정':'')+'하기'} onPress={handleSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(QaWrite);

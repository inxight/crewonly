import React, { Component, useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, ScrollView, Dimensions, Keyboard, Platform } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Container, Content, Button } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import ModalSelector from 'react-native-modal-selector';
import StarRating from 'react-native-star-rating';
import * as yup from 'yup';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ProductRowLi from '../components/ProductRowLi'
import FilePick from '../components/FilePick'
import InfoTxt from '../components/InfoTxt'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, Btn01, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

export function ListCheckbox(props){
  return(
    <View></View>
  );
}

export function Get_product(props){
  const item = props.items;

  return(
    <View style={[styles.bg2, styles.line01, {paddingBottom: 12, paddingTop: 12}]}>
      {item.items ? 
      (item.items.length ?
      item.items.map((arr, i) => (
      <View key={i} style={{paddingBottom: 8}}>
        <ProductRowLi key={i} index={i} items={arr} navigation={props.navigation} cusStyle={{paddingBottom: 0}} type={'option'} />
      </View>)) : null) : null}
    </View>
  );
}

function ReviewWrite(props){
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [oData, setOData] = useState();
  const [get_product, setGet_product] = useState(<></>);
  const [starCount, setStarCount] = useState(5);

  var i0 = 0, i1 = 0, i2 = 0, i3 = 0, i4 = 0;
  const [temp_file, setTemp_file] = useState([{uri: null, imgurl: null}]);
  const [del_file1, setDel_file1] = useState(0);
  const [del_file2, setDel_file2] = useState(0);
  const [del_file3, setDel_file3] = useState(0);
  const [del_file4, setDel_file4] = useState(0);
  const [del_file5, setDel_file5] = useState(0);
  const [listCheckbox, setListCheckbox] = useState();
  const size = (Dimensions.get('window').width - 40) * 0.22;

  const inputRef = useRef(null);
  const [textAreaOn, setTextAreaOn] = useState(false);

  const [detailData, setDetailData] = useState();
  //----------------------------------------------------------------------------
  useEffect(() => {
    var params = { mt_id: props.mt_id, ot_code: props.route.params.ot_code, ot_pcode: (props.route.params.ot_pcode?props.route.params.ot_pcode:'') };
    if (!props.mt_id) {
      params.temp_mt_id = props.temp_mt_id;
      params.mt_id = '';
    }
    // console.log(params);
    Api.send('member_order_detail_item', params, (args)=>{
      
      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        if (props.mt_id) {
          setOData(arrItems);
        }
        const rs = <Get_product items={arrItems} navigation={props.navigation} />;
        setGet_product(rs);
      }
    });
    if (props.route.params.idx) {
      Api.send('review_detail', {idx: props.route.params.idx}, (args)=>{
      
        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setDetailData(arrItems);
          setStarCount(arrItems.rt_score*1);
          var newArray = [{ uri: null, imgurl: null }];
          if (arrItems.rt_img.length) {
            arrItems.rt_img.map((arr, i) => {
              newArray[i] = { uri: null, imgurl: arr };
            });
          }
          setTemp_file(newArray);
        }
      });
    }
  },[]);

  const ratingCompleted = (rating, index) => {
    setStarCount(rating);
  }

  const del_file = (val, index) => {
    var chked = false;
    let newArray = temp_file;
    newArray.splice(index, 1);
    setTemp_file(newArray);

    switch(index) {
      case 0: setDel_file1(1); break;
      case 1: setDel_file2(1); break;
      case 2: setDel_file3(1); break;
      case 3: setDel_file4(1); break;
      case 4: setDel_file5(1); break;
    }
    const rs2 = <ListCheckbox checked={chked} items={val} />;
    setListCheckbox(rs2);
  }

  const Submit_frm = data => {
    Keyboard.dismiss();

    if (!data.rt_content) {
      setButtonDisabled(false);
      cusToast('리뷰내용을 입력해주세요');
      return false;
    }
    if (data.rt_content.length<10) {
      setButtonDisabled(false);
      cusToast('리뷰내용은 10자이상 입력해주세요');
      return false;
    }
    setButtonDisabled(true);

    var method = 'review_input';
    var params = { mt_id: (props.mt_id?props.mt_id:''), temp_mt_id: (props.mt_id?'':props.temp_mt_id)
      , ot_code: props.route.params.ot_code, ot_pcode: (props.route.params.ot_pcode?props.route.params.ot_pcode:'')
      , rt_content: data.rt_content, rt_score: (starCount?starCount:5)
    };

    let arrImg = [];
    temp_file.map((arr, i) => {
      if (arr.uri) {
        arrImg[i] = { uri: arr.uri, type: 'image/jpeg', name: 'photo'+i+'.jpeg' };
      }
    });
    
    if (del_file1) { params.del_file1 = del_file1 };
    if (del_file2) { params.del_file2 = del_file2 };
    if (del_file3) { params.del_file3 = del_file3 };
    if (del_file4) { params.del_file4 = del_file4 };
    if (del_file5) { params.del_file5 = del_file5 };
    if (props.route.params.idx) {
      params.idx = props.route.params.idx;
      method = 'review_update';
    }

    var files = {};
    arrImg.map((arr, index) => {
      if (index===4) { files.rt_img5 = arr;
      } else if (index===3) { files.rt_img4 = arr;
      } else if (index===2) { files.rt_img3 = arr;
      } else if (index===1) { files.rt_img2 = arr;
      } else { files.rt_img1 = arr; }
    });

    Api.send(method, params, (args)=>{

      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        if (resultItem.message) {
          cusToast(resultItem.message);
        }

        setTemp_file([{uri: null, imgurl: null}]);
        
        // props.navigation.navigate('OrderList', {reload: true});
        if (props.route.params.idx) {
          props.navigation.navigate('MyReviewList', {reload: true});
        } else {
          var screen = 'OrderConfirm';
          if (props.mt_id) { screen = 'OrderList'; }
          if (props.route.params.screen) { screen = props.route.params.screen; }
          
          const resetAction = CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Main', params: {modal: false} },
              { name: screen, params: {reload: true} },
            ],
          });
          props.navigation.dispatch(resetAction);
        }
      } else {
        setButtonDisabled(false);
      }
    }, files);
  }

  const setFile = (p, index) => {
    console.log(p, index);
    var files = temp_file;
    files[index] = p;
    setTemp_file(files);
    
    const rs2 = <ListCheckbox checked={true} items={index} />;
    setListCheckbox(rs2);
  }

  const deviceSpace = ((Platform.OS === 'ios' && isIphoneX())?getBottomSpace():0) + getStatusBarHeight() + 56;
  const [viewHeight, setViewHeight] = useState(0);
  const wrapLayout = (e) => {
    var {width, height} = e;
    setViewHeight(Dimensions.get('window').height-deviceSpace-(height*2)-14);
  }

  return(
    <Container>
      <HeaderWrap title={'리뷰작성'} navigation={props.navigation} route={props.route} right={'none'} />
      <Content enableResetScrollToCoords={false}>
        { get_product }
        
        <View style={{minHeight: viewHeight}}>
          <View style={[styles.contentWrap3, styles.rowVerticalCenterB]}>
            <View style={[styles.inputLabel0]}>
              <Text style={styles.subTitle01}>{'별점등록'}</Text>
            </View>

            <View style={{marginRight: 4}}><Text style={[styles.txtPrice, styles.ff2b]}>{starCount}</Text></View>
            <StarRating
              disabled={false} maxStars={5} //halfStarEnabled
              emptyStar={require( '../images/ic_star_off.png' )}
              fullStar={require( '../images/ic_star_on.png' )}
              halfStar={require( '../images/ic_star_half.png' )}
              rating={starCount}
              selectedStar={rating => ratingCompleted(rating, index)}
              starSize={25} buttonStyle={{marginHorizontal: 1}}
            />
          </View>
          
          <Formik
              enableReinitialize={true}
              initialValues={{ rt_content: (detailData?detailData.rt_content:'') }}
              onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
                Submit_frm(values);
              }}
              validationSchema={yup.object().shape({
                rt_content: yup
                .string()
                .required('리뷰내용을 작성해주세요.'),
              })}
              >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, setValues }) => (
              <React.Fragment>

              <View style={[styles.contentWrap3, {paddingTop: 0}]}>

                <View style={[styles.inputLabel0]}>
                  <Text style={styles.subTitle00}>{'상품 리뷰'}</Text>
                  {oData ? <Text style={[styles.text5, styles.txtStrong1, {marginLeft: 6}]}>{'일반 '+oData.review_point+'원 / 사진 '+oData.photo_review_point+'원 적립'}</Text> : null}
                </View>
                <View style={styles.inputGroup0}>
                  <TextInput style={[styles.textInput, styles.textArea]} placeholder={'상품은 어떠셨나요? 자세히 알려주세요.\n(10자이상 입력하세요)'}
                    autoCorrect={false}
                    multiline={true} numberOfLines={6} maxLength={255}
                    onChangeText={handleChange('rt_content')}
                    onBlur={() => { setFieldTouched('rt_content'); setTextAreaOn(false); }}
                    onFocus={() => { setTextAreaOn(true); }}
                    value={values.rt_content}
                    ref={inputRef}
                  />
                  {/* {values.rt_content || textAreaOn ? null:
                  <TouchableOpacity onPress={() => { setTextAreaOn(true); inputRef.current.focus(); }} style={styles.textAreaPh}>
                    <View style={{flexGrow: 1, flex: 1}}><Text style={[styles.text6, styles.clr2]}>{'상품은 어떠셨나요? 자세히 알려주세요.'}</Text></View>
                  </TouchableOpacity>} */}
                </View>
                {(touched.rt_content && errors.rt_content) ?
                  <Text style={styles.txtChkInfo}>{errors.rt_content}</Text> : null}

                <View style={[styles.inputLabel0]}>
                  <Text style={styles.subTitle00}>{'사진 첨부'}</Text>
                </View>
                <View style={styles.inputGroup0}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[1,2,3,4,5].map((arr, index) => {
                      var temp_uri = temp_file[index] ? (temp_file[index].uri ? temp_file[index].uri : temp_file[index].imgurl) : null;
                      if (index===0) { i0 = temp_uri?1:0; }
                      if (index===1) { i1 = temp_uri?1:0; }
                      if (index===2) { i2 = temp_uri?1:0; }
                      if (index===3) { i3 = temp_uri?1:0; }
                      if (index===4) { i4 = temp_uri?1:0; }

                      if (index===0 || (i0===1 && index===1) || (i1===1 && index===2) || (i2===1 && index===3) || (i3===1 && index===4)) {
                        return (
                          <FilePick key={index} index={index} file={temp_file[index]?temp_file[index]:{uri: null, imgurl: null}} multiple={true} 
                            setFile={setFile.bind(this)} del_file={del_file.bind(this)}
                            />
                        );
                      }
                    })}
                  </ScrollView>

                </View>

                <View style={[styles.btnConfirm]}>
                  <BtnSubmit title={(props.route.params.idx)?"리뷰 수정":"리뷰 등록"} onPress={handleSubmit} disabled={buttonDisabled} />
                </View>
              </View>

            </React.Fragment>
            )}
          </Formik>
        </View>
        <View style={styles.bg0}><InfoTxt type={'ReviewWrite'} onLayout={(event) => { wrapLayout(event.nativeEvent.layout) }} /></View>

      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    temp_mt_id: state.sconf.temp_mt_id,
    areview_point: state.sconf.areview_point,
    aphoto_review_point: state.sconf.aphoto_review_point,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWrite);

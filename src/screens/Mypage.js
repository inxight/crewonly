import React, {Component, useEffect, useState, useRef} from 'react';
import { View, Image, TouchableOpacity, Dimensions, Alert, Platform, BackHandler } from 'react-native';
import { Container, Content, Header, Badge, Text as Textnb } from 'native-base';
import { StackActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// import KakaoShareLink from 'react-native-kakao-share-link';
// import VersionCheck from 'react-native-version-check';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import { Profile, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

export function Detail_header(props){
  const item = props.items;

  const onPressNav = (scrName, param) => {
    if (item.mt_id) {
      if (scrName) {
        props.navigation.navigate(scrName, param);
      }
    } else { props.navigation.navigate('Login', {}); }
  }

  return(
    <View>
      <Profile navigation={props.navigation} items={item} />
      
      <View style={[styles.contentWrap3, {paddingTop: 0}]}>
        <View style={[styles.bg2, styles.rowVerticalCenterB, {paddingVertical: 17}]}>
          <View style={{flex: 2}}>
            <View style={{flex: 1, alignItems: 'stretch', paddingHorizontal: 20}}>
              <TouchableOpacity onPress={() => onPressNav('PointList')} style={[styles.rowVerticalCenterB, {flex: 1}]}>
                <Text style={styles.subTitle00}>{'포인트'}</Text>
                <Text style={[styles.txtStrong, {fontSize: 14}]}>
                  <Text style={[styles.txtPrice, styles.txtStrong]}>{item.mt_point ? Api.comma(item.mt_point) : 0}</Text>{'P'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressNav('PointList')} style={[styles.rowVerticalCenterB, {flex: 1}]}>
                <Text style={styles.subTitle00}>{'내계좌'}</Text>
                <Text style={[styles.txtStrong, {fontSize: 14}]}>
                  <Text style={[styles.txtPrice, styles.txtStrong]}>{item.mt_deposit ? Api.comma(item.mt_deposit) : 0}</Text>{'원'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: 1, height: '100%', backgroundColor: '#f0f0f0'}} />
          <TouchableOpacity onPress={() => onPressNav('CouponList')} style={styles.container1}>
            <Text style={[styles.subTitle05, styles.clr4, {marginBottom: 4}]}>{item.mt_coupon ? Api.comma(item.mt_coupon) : 0}</Text>
            <Text style={styles.subTitle00}>{'쿠폰'}</Text>
          </TouchableOpacity>
          <View style={{width: 1, height: '100%', backgroundColor: '#f0f0f0'}} />
          <TouchableOpacity onPress={() => onPressNav('MyReviewList')} style={styles.container1}>
            <Text style={[styles.subTitle05, styles.clr4, {marginBottom: 4}]}>{item.review_cnt ? Api.comma(item.review_cnt) : 0}</Text>
            <Text style={styles.subTitle00}>{'리뷰'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Mypage(props){
  const mounted = useRef(false);
  const dispatch = useDispatch();

	const [detailData, setDetailData] = useState({is_member: false, mt_image1: '', notice_cnt: 0, qna_cnt: 0});
  const [detail_header, setDetail_header] = useState(<></>);
  const [menuArr, setMenuArr] = useState([
    // {name: 'My 리뷰', id: 'MyReviewList', param: {mylist: true}},
    {name: '개인정보 수정', id: 'Myinfo', param: null},
    {name: '알림설정', id: 'PushSetting', param: null},
    {name: '1:1문의', id: 'QaList', param: {mylist: true}},
    {name: '공지사항', id: 'BoardList', param: {bo_table: 'notice'}},
    {name: '자주하는 질문', id: 'FaqList', param: null},
    {name: '서비스 약관', id: 'ContentDetail', param: {}},
  ]);

  const [agreeArr, setAgreeArr] = useState([
    {name: '이용약관', id: 'agree1' },
    {name: '개인정보 취급방침', id: 'agree2' },
    {name: '위치정보이용약관', id: 'agree3' },
  ]);

  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      console.log(props.mt_id);
      if (props.mt_id) {
        setMenuArr([
          {name: '개인정보 수정', id: 'Myinfo', param: null},
          {name: '알림설정', id: 'PushSetting', param: null},
          {name: '1:1문의', id: 'QaList', param: {mylist: true}},
          {name: '공지사항', id: 'BoardList', param: {bo_table: 'notice'}},
          {name: '자주하는 질문', id: 'FaqList', param: null},
          {name: '서비스 약관', id: 'ContentDetail', param: {}},
        ]);
      } else {
        setMenuArr([
          {name: '공지사항', id: 'BoardList', param: {bo_table: 'notice'}},
          {name: '자주하는 질문', id: 'FaqList', param: null},
          {name: '서비스 약관', id: 'ContentDetail', param: {}},
        ]);
      }
    }
    return () => {
      mounted.current = false;
    };
  },[props.mt_id]);

  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      fetchMember(props.mt_id);
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      mounted.current = false;
		  backHandler.remove();
    };
  },[props.mt_name, props.mt_image1, props.mt_point, props.mt_coupon, props.mt_deposit, props.mt_certify, props.updateTime, props.route.params]);//props.mt_id, 

  const fetchMember = (id) => {
    var args = {
      resultItem: {result: (id?'Y':'N')},
      arrItems: {
        mt_id: (id?id:''), mt_level: 2, mt_login_type: '1', cart_cnt: 0, cart_sum: 0
      }
    };
    // Api.send('member_info', {mt_id: (id?id:''), temp_mt_id: props.temp_mt_id}, (args)=>{
      
      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y' && arrItems) {
        dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));

        if (arrItems.mt_id) {
          if (arrItems.mt_image1) {
            arrItems.mt_image1 = arrItems.mt_image1+'?ver='+(props.updateTime?(props.updateTime.replace(/[-]|\s|[:]/gi, '')):Api.formatDateTime(new Date(),'YmdHis'));
          }
          arrItems.is_member = true;
          setDetailData(arrItems);
          const rs = <Detail_header navigation={props.navigation} items={arrItems} />;
          setDetail_header(rs);

          if (arrItems.mt_hp && !arrItems.mt_certify) {
            props.navigation.navigate('RegisterCheck', {act: 'update2'});
          }
        } else {
          var newArray = {is_member: false, mt_image1: '', notice_cnt: 0, qna_cnt: 0};
          setDetailData(newArray);
          const rs = <Detail_header navigation={props.navigation} items={newArray} />;
          setDetail_header(rs);
        }
      } else {
        var newArray = {is_member: false, mt_image1: '', notice_cnt: 0, qna_cnt: 0};
        setDetailData(newArray);
        const rs = <Detail_header navigation={props.navigation} items={newArray} />;
        setDetail_header(rs);
      }
    // });
  }
	const backAction = () => {
		fetchMember(props.mt_id);
	};

  const onPressNav = (scrName, param) => {
    if (scrName) {
      if (scrName==='LinkFriend') {
        kakaoLink();
      } else {
        if (props.mt_id == null && (scrName!=='Myinfo' && scrName!=='BoardList' && scrName!=='FaqList' && scrName!=='ContentDetail')) {
          props.navigation.navigate('Login', {});
        } else {
          props.navigation.navigate(scrName, param);
        }
      }
    }
  }

  const kakaoLink = async () => {
  };

  return(
    <Container>
      <HeaderWrap title={'마이페이지'} navigation={props.navigation} route={props.route} type={'home'} />
      <Content style={styles.bg0}>
        {detail_header}
        
        {menuArr.map((arr, i) =>
        <TouchableOpacity key={i} onPress={() => onPressNav(arr.id, arr.param)} style={[styles.contentWrap1, styles.bg2]}>
          <View style={styles.menuLTM0}>
            <View style={[styles.rowVerticalCenter, {flex: 1}]}>
              <Text style={styles.menuLTxt0}>{arr.name}</Text>
              {arr.id==='BoardList' && arr.param.bo_table==='notice' && detailData?
						  (detailData.notice_cnt? <View style={[styles.notiCountBox]}><Text style={styles.cartCount}>{detailData.notice_cnt}</Text></View> : null): null}
              {arr.id==='QaList' && detailData?
						  (detailData.qna_cnt? <View style={[styles.notiCountBox]}><Text style={styles.cartCount}>{detailData.qna_cnt}</Text></View> : null): null}
            </View>
            <Icon name={'chevron-right'} style={styles.menuLIcn0} />
          </View>
          {menuArr.length-1>i? <View style={styles.line01} /> : null}
        </TouchableOpacity>
        )}

        <View style={styles.mt44} />
      </Content>
      <FooterWrap actMenu={"mypage"} navigation={props.navigation} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_point: state.login.mt_point,
    mt_coupon: state.login.mt_coupon,
    mt_deposit: state.login.mt_deposit,
    mt_image1: state.login.mt_image1,
    mt_certify: state.login.mt_certify,
    mt_sn: state.login.mt_sn,
    updateTime: state.login.updateTime,
    loginInfo: state.login,
    
    aname: state.sconf.aname,
    aemail: state.sconf.aemail,
    acallno: state.sconf.acallno,
    aaddress: state.sconf.aaddress,
    aceo: state.sconf.aceo,
    abizname: state.sconf.abizname,
    abizelc: state.sconf.abizelc,
    abizno: state.sconf.abizno,
    aprivacy: state.sconf.aprivacy,
    acustomer: state.sconf.acustomer,
    akakaolink: state.sconf.akakaolink,
    
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);

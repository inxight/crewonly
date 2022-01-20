import React, { Component, useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, TextInput, Platform, Keyboard, StatusBar, BackHandler, Alert } from 'react-native';
import { StackActions, CommonActions, useRoute } from '@react-navigation/native';
import { Header, Body, Title, Left, Right, Button } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-community/async-storage';
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import FeatherIcon from 'react-native-vector-icons/Feather'; FeatherIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import cusToast from '../components/CusToast'
import CusAlert from '../components/CusAlert'
import { Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function HeaderWrap(props) {
  const route = useRoute();
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(props.cart_cnt*1);
  const [stx, setStx] = useState(props.keyword);
  const inputRef = useRef(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const detailData_obj = {mk_idx: '', mk_name: '', distance: ''};
  const [detailData, setDetailData] = useState(detailData_obj);

  useEffect(() => {
    if (props.type==='search') {
      inputRef.current.focus();
    }
    
    props.navigation.addListener('focus', () => {
      if (route.name!==props.routeName) {
        console.log('focus..', route.name);
        props.set_rconf(route.name, props.last_mt_id, props.recommend);
      }
      Auth_info();
    });
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
    }
  },[]);

  useEffect(() => {
    setCartCount(props.cart_cnt*1);
  },[props.cart_cnt]);

  useEffect(() => {
    setStx(props.keyword);
  },[props.keyword]);

  const searchItem = () => {
    var str = stx.trim();
    if (str) {
      if (str.length < 2) {
        cusToast('검색어는 2자이상 입력해주세요.');
        return false;
      }
      setStx(str);
      Api.send('search_input', { mt_idx: props.mt_idx, slt_txt: str }, (args)=>{
        props.navigation.navigate('ProductList', {stx: str});
      });
    } else {
      cusToast('검색어를 입력해주세요.');
      return false;
    }
  }

  const onPressNav = (scrName, param) => {
    if (props.mt_id == null && (scrName!='ProductSearch' && scrName!='CartList')) {
      props.navigation.navigate('Login', {});
    } else {
      if (param) {
        props.navigation.navigate(scrName, param);
      } else {
        props.navigation.navigate(scrName);
      }
    }
  }

  const Auth_info = async (val) => {
    const token = "";//await messaging().getToken();

    if (props.mt_idx && !(route.name==='Login' || route.name==='RegisterCheck' || route.name==='PaymentWrite' || route.name==='PaymentScreen_iam')) {
      console.log("Header.. backAction:", route.name);
      Api.send('member_login_history', {lo_class: 2, mt_idx: props.mt_idx, mt_hp: props.mt_hp, token: token, temp_mt_id: props.temp_mt_id, vi_os: Platform.OS}, async (args)=>{ // 동시접속 체크
        
        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result !== 'Y') {
          
          await AsyncStorage.removeItem('mt_id');
          // let arrItems = { mt_id: null, mt_level: 2, mt_login_type: '1', cart_cnt: 0, cart_cntB: 0, cart_sumB: 0 };
          dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
          
          setIsCusAlertVisible(true);
          setCAtitle("");
          setCACancel(false);
          setCAmessage("로그인이 만료되었습니다.\n재로그인이 필요합니다.");

        } else {
          // if (val && route.name!=='Main') {
          //   props.navigation.goBack();
          // }
        }
      });
    } else {
      // if (val && route.name!=='Main') {
      //   props.navigation.goBack();
      // }
    }
  }

  const [isCusAlertVisible, setIsCusAlertVisible] = useState(false);
  const [CAtitle, setCAtitle] = useState('');
  const [CAmessage, setCAmessage] = useState('');
  const [CACancel, setCACancel] = useState(true);
  const CApress = (bool) => {
    setIsCusAlertVisible(false);
    if (bool) {
      logout();
    }
  }
  const regCancel = () => {
    setIsCusAlertVisible(true);
    setCAtitle("가입취소");
    setCAmessage("정말 가입을 취소하시겠습니까?");
  }

  const logout = async () => {
    await AsyncStorage.removeItem('mt_id');
    
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Main', params: {modal: false} },
        { name: 'Login', params: {} },
      ],
    });
    props.navigation.dispatch(resetAction);
  }

  return (
  <View style={[{zIndex: 3}, /*(props.type==='none'?null:{borderBottomWidth: 1, borderColor: '#eee'})*/]}>
    {props.type==='modal' || props.type==='scmodal' ? null : 
      (Platform.OS === 'ios'?<View style={{height: getStatusBarHeight(), backgroundColor: '#fff'}}><StatusBar translucent barStyle="light-content" /></View>:null)}
    {props.type==='modal' || props.type==='scmodal' ?
    <Header style={[styles.bg2, styles.header]} androidStatusBarColor={'#000'}>
      <Left style={{flex: 0.18}}>
        {props.isSubmit ? 
        <TouchableOpacity style={[styles.menuTrigger]} onPress={() => props.type==='scmodal' ? props.navigation.goBack() : props.toggleModal()}>
          <FeatherIcon name={'chevron-left'} size={28} color={'#888'} />
        </TouchableOpacity> : null}
      </Left>
      <Body style={[styles.container1]}>
        {props.title ? <Title style={[styles.headTitle, {marginLeft: 0}]}>{props.title}</Title>
        : <TouchableOpacity onPress={() => onPressNav('Main', {})} activeOpacity={1}></TouchableOpacity>}
      </Body>
      <Right style={{flex: 0.18}}>
        {props.isSubmit ? 
        <TouchableOpacity style={[styles.menuTrigger, styles.rowVerticalCenter, {width: 'auto', paddingLeft: 4}]} onPress={() => props.submit_frm()}>
          <Icon name={'check'} size={22} color={'#333'} />
        </TouchableOpacity>
        : 
        <TouchableOpacity style={styles.menuTrigger} onPress={() => props.type==='scmodal' ? props.navigation.goBack() : props.toggleModal()}>
          <Icon name={'close'} size={22} color={'#333'} />
        </TouchableOpacity>}
      </Right>
    </Header>
    : (props.type==='search') ?// && props.keyword
    <Header style={[styles.bg2, styles.header, (route.name==='ProductSearch'?{height: 70}:null)]} androidStatusBarColor={'#000'}>
      <Left style={{flex: 0.18}}>
        <TouchableOpacity style={[styles.menuTrigger]} onPress={() => props.navigation.goBack()}>
          <FeatherIcon name={'chevron-left'} size={28} color={'#888'} />
        </TouchableOpacity>
      </Left>
      <Body>
        <View style={[styles.inputGroupLine, styles.bg0, (props.right==='none'? null : (isKeyboardVisible ? {width: '96%'} : null))]}>
          <View style={{flex: 1}}>
            <TextInput style={[styles.textInput1, styles.bg0, {height: 40}]} placeholder={'상품명, 상점명을 입력하세요'} placeholderTextColor={'#999'}
              returnKeyType={'search'} returnKeyLabel={'search'}
              onChangeText={(val) => setStx(val)} onSubmitEditing={() => searchItem()}
              //onFocus={() => setInputFocus(true)} //onBlur={() => setInputFocus(false)}
              ref={inputRef}
              value={stx}
            />
          </View>
          <Button onPress={() => searchItem()} style={[styles.btnSearch, {height: 40}]}>
            <Image source={require('./../images/ico_sch.png')} style={[styles.imgContain, {width: 30, height: 30}]} />
          </Button>
        </View>
      </Body>
      {props.right==='none'?
      <Right style={{paddingRight: 10, flex: 0}}></Right>
      :(isKeyboardVisible ? null : <Right style={{flex: 0.18}}>
        <TouchableOpacity style={[styles.menuTrigger]} onPress={() => onPressNav('CartList')}>
          <Image source={require('./../images/top_cart.png')} style={[styles.imgContain, {width: 30, height: 30}]} />
          {cartCount ? <View style={styles.cartCountBox}>
            <Text style={[styles.cartCount]}>{cartCount>99?'99+':cartCount}</Text>
          </View> : null}
        </TouchableOpacity>
      </Right>)}
    </Header>
    : props.type==='home' ?
    <Header style={[styles.bg2, styles.header]} androidStatusBarColor={'#000'}>
      <Left style={[{flex: 0.5}, styles.rowVerticalCenterB]}>
        
      </Left>
      <Body style={[styles.container1]}>
        {props.toggle && detailData.mk_idx ?
        <TouchableOpacity onPress={() => props.toggleSwitch()} activeOpacity={1} style={{paddingHorizontal: 20}}>
          <View style={[styles.container1]}>
            <View style={styles.rowVerticalCenterB}>
              <Text numberOfLines={1} style={[styles.subTitle01, {maxWidth: 120}]}>{detailData.mk_name}</Text>
              <View style={{position: 'absolute', right: -20, zIndex: 10}}><FeatherIcon name={'chevron-down'} size={20} color={'#777'} /></View>
            </View>
            <Text style={[styles.text6, styles.clr4, {marginTop: 2, marginBottom: -2}]}>{detailData.distance}</Text>
          </View>
        </TouchableOpacity>
        : (props.title ? <Title style={[styles.headTitle, {marginLeft: 0}]}>{props.title}</Title>
          : <TouchableOpacity onPress={() => onPressNav('Main', {})} activeOpacity={1}></TouchableOpacity>)}
      </Body>
      <Right style={[{flex: 0.5}, styles.rowVerticalCHorizonR]}>
        {props.right==='none'?null: <TouchableOpacity style={[styles.menuTrigger]} onPress={() => onPressNav('CartList')}>
          <Image source={require('./../images/top_cart.png')} style={[styles.imgContain, {width: 30, height: 30}]} />
          {cartCount ? <View style={styles.cartCountBox}>
            <Text style={[styles.cartCount]}>{cartCount>99?'99+':cartCount}</Text>
          </View> : null}
        </TouchableOpacity>}
      </Right>
    </Header>
    : props.type==='none' ?
    <Header style={[styles.bg2, styles.header, {elevation: 0}]} androidStatusBarColor={'#000'}>
      <Left style={{flex: 0.18}}>
        <TouchableOpacity style={[styles.menuTrigger]} onPress={() => props.navigation.goBack()}>
          <FeatherIcon name={'chevron-left'} size={28} color={'#888'} />
        </TouchableOpacity>
      </Left>
      <Body>
        <Title></Title>
      </Body>
    </Header>
    :
    <Header style={[styles.bg2, styles.header]} androidStatusBarColor={'#000'}>
      <Left style={[{flex: 0.18}, styles.rowVerticalCenterB]}>
        <TouchableOpacity onPress={() => { props.backAction ? props.backAction() : 
          (props.return_screen ? props.navigation.navigate(props.return_screen) 
            : (props.route.params ? (props.route.params.return_screen ? props.navigation.navigate(props.route.params.return_screen) : props.navigation.goBack())
              : props.navigation.goBack())
          ); }} style={[styles.menuTrigger]}>
          <FeatherIcon name={'chevron-left'} size={28} color={'#888'} />
          {/* <Image source={require('./../images/top_back.png')} style={[styles.imgContain, {width: 22, height: 22}]} /> */}
        </TouchableOpacity>
      </Left>
      <Body style={[styles.container1, props.cusStyle]}>
        {props.title ? <Title style={[styles.headTitle, props.cusStyle1, {marginLeft: 0}]}>{props.title}</Title>
        : <TouchableOpacity onPress={() => onPressNav('Main', {})} activeOpacity={1}></TouchableOpacity>}
      </Body>
      <Right style={[{flex: 0.18}, styles.rowVerticalCHorizonR]}>
        {props.right==='none'?null
        :props.right==='reg_cancel'?
        <TouchableOpacity onPress={() => regCancel()} style={[styles.menuTrigger, {width: 80, paddingHorizontal: 10}]}>
          <Text style={[styles.text2, styles.clr5, styles.ff1b]}>{'가입취소'}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.menuTrigger]} onPress={() => onPressNav('CartList')}>
          <Image source={require('./../images/top_cart.png')} style={[styles.imgContain, {width: 30, height: 30}]} />
          {cartCount ? <View style={styles.cartCountBox}>
            <Text style={[styles.cartCount]}>{cartCount>99?'99+':cartCount}</Text>
          </View> : null}
        </TouchableOpacity>}
      </Right>
    </Header>}
    <CusAlert title={CAtitle} message={CAmessage} isVisible={isCusAlertVisible} onPress={CApress.bind(this)} btnName={CAtitle} cancel={CACancel} />
  </View>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    mt_hp: state.login.mt_hp,
    cart_cnt: state.login.cart_cnt,
    idx: state.index.idx,
    routeName: state.rconf.routeName,
    last_mt_id: state.rconf.last_mt_id,
    recommend: state.rconf.recommend,
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_idx:(idx) => {
      dispatch(ActionCreator.updateIndex(idx));
    },
    set_rconf:(routeName, last_mt_id, recommend) => {
      dispatch(ActionCreator.updateRoute(routeName, last_mt_id, recommend));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrap);

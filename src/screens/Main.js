import React, {Component, useEffect, useState, useRef} from 'react';
import { View, Image, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, RefreshControl, Dimensions, Alert, Linking, Platform, AppState, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { ScrollView as GScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import firebase from '@react-native-firebase/app';
// import iid from '@react-native-firebase/iid';
// import messaging from '@react-native-firebase/messaging';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import Modal from "react-native-modal";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

// import Fcm from '../Fcm';
import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import cusToast from '../components/CusToast'
import CusCarousel from '../components/CusCarousel'
import ShopLi from '../components/ShopLi'
import ProductLi from '../components/ProductLi'

import { CusImage, BtnFrmline, MenuTab, CusWebview, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

//----------------------------------------------------------------------------
export function Detail_info(props){
  const [listData, setListData] = useState(props.items?props.items:[]);

  useEffect(() => {
    setListData(props.items);
  },[props.items])

  const onPressNav = (val, val1) => {
    props.navigation.navigate('ProductList', {sca: val, sca_name: val1});
  }

  return(
    <View>
      {listData.map((arr1, i1) => 
      (<View key={i1} style={{flexDirection: 'row', paddingHorizontal: 10}}>
        {arr1.map((arr, i) => 
        (<View key={i} style={{width: (Dimensions.get('window').width - 24) * 0.23}}>
          <View style={styles.container1}>
            <TouchableOpacity onPress={() => onPressNav(arr.ct_id, arr.ct_name)} style={[styles.cateBtn]}>
              <View style={styles.cateIcn}><Image source={arr.ct_icon ? { uri: arr.ct_icon } : null} style={styles.imgContain} /></View>
              <Text style={styles.cateTxt1}>{arr.ct_name}</Text>
            </TouchableOpacity>
          </View>
        </View>))}
      </View>))}
    </View>
  );
}
//----------------------------------------------------------------------------
function MainScreen(props){
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [headHeight, setHeadHeight] = useState(56);
  const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : ExtraDimensions.get("REAL_WINDOW_HEIGHT") - ExtraDimensions.get("STATUS_BAR_HEIGHT");
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [detail_header, setDetail_header] = useState();
  const [detail_info, setDetail_info] = useState(<></>);

  const [newListData, setNewListData] = useState([]);
  const [newListDataNull, setNewListDataNull] = useState(false);
  const [saleListData, setSaleListData] = useState([]);
  const [saleListDataNull, setSaleListDataNull] = useState(false);
  const [bestListData, setBestListData] = useState([]);
  const [bestListDataNull, setBestListDataNull] = useState(false);
  const [listData, setListData] = useState([]);
  const [listDataNull, setListDataNull] = useState(false);

  const [rows, setRows] = useState(50);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [pageLoadingCount, setPageLoadingCount] = useState(0);
  const [isModalPush, setIsModalPush] = useState(false);
  const deviceBottom = (Platform.OS === 'ios' && isIphoneX()) ? getBottomSpace() : 0;
  
  const [tabArr, setTabArr] = useState([
    {name: 'HOME', screen: '' },
    {name: 'NEW', screen: 'MainNew' },
    {name: 'BEST', screen: 'MainBest' },
    {name: 'SALE', screen: 'MainSale' },
  ]);
  //----------------------------------------------------------------------

  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      if (Platform.OS === 'ios') {
        Auth_info();
      }
      bannerList();
    }
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
    //----------------------------------------------------------------------
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      mounted.current = false;
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);
  //----------------------------------------------------------------------------
  
  /*
  useEffect(() => {
    Linking.getInitialURL().then(url => { // 카카오링크
      if (url) {
        let url_arr = url.toString().split('?recommend=');
        if (url_arr[1]) {
          props.set_rconf('Main', props.last_mt_id, url_arr[1]);
        }
      }
    });

    //Background/Quit events
    dynamicLinks().getInitialLink().then(link => {
      //console.log('getInitialLink', link);
      if (link) {
        if (link.url) {
          urlGetCode(link.url);
        }
      }
    });

    const handleDynamicLink = link => {
      // Handle dynamic link inside your own application
      //console.log('handleDynamicLink', link);
      if (link) {
        if (link.url) {
          urlGetCode(link.url);
        }
      }
    };
    
    //Foreground events
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  */
  
  // useEffect(()=>{
  //   // foreground
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived! Main');
      
  //     if (remoteMessage.data) {
  //       var msg = remoteMessage.data;
  //       if (msg.send_to.indexOf(props.mt_id) != -1 || msg.send_to===props.mt_id) {
  //         if (msg.push_type2==='orderConfirm') {
  //           var link_param = JSON.parse(msg.ref_param);
  //           if (link_param.ot_code) {
  //             setOt_code(link_param.ot_code);
  //             setOt_title(link_param.ot_title);
  //             setIsModalPush(true);
  //             setPageLoadingCount(pageLoadingCount+1);
  //           }
  //         }
  //       }
  //     }
  //   });

  //   return unsubscribe;
  // },[]);
  //----------------------------------------------------------------------------
  async function Auth_info() {
    // const id = await iid().get();
    // const fcmToken = await firebase.iid().getToken();
    // const token = await messaging().getToken();
  }
  //----------------------------------------------------------------------------
  async function marketModal() {
    if (props.route.params.modal!==false) {
      await AsyncStorage.getItem("marketModal").then(value => {
        // console.log('marketModal', value);
        if (value !== Api.formatDate(new Date())+'-'+props.temp_mt_id) {
          setIsModalVisible(true);
        }
      });
    }
  }
  //----------------------------------------------------------------------------
  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
    
    if (appState.current==='active') {
      if (Platform.OS === 'ios') {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      }
    }
    if (appState.current==='background') {
      
    }
  };
  //----------------------------------------------------------------------------
  //Url에서 코드를 추출
  const urlGetCode = (url) => {
    let url_arr = url.toString().split('?code=');
    if (url_arr[1]) {
      let code = url_arr[1].toString().split('#')[0];
      if (code) {
        let codeArr = code.toString().split('_');
        if (codeArr[0]==='m') {
          props.navigation.navigate('Login', {recom_idx: codeArr[1]});
        } else if (codeArr[0]==='s') {
          props.navigation.navigate('ProductShopDetail', {st_idx: codeArr[1]});
        } else {
          props.navigation.navigate('ProductDetail', {pt_idx: codeArr[1]});
        }
      }
    }
  };
  //----------------------------------------------------------------------------
  const toggleModal = async (bool) => {
    setIsModalVisible(!isModalVisible);
    if (bool===false) {
      await AsyncStorage.setItem("marketModal", Api.formatDate(new Date())+'-'+props.temp_mt_id);
    }
  };
  //----------------------------------------------------------------------------
  const bannerList = () => {
    var args = {
      resultItem: {result: 'Y'},
      arrItems: [
        { bn_idx: 1, bn_image: 'http://dmonster1544.cafe24.com/dummy_images/banner1.png', },
        { bn_idx: 2, bn_image: 'http://dmonster1544.cafe24.com/dummy_images/banner2.png', },
      ]
    };
      var resultItem = args.resultItem;
      var arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        const thumbs = arrItems.map( item => {
          return item.bn_image
        });
        const rs = <CusCarousel navigation={props.navigation} items={arrItems} thumbs={thumbs} />;
        setDetail_header(rs);
      }
  }
  //----------------------------------------------------------------------------
  const getData = (pagination=0, refresh=refreshing) => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setNewListData([]);
        setBestListData([]);
        setSaleListData([]);
      }
      
      setRefreshing(false);

      foryoulist(refresh);
      newlist(refresh);
      bestlist(refresh);
      salelist(refresh);

    } catch(e) {
      console.log('catch!!!>>', e);
    }
  }
  const newlist = (refresh) => {
    var args = {
      resultItem: {result: 'Y'},
      arrItems: {
        totalCount: 0,
        items: [
          {pt_idx: 1, st_name: '젝스믹스', pt_title: '셀라업텐션 조거팬츠', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_120450.jpg', is_new: 'Y', is_delivery: 'Y'},
          {pt_idx: 2, st_name: '안다르', pt_title: '에어소프트 조거핏 레깅스', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '10K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_102457.jpg', is_new: 'N', is_delivery: 'N'},
          {pt_idx: 3, st_name: '룰루레몬', pt_title: '에어코튼 시리 시그니처', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '7K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_101959.jpg', is_new: 'Y', is_delivery: 'N'},
        ]
      }
    };
    let resultItem = args.resultItem;
    let arrItems = args.arrItems.items;
    if (resultItem.result === 'Y' && arrItems.length) {
      setNewListData(refresh ? arrItems : newListData.concat(arrItems));
      setNewListDataNull(false);
    } else {
      setNewListDataNull(true);
    }
  }

  const salelist = (refresh) => {
    var args = {
      resultItem: {result: 'Y'},
      arrItems: {
        totalCount: 0,
        items: [
          {pt_idx: 1, st_name: '젝스믹스', pt_title: '셀라업텐션 조거팬츠', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_120450.jpg', is_new: 'Y', is_delivery: 'Y'},
          {pt_idx: 2, st_name: '안다르', pt_title: '에어소프트 조거핏 레깅스', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_102457.jpg', is_new: 'N', is_delivery: 'N'},
          {pt_idx: 3, st_name: '룰루레몬', pt_title: '에어코튼 시리 시그니처', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_101959.jpg', is_new: 'Y', is_delivery: 'N'},
        ]
      }
    };
    let resultItem = args.resultItem;
    let arrItems = args.arrItems.items;
    if (resultItem.result === 'Y' && arrItems.length) {
      setSaleListData(refresh ? arrItems : saleListData.concat(arrItems));
      setSaleListDataNull(false);
    } else {
      setSaleListDataNull(true);
    }
  }

  const bestlist = (refresh) => {
    var args = {
      resultItem: {result: 'Y'},
      arrItems: {
        totalCount: 0,
        items: [
          {pt_idx: 1, st_name: '젝스믹스', pt_title: '셀라업텐션 조거팬츠', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_120450.jpg', is_new: 'Y', is_delivery: 'Y'},
          {pt_idx: 2, st_name: '안다르', pt_title: '에어소프트 조거핏 레깅스', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_102457.jpg', is_new: 'N', is_delivery: 'N'},
          {pt_idx: 3, st_name: '룰루레몬', pt_title: '에어코튼 시리 시그니처', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_101959.jpg', is_new: 'Y', is_delivery: 'N'},
        ]
      }
    };
    let resultItem = args.resultItem;
    let arrItems = args.arrItems.items;
    if (resultItem.result === 'Y' && arrItems.length) {
      setBestListData(refresh ? arrItems : bestListData.concat(arrItems));
      setBestListDataNull(false);
    } else {
      setBestListDataNull(true);
    }
  }

  const foryoulist = (refresh) => {
    var args = {
      resultItem: {result: 'Y'},
      arrItems: {
        totalCount: 0,
        items: [
          {pt_idx: 1, st_name: '젝스믹스', pt_title: '셀라업텐션 조거팬츠', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_120450.jpg', is_new: 'Y', is_delivery: 'Y'},
          {pt_idx: 2, st_name: '안다르', pt_title: '에어소프트 조거핏 레깅스', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_102457.jpg', is_new: 'N', is_delivery: 'N'},
          {pt_idx: 3, st_name: '룰루레몬', pt_title: '에어코튼 시리 시그니처', pt_selling_price: '32000', pt_price: '32000', sale_per_t: '10%', wish_cnt: '15K', pt_image1: 'http://dmonster1544.cafe24.com/dummy_images/20200917_101959.jpg', is_new: 'Y', is_delivery: 'N'},
        ]
      }
    };
    let resultItem = args.resultItem;
    let arrItems = args.arrItems.items;
    if (resultItem.result === 'Y' && arrItems.length) {
      setListData(refresh ? arrItems : listData.concat(arrItems));
      setListDataNull(false);
    } else {
      setListDataNull(true);
    }
  }

  const _handleRefresh = async () => {
    setIsLoading(true);
    setRefreshing(true);
    getData();

    setIsVisible(false);
  }
  const renderHeader = () => (
    <View>
      {listData.length===0 && listDataNull===true ?
      <View style={[styles.container2, styles.bg0]}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : null}
    </View>
  );
  const renderHeaderNew = () => (
    <View>
      {newListData.length===0 && newListDataNull===true ?
      <View style={[styles.container2, styles.bg0]}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : null}
    </View>
  );
  const renderHeaderBest = () => (
    <View>
      {bestListData.length===0 && bestListDataNull===true ?
      <View style={styles.container2}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : null}
    </View>
  );
  const renderHeaderSale = () => (
    <View>
      {saleListData.length===0 && saleListDataNull===true ?
      <View style={styles.container2}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : null}
    </View>
  );
  const _renderItem = ({item, index}) => (
    <ProductLi navigation={props.navigation} key={index} items={item} isWish={true} numColumns={2} />
  );
  
  //----------------------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);
  const wrapLayout = (e) => {
    var {width, height, x, y} = e;
    setHeadHeight(y + (Platform.OS === 'ios'?getStatusBarHeight()+56:56));
  }
  const toggleSwitch = (bool) => {
    setIsVisible(!isVisible)
    Keyboard.dismiss();
  }
  //------------------------------------------------------------------------------
  const contentScreen = (idx) => {
    if (idx) {
      props.navigation.navigate('ContentDetail', { idx: idx });
    }
  }

  return(
    <Container>
      <HeaderWrap title={''} navigation={props.navigation} route={props.route} type={'home'} toggle={true} toggleSwitch={toggleSwitch.bind(this)} />
      <Content ref={c => { global.appContent = c; }}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={_handleRefresh} /> }
        onLayout={(event) => { wrapLayout(event.nativeEvent.layout) }}
        >
        
        { detail_header }
        <View style={[styles.bg1]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuScrollCenter}>
            {tabArr.map((arr, index) => (<MenuTab title={arr.name} key={index} check={arr.name==='HOME'?true:false} onPress={() => { }} />))}
          </ScrollView>
        </View>

        {/* { detail_info ?
        <View style={{marginBottom: 18, marginTop: 10}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            { detail_info }
          </ScrollView>
        </View> : null} */}

        {props.mt_id ?
        <View style={{marginBottom: 30, marginTop: 10}}>
          <View style={[styles.contentWrap4]}>
            <Text style={[styles.subTitle05]}><Text style={[styles.txtStrong]}>{props.mt_name?props.mt_name+'님':null}</Text>{' 만을 위한 추천!'}</Text>
          </View>
          {listData.length ? <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.line01, {marginHorizontal: 20, paddingBottom: 2}]}>
            {listData.map((item, index) => _renderItem({item, index}))}
          </ScrollView> : null}
          {renderHeader()}
          <View style={{borderBottomWidth: 4, borderColor: '#222', width: 86, marginLeft: 20}} />
        </View> : null}

        <View style={{marginBottom: 30}}>
          <View style={[styles.contentWrap4, styles.rowVerticalCenterB]}>
            <Text style={[styles.subTitle05]}>{'NEW 이번주 신상'}</Text>

          </View>
          {newListData.length ? <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.line01, {marginHorizontal: 20, paddingBottom: 2}]}>
            {newListData.map((item, index) => _renderItem({item, index}))}
          </ScrollView> : null}
          {renderHeaderNew()}
          <View style={{borderBottomWidth: 4, borderColor: '#222', width: 86, marginLeft: 20}} />
        </View>

        { renderHeaderBest() }
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16}}>
          {bestListData.length ? bestListData.map((item, index) => _renderItem({item, index})) : null}
        </View>

        <View style={[styles.bg0, styles.contentWrap2, {paddingTop: 8}]}>
          {props.aceo || props.abizno ?
          <View style={{marginBottom: 16}}>
            <Text style={styles.txtInfo}><Text style={[styles.text4, styles.clr4]}>{props.abizname} . {'대표자'}</Text>&nbsp; {props.aceo}</Text>
            <Text style={styles.txtInfo}><Text style={[styles.text4, styles.clr4]}>{'사업자등록번호'}</Text>&nbsp; {props.abizno}</Text>
            {props.abizelc ? <Text style={styles.txtInfo}><Text style={[styles.text4, styles.clr4]}>{'통신판매업'}</Text>&nbsp; {props.abizelc}</Text> : null}
            <Text style={styles.txtInfo}><Text style={[styles.text4, styles.clr4]}>{'주소'}</Text>&nbsp; {props.aaddress}</Text>
            <Text style={styles.txtInfo}><Text style={[styles.text4, styles.clr4]}>{'이메일문의'}</Text>&nbsp; {props.aemail}</Text>
            <Text style={styles.txtInfo}><Text style={[styles.text4, styles.clr4]}>{'고객센터'}</Text>&nbsp; {props.acallno}{props.abiz_hours}</Text>
          </View> : null}
          <Text style={styles.txtInfo}>
            <Text style={[styles.text4, styles.clr4]}>{'CREWONLY는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 CREWONLY는 상품거래정보 및 거래에 대한 책임을 지지 않습니다. 상품 및 거래에 관하여 보다 정확한 정보는 해당 판매자에게 직접확인하여 주시기 바랍니다.'}</Text>
          </Text>
        </View>
        <View style={[styles.bg0, {paddingBottom: 20}]} />
      </Content>

      {isKeyboardVisible===false ? <FooterWrap actMenu={"home"} navigation={props.navigation} count={pageLoadingCount} /> : null}
      {/* <Fcm navigation={props.navigation} /> */}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    mt_name: state.login.mt_name,
    loginInfo: state.login,

    idx: state.index.idx,
    idx1: state.index.idx1,
    last_mt_id: state.rconf.last_mt_id,
    recommend: state.rconf.recommend,

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
    abiz_hours: state.sconf.abiz_hours,
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
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

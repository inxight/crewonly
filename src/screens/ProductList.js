import React, { Component, useEffect, useState, useRef, createRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, FlatList, RefreshControl, ActivityIndicator, Dimensions, Keyboard, Platform, Alert } from 'react-native';
import { Container, Content, Button, Footer, FooterTab } from 'native-base';
import { ScrollView as GScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Modal from "react-native-modal";

import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import ShopLi from '../components/ShopLi'
import ProductLi from '../components/ProductLi'
import CartModal from '../components/CartModal'
import { BtnSubmit, Btn01, BtnTab, CusCheckbox, PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

export function ListCheckbox(props){
  return(
    <View></View>
  );
}

function ProductList(props){
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);

  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [tabIndex, setTabIndex] = useState(0);
  const [tabArr, setTabArr] = useState(['상품','상점']);

  const [sstArr1, setSstArr] = useState(['인기순','낮은 가격 순','높은 가격 순','평가 좋은 순','주문 많은 순']);
  var sstArr = sstArr1.map((arr, index) => {
    return { key: index, label: arr, value: index+1 }
  });

  const [sca, setSca] = useState(props.route.params.sca);
  const [stx, setStx] = useState(props.route.params.stx);
  const [sst, setSst] = useState(1);
  const [market_idx, setMarket_idx] = useState('');

  const [isVoucher, setIsVoucher] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isCheckedCate, setIsCheckedCate] = useState();
  const [isCheckedCateName, setIsCheckedCateName] = useState(props.route.params.sca_name ? props.route.params.sca_name : '');
  const [isClickedCate, setIsClickedCate] = useState(props.route.params.sca); //0
  const [listCheckbox, setListCheckbox] = useState();
  const listview = useRef(false);
  const [isClicked, setIsClicked] = useState(false);
  //--------
  const [marketListData, setMarketListData] = useState([]);
  
  const [cartModalIdx, setCartModalIdx] = useState('');

  const [headerTop, setHeaderTop] = useState(Platform.OS === 'ios'?getStatusBarHeight()+56:56);
  const [detailHeight, setDetailHeight] = useState(0);
  const [headHeight, setHeadHeight] = useState(0);
  const deviceHeight = Dimensions.get("window").height;
  // Platform.OS === "ios"
  //   ? Dimensions.get("window").height
  //   : ExtraDimensions.get("REAL_WINDOW_HEIGHT") - ExtraDimensions.get("STATUS_BAR_HEIGHT");
  
  useEffect(()=>{
    mounted.current = true;
    if (mounted.current) {
      Api.send('category_list', { }, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems.items;
        if (resultItem.result === 'Y') {
          setCategories(arrItems);
        }
      });
      //----------------------------------------------------------------------

    }
    return () => {
      mounted.current = false;
    };
  },[]);
  
  useEffect(()=>{
    Keyboard.dismiss();
    
    setStx(props.route.params.stx);
    if (props.idx!=='ProductList' && props.idx1!=='ProductList') {
      getData(0, true, sca, stx, );
    }
  },[props.idx, props.idx2, props.route.params]);

  const getData = (pagination=0, refresh=refreshing, cate="", keyword="", market="", voucher="", sort="", tabI=0, isClickedCat) => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setTotalCount(0);
        setPageLoading(true);
      }
      
      var params = { item_count: rows*pagination, limit_count: rows };
      if (props.mt_id) {
        params.mt_id = props.mt_id;
        params.mt_idx = props.mt_idx;
      }
      if (market) { params.mk_idx = market; }
      if (keyword) { params.search_txt = keyword; }
      if (voucher) { params.is_voucher = voucher; }
      if (cate) { params.sel_ct_id = cate; }
      if (sort) { params.sst = sort; }

      var method = 'product_list';
      // console.log(params, listData.length, refresh, pagination, method, cate, isClickedCat);
      Api.send(method, params, (args)=>{
        //console.log('sql:', args.arrItems.sql);
        setPageLoading(false);
        
        let resultItem = args.resultItem;
        let arrItems = args.arrItems.items;
        if (resultItem.result === 'Y' && arrItems) {
          setListData(refresh ? arrItems : listData.concat(arrItems));
          setTotalCount(args.arrItems.totalCount);
          setIsLoading(false);
          setRefreshing(false);
          setFetchingStatus(arrItems.length === 0 ? false : true);
          setListDataNull(false);
        } else {
          setRefreshing(false);
          setFetchingStatus(false);
          setListDataNull(true);
        }
      });

    } catch(e) {
      console.log('catch!!!>>', e);
      setIsLoading(true);
      setRefreshing(false);
      setFetchingStatus(false);
    }
  }

  const _handleRefresh = () => {
    setIsLoading(true);
    setRefreshing(true);
    getData(0, true, sca, stx);
  }

  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false){
        setIsLoading(true);
        setRefreshing(false);
        getData(fetchingStatus ? page + 1 : page, false, sca, stx);
      }
    }
  }

  const renderHeader = () => (
    <View>
      {listData.length===0 && listDataNull===true ?
      <View style={styles.container2}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : null}
    </View>
  );
  const renderFooter = () => (
    <View>
      {( fetchingStatus && isLoading )
      ? <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 4 }} />
      : <View style={{paddingBottom: 24}} />}
    </View>
  );
  
  const _renderItem = ({item, index}) => (
    <ProductLi navigation={props.navigation} key={index} items={item} keyword={stx} screen={'ProductList'} isWish={false} onPressCart={onPressCart.bind(this)} />
  );
  const _renderItemShop = ({item, index}) => (
    <ShopLi navigation={props.navigation} key={index} items={item} keyword={stx} screen={'ProductList'} />
  );
  //----------------------------------------------------------------------------
  const onPressTab = (val) => {
    setTabIndex(val);
    getData(0, true, sca, stx);
  };
  //----------------------------------------------------------------------------
  const toggleVoucher = (val) => {
    Keyboard.dismiss();

    var val = !isVoucher;
    setIsVoucher(val);
    getData(0, true, sca, stx);
  }
  //----------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const onPressToggle = (val, lbl) => {
    setSst(val);
    getData(0, true, sca, stx);
  }
  //----------------------------------------------------------------------------
  const [isSortVisible, setIsSortVisible] = useState(false);
  
  const wrapLayout = (e) => {
    var {x, y, width, height} = e;
    setDetailHeight(height*1);
  }
  const wrapLayoutCate = (e) => {
    var {x, y, width, height} = e;
    setHeadHeight(height*1);
  }
  
  const onPressCart = (val) => {
    setCartModalIdx(val);
  }

  return(
    <Container>
      <HeaderWrap title={isCheckedCateName} navigation={props.navigation} route={props.route} type={stx?'search':''} keyword={stx} right={isClickedCate==='13'?'none':null} />
      {( fetchingStatus && isLoading ) ? null : (pageLoading ? <PageLoadingIcon /> : null)}


      <Content 
        onScroll={event => handleScroll(event)}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={_handleRefresh} /> }>
      </Content>
      <FooterWrap actMenu={"search"} navigation={props.navigation} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    loginInfo: state.login,
    cart_cntB: state.login.cart_cntB,
    cart_sumB: state.login.cart_sumB,
    
    idx: state.index.idx,
    idx1: state.index.idx1,
    idx2: state.index.idx2,
    
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_idx:(idx) => {
      dispatch(ActionCreator.updateIndex(idx));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

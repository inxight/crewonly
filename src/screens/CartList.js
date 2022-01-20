import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Platform } from 'react-native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ProductRowLi from '../components/ProductRowLi'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, CusCheckbox, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

export function ListCheckbox(props){
  return(
    <View></View>
  );
}

function CartList(props){
  const dispatch = useDispatch();

  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(50);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalSellPrice, setTotalSellPrice] = useState(0);
  const [ct_qtys, setQtys] = useState([]);

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isCheckedShop, setIsCheckedShop] = useState([]);
  const [listCheckbox, setListCheckbox] = useState();
  const [display_price, setDisplay_price] = useState('');
  
  useEffect(()=>{
    if (props.idx) {
      props.set_idx('');
    }
    getData(0, true);
  },[props.idx]);

  const getData = (pagination=0, refresh=refreshing, cate="", keyword="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setTotalCount(0);
      }
      
      var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id};
      // console.log(params, listData.length, refresh, cate, keyword);
      
      setFetchingStatus(false);
      setListDataNull(true);

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
    getData(0, true);
  }
  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false){
        setIsLoading(true);
        setRefreshing(false);
        getData(fetchingStatus ? page + 1 : page, false);
      }
    }
  }
  //------------------------------------------------------------------------------
  const toggleSwitchAll = () => {
    if (isCheckedAll) {
      let newArray = [];
      setIsChecked(newArray);
      sumCalcPrice(newArray);
      let newArray2 = listData.map((arr, i) => { return false; });
      setIsCheckedShop(newArray2);
    } else {
      let newArray = [];
      listData.map((arr, i) => {
        if (arr.items) {
          arr.items.map((arr2, i2) => { return newArray.push(arr2.ct_idx); })
        }
      });
      setIsChecked(newArray);
      sumCalcPrice(newArray);
      // let newArray2 = listData.map((arr, i) => { return arr.mt_seller_idx; });
      let newArray2 = listData.map((arr, i) => { return true; });
      setIsCheckedShop(newArray2);
    }
    setIsCheckedAll(!isCheckedAll);
  }
  
  //----------------------------------------------------------------------------
  
  const Submit_frm = (act) => {
    if (isChecked.length) {
      if (act==='delete') {
        
      }
      if (act==='buy') {
        
      }
    } else {
      cusToast((act==='buy'?'구매할':'삭제할')+' '+'항목을 하나 이상 선택해주세요');
    }
  }
  //------------------------------------------------------------------------------
  const renderHeader = () => (
    <View>
      {listData.length ? 
      <View>
        <View style={[styles.listCheckWr]}>
          <CusCheckbox check={isCheckedAll} name={'전체선택'}
            nameComponent={<Text style={[styles.text6, styles.ff1m, {letterSpacing: -0.2}]}> ({isChecked.length}<Text style={{color: '#aaa'}}> / {totalCount}</Text>)</Text>}
            onPress={toggleSwitchAll.bind(this)} 
            cusStyle={{width: 'auto'}}
            cusStyle2={[styles.listCheck, {paddingLeft: 16}]}
            cusStyle3={styles.listCheckTxt} />
          <View style={[styles.rowVerticalCenter, {marginTop: 2}]}>
            <TouchableOpacity style={styles.listBtn} onPress={() => Submit_frm('delete')}>
              <Text style={styles.listBtnTxt}>{'선택삭제'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      : null}
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
      : null}
    </View>
  );
  const _renderItem = ({item, index}) => (
    <View key={index} style={{paddingTop: 4}}>
      
    </View>
  );
  
  return (
    <Container>
      <HeaderWrap title={'Cart'} navigation={props.navigation} route={props.route} idx={props.idx} />
      <View style={{flex: 1}}>
        <FlatList
          data={listData}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
          // onScroll={event => handleScroll(event)}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>

    </Container>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    mt_is_info1: state.login.mt_is_info1,
    idx: state.index.idx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set_idx:(idx) => {
      dispatch(ActionCreator.updateIndex(idx));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);

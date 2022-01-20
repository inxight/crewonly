import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button, CheckBox } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ReviewLi from '../components/ReviewLi'
import ProductRowLi from '../components/ProductRowLi'
import { BtnFrmline, PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function ReviewList(props){
  const [pageLoading, setPageLoading] = useState(true);

  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);

  // const [isWish, setIsWish] = useState([]);
  const [tabIndex, setTabIndex] = useState(2);

  useEffect(()=>{
    getData(0, true, tabIndex);
  },[props.idx, props.route.params]);
  
  const getData = (pagination=0, refresh=refreshing, cate="", keyword="", sst="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setPageLoading(true);
      }

      var method = 'review_order_list';//'review_list'
      var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id, mylist: 'true' };
      // console.log(params);
      Api.send(method, params, (args)=>{
        setPageLoading(false);

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setListData(refresh ? arrItems : listData.concat(arrItems));
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
    getData(0, true, tabIndex);
  }

  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false) {
        setIsLoading(true);
        setRefreshing(false);
        //getData(fetchingStatus ? page + 1 : page, false, tabIndex);
        getData(page + 1, false, tabIndex);
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
      : null}
    </View>
  );
  const _renderItem = ({item, index}) => (
    <View key={index}>
      {/* isWish={isWish[index]} */}
      {tabIndex===2?
      <View style={[styles.contentWrap3, {paddingTop: 0}]}>
        <View style={[styles.rowVerticalCenter, {flex: 1, marginBottom: 6}]}>
          <View style={[styles.rowVerticalCenter, {flex: 1}]}>
            <Text style={[styles.text1, styles.clr3, styles.ff2l]}>{'주문번호'} &nbsp;</Text>
            <Text style={[styles.text4, styles.clr4, styles.ff2m, {letterSpacing: -0.4}]}>{item.ot_code}</Text>
          </View>
          <Text style={[styles.txtDate, styles.text4, styles.clr4]}>{item.ct_date}</Text>
        </View>
        {/* <Text style={styles.text7}>{item.ct_pdate}</Text> */}
        <TouchableOpacity onPress={() => onPressDetail(item.ot_code, item.pt_idx, item.st_idx, item.st_type)} style={props.cusStyle1} activeOpacity={1}>
          <ProductRowLi index={index} items={item} navigation={props.navigation} size={48} type={'option'}
            cusStyle={[styles.bg0, {paddingHorizontal: 12, paddingVertical: 12, paddingTop: 12, borderRadius: 6, marginBottom: 4}]} />
        </TouchableOpacity>
        {item.rt_idx ?
        <View>
          <ReviewLi navigation={props.navigation} items={item} index={index} screen={'MyReviewList'} cusStyle={{paddingTop: 0, borderBottomWidth: 0}}
            // isWish={isWish} setIsWish={setIsWish.bind(this)} 
          />
          {item.rt_cancel_reason && item.rt_status==='N' ? 
          <View style={[styles.contentWrap3, {paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#f6f6f6'}]}>
            <Text style={[styles.text6]}>
              <Text style={[styles.ff1m, styles.text6, styles.txtStrong, {letterSpacing: -0.5}]}>{'리뷰거절사유'} : </Text>
              {item.rt_cancel_reason}
            </Text>
          </View> : null}

          <View style={[styles.rowVerticalCenterB, {paddingBottom: 16}]}>
            <View style={{flex: 1}} />
            <View style={[styles.rowVerticalCenter]}>
              {item.is_modify==='Y'? 
              <BtnFrmline title={"수정"} onPress={() => Submit_frm('update', item.ct_type, item.rt_idx, item.ot_code, item.ot_pcode)} style={[styles.btn_st4, {width: 90}]} /> : null}
              {/* <View style={{marginHorizontal: 6}} /> */}
              {/* <BtnFrmline title={"삭제"} onPress={() => Submit_frm('delete', item.ct_type, item.rt_idx)} style={[styles.btn_st4, styles.btn_bg2, {width: 90}]} textStyle={styles.clr1} /> */}
            </View>
          </View>
        </View>
        :
        (item.is_modify==='Y'? 
        <BtnFrmline title={'리뷰작성'} onPress={() => Submit_frm('input', item.ct_type, '', item.ot_code, item.ot_pcode)} style={[styles.btn_st3, styles.btn_bg0, {marginBottom: 16}]} textStyle={[styles.txtStrong]} />
        : <View style={{width: '100%', paddingTop: 6, paddingBottom: 10}}><Text style={[styles.text1, styles.clr4, {textAlign: 'center'}]}>{'리뷰작성 기한이 지났습니다.'}</Text></View>)}

        <View style={styles.line01} />
      </View>
      :
      <View style={[styles.listItems3, {paddingBottom: 0}]}>
        <View style={[styles.rowVerticalCenterB, {paddingBottom: 16}]}>
          <Text style={[styles.subTitle00, styles.ff1b]}>{item.ct_date}</Text>
        </View>
        
        {item.items ? 
        item.items.map((arr, i) => 
        (<View key={i}>
          <TouchableOpacity onPress={() => onPressDetail(arr.ot_code)} activeOpacity={1}>
            <ProductRowLi index={i} items={arr} navigation={props.navigation} cusStyle={{paddingHorizontal: 0, alignItems: 'flex-start'}} type={'option'} />
          </TouchableOpacity>
          <BtnFrmline title={'리뷰작성'} onPress={() => props.navigation.navigate('ReviewWrite', {ot_code: arr.ot_code, ot_pcode: arr.ot_pcode})} style={[styles.btn_st3, styles.btn_bg0, {flex: 1, marginBottom: 16}]} textStyle={[styles.txtStrong]} />
        </View>)) : null}
        
      </View>}
    </View>
  );
  const onPressDetail = (val, val1, val2, val3) => {
    if (tabIndex===2) {
      if (val3==='F') {
        props.navigation.navigate('ProductShopDetail', {st_idx: val2});
      } else {
        props.navigation.navigate('ProductDetail', {pt_idx: val1});
      }
    } else {
      props.navigation.navigate('OrderDetail', {ot_code: val})
    }
  };

  const Submit_frm = (act, ct_type, val, val1, val2) => {
    if (act==='delete') {
      var params = { mt_id: props.mt_id, idx: val };
      Api.send(method, params, (args)=>{

        let resultItem = args.resultItem;
        if (resultItem.result === 'Y') {
          props.set_idx(props.route.name);
        }
      });
    } else if (act==='update') {
      if (ct_type==='B') {
        props.navigation.navigate('ReviewWrite', {idx: val, ot_code: val1})
      } else {
        props.navigation.navigate('ReviewWrite', {idx: val, ot_code: val1, ot_pcode: val2})
      }
    } else {
      if (ct_type==='B') {
        props.navigation.navigate('ReviewWrite', {ot_code: val1, screen: 'MyReviewList'})
      } else {
        props.navigation.navigate('ReviewWrite', {ot_code: val1, ot_pcode: val2, screen: 'MyReviewList'})
        // props.navigation.navigate('ReviewProduct', {ot_code: val1})
      }
    //props.navigation.navigate('ReviewWrite', {ot_code: item.ot_code, ot_pcode: item.ot_pcode})
    }
  };

  const onPressTab = (val) => {
    setTabIndex(val);
    getData(0, true, val);
  };

  return(
    <Container>
      <HeaderWrap title={'나의 리뷰'} navigation={props.navigation} route={props.route} />
      {( fetchingStatus && isLoading ) ? null : (pageLoading ? <PageLoadingIcon /> : null)}
      <View style={{flex: 1}}>
        <FlatList
          data={listData}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
          onScroll={event => handleScroll(event)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);

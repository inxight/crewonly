import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, CusCheckbox, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

export function ListCheckbox(props){
  return(
    <View></View>
  );
}

function AddressList(props){
  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);

  const [act, setAct] = useState(props.route.params.act);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState(props.route.params.act?'':[]);
  const [listCheckbox, setListCheckbox] = useState();

  useEffect(()=>{
    if (props.idx) {
      props.set_idx('');
    }
    getData(0, true);
  },[props.idx, props.route.params]);
  
  const getData = (pagination=0, refresh=refreshing, cate="", keyword="", sst="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
      }

      var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id };
      // Api.send('', params, (args)=>{

      //   let resultItem = args.resultItem;
      //   let arrItems = args.arrItems;
      //   if (resultItem.result === 'Y') {
      //     setListData(refresh ? arrItems : listData.concat(arrItems));
      //     // setPage(page > 0 ? page : page + 1);
      //     setIsLoading(false);
      //     setRefreshing(false);
      //     setFetchingStatus(arrItems.length === 0 ? false : true);
      //     setListDataNull(false);
      //   } else {
      //     setFetchingStatus(false);
      //     setListDataNull(true);
      //   }
      // });
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
    // if (isLoading===false) {
      setFetchingStatus(false);
      setIsLoading(true);
      setRefreshing(true);
      getData(0, true);
    // }
  }

  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false) {
        setIsLoading(true);
        setRefreshing(false);
        getData(fetchingStatus ? page + 1 : page, false);
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
      
    </View>
  );
  
  const Submit_frm = (act, val) => {
    console.log(props.route.params, act, val);
    if (act==='pick') {
      if (isChecked) {
        props.navigation.navigate('PaymentWrite', {mdit_idx: isChecked, ct_idx: props.route.params.ct_idx});
      } else {
        cusToast('항목을 선택해주세요');
      }
    } else if (act==='delete') {
      if (isChecked.length || val) {
            //props.set_idx(props.route.name);
      } else {
        cusToast('삭제할 항목을 하나 이상 선택해주세요');
      }
    } else {
      if (props.route.params.ct_idx) {
        props.navigation.navigate('AddressWrite', {mdit_idx: val, ct_idx: props.route.params.ct_idx});
      } else {
        props.navigation.navigate('AddressWrite', {mdit_idx: val, act: 'mypage'});
      }
    }
  }

  return(
    <Container>
      <HeaderWrap title={'배송지 목록'} navigation={props.navigation} route={props.route} />
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
      {act==='pick' ?
      <Footer style={{height: 56}}>
        <FooterTab style={styles.bg2}>
          <BtnSubmit title={"배송지 선택완료"} onPress={() => Submit_frm(act)} style={styles.btn_st1} />
        </FooterTab>
      </Footer> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);

import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function PointList(props){
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);

  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);

  useEffect(()=>{
    if (props.mt_id) {
      Api.send('member_info', {mt_id: props.mt_id}, (args)=>{
        
        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y' && arrItems) {
          dispatch(loginAction.updateLogin(JSON.stringify(arrItems)));
        }
      });

      getData(0, true);
    } else { props.navigation.replace('Login', {}); }
  },[]);

  const getData = (pagination=0, refresh=refreshing, cate="", keyword="", sst="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setPageLoading(true);
      }

      var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id };
      // if (cate) { params.plt_type = (cate===1?'P':'M'); }
      Api.send('member_point_list', params, (args)=>{
        setPageLoading(false);

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setListData(refresh ? arrItems : listData.concat(arrItems));
          // setPage(page > 0 ? page : page + 1);
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
    // if (isLoading===false){
      setIsLoading(true);
      setRefreshing(true);
      getData(0, true);
    // }
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

  const renderHeader = () => (
    <View>
      <View style={[styles.bg0, styles.contentWrap2, {paddingVertical: 26}]}>
        <View style={[styles.container1]}>
          <Text style={[styles.subTitle06, styles.txtStrong]}>{Api.comma(props.mt_point?props.mt_point:0)}P</Text>
          <Text style={[styles.text7, styles.ff1b, {marginTop: 4}]}>{'총 보유 포인트'}</Text>
        </View>
      </View>

      {listData.length===0 && listDataNull===true ?
      <View style={styles.container2}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : null}
    </View>
  );
  const renderFooter = () => {
    return (
      <View>
        {( fetchingStatus && isLoading )
        ? <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 4 }} />
        : null}
      </View>
    )
  }
  const _renderItem = ({item, index}) => (
    <View key={index} style={[styles.listItems1, {paddingVertical: 20}]}>
      <View style={{flex: 1}}>
        <Text style={styles.listItems1_subj}>{item.plt_memo}</Text>
        <Text style={[styles.txtDate]}>{item.plt_wdate.replace(/&nbsp;/gi,' ')}</Text>
      </View>
      <Text style={[styles.subTitle01, (item.plt_price<0?{color: '#999'}:styles.txtStrong)]}>{Api.comma(item.plt_price)}P</Text>
    </View>
  );

  return(
    <Container>
      <HeaderWrap title={'포인트'} navigation={props.navigation} route={props.route} />
      {( fetchingStatus && isLoading ) ? null : (pageLoading ? <PageLoadingIcon /> : null)}
      <View style={[{flex: 1}]}>
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
    mt_point: state.login.mt_point,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PointList);

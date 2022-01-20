import React, { PureComponent, useState, useEffect } from 'react';
import { View, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import ProductRowLi from '../components/ProductRowLi'
import { PageLoadingIcon, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';

function MainNew(props){
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
  const [pageLoadingCount, setPageLoadingCount] = useState(0);

  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);

  useEffect(()=>{
    getData(0, true);
  },[props.route.params]);

  const getData = (pagination=0, refresh=refreshing, cate="", keyword="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setPageLoading(true);
        setPageLoadingCount(pageLoadingCount+1);
      }
      
      var method = '';
      var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id };
      // console.log(params);
      Api.send(method, params, (args)=>{
        setPageLoading(false);
        
        let resultItem = args.resultItem;
        let arrItems = args.arrItems.items;
        if (resultItem.result === 'Y' && arrItems) {
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
    getData(0, true);
  }

  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false){
        setIsLoading(true);
        setRefreshing(false);
        getData(page + 1, false);
      }
    }
  }
  
  const renderHeader = () => (
    <View>
      {listData.length===0 && listDataNull===true ?
      <View style={styles.container2}>
        <Text style={[styles.txtEmpty]}>{'등록된 자료가 없습니다'}</Text>
      </View> : <View />}
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
  const _renderItem = ({item, index}) => {
    return(
    <View key={index}>
    </View>
    )
  };

  return (
    <Container style={styles.bg0}>
      <HeaderWrap title={''} navigation={props.navigation} route={props.route} />
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
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNew);

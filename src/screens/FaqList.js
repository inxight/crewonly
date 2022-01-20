import React, {Component, useEffect, useState} from 'react';
import { View, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Dimensions, } from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import FaqLi from '../components/FaqLi'
import { Btn01, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function FaqList(props){
  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  
  const [sca, setSca] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    Api.send('category_list', { tbl: 'faq', ct_class: 2 }, (args)=>{

      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        setCategories(arrItems.items);
        setSca(arrItems.items[0].ct_id);
        
        getData(0, true, arrItems.items[0].ct_id);
      }
    });
  },[]);

  const getData = (pagination=0, refresh=refreshing, cate="", keyword="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
        setTotalCount(0);
      }

      var method = 'faq_list';
      var params = { item_count: rows*pagination, limit_count: rows, mt_idx: props.mt_idx, fa_class: 2 };
      if (cate) { params.sel_ct_id = cate; }
      if (method) {
        Api.send(method, params, (args)=>{

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
      }
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
    getData(0, true, sca);
  }
  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false){
        setIsLoading(true);
        setRefreshing(false);
        getData(fetchingStatus ? page + 1 : page, false, sca);
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
    <FaqLi navigation={props.navigation} items={item} key={index} />
  );
  const onPressTab = (val) => {
    setSca(val);
    getData(0, true, val);
  };

  return(
    <Container>
      <HeaderWrap title={'자주하는 질문'} navigation={props.navigation} route={props.route} right={'none'} />
      {categories.length?
      <View style={[styles.menuWr, {borderBottomWidth: 0, paddingBottom: 12}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuScrollCenter}>
          {categories.map((arr, index) => 
          (<Btn01 key={index} title={arr.ct_name} check={sca===arr.ct_id?true:false} onPress={() => { onPressTab(arr.ct_id) }}
            style={[sca===arr.ct_id?styles.btn_bg1:styles.bg1, {marginVertical: 10, marginHorizontal: 4, paddingHorizontal: 14}]}
            textStyle={[sca===arr.ct_id?styles.clr1:styles.txtStrong, {fontSize: 15}]} />))}
        </ScrollView>
      </View> : null}
      
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
    mt_idx: state.login.mt_idx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqList);

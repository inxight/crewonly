import React, { PureComponent, useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function BoardList(props) {
  const dispatch = useDispatch();
  const [headTitle, setHeadTitle] = useState('');
  const [bo_table, setBo_table] = useState(props.route.params.bo_table);

  const [listData, setListData] = useState([]);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [listDataNull, setListDataNull] = useState(false);

  let headTitle1 = "";
  if (bo_table==='notice') { headTitle1 = "공지사항";
  } else if (bo_table==='event') { headTitle1 = "이벤트";
  } else { headTitle1 = "게시판"; }

  useEffect(()=>{
    if (bo_table==='notice') { headTitle1 = "공지사항";
    } else if (bo_table==='event') { headTitle1 = "이벤트";
    } else { headTitle1 = "게시판"; }
    setHeadTitle(headTitle1);
    
    _getData(0, true);
  },[]);

  const _getData = (pagination=0, refresh=refreshing, cate="", keyword="") => {
    try {
      setPage(pagination);
      if (pagination===0) {
        setListData([]);
      }

      let method = '';
      if (bo_table==='notice') {
        method = 'notice_list';
      }
      var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id, nt_class: 2 };
      Api.send(method, params, (args)=>{
        
        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setListData(refresh ? arrItems : listData.concat(arrItems));
          setIsLoading(false);
          setRefreshing(false);
          setFetchingStatus(arrItems.length === 0 ? false : true);
          setListDataNull(false);
        } else {
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

  const _handleRefresh = (val) => {
    setIsLoading(true);
    setRefreshing(true);
    _getData(0, true, val);
  }

  const handleScroll = (e) => {
    let scrollY = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading===false){
        setIsLoading(true);
        setRefreshing(false);
        _getData(fetchingStatus ? page + 1 : page, false);
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
    (<TouchableOpacity key={index} onPress={() => onPressDetail(item.nt_idx, item)} style={ styles.listItems3 }>
      <View style={[styles.rowVerticalCenter, {paddingBottom: 6}]}>
        <View style={{maxWidth: Dimensions.get('window').width-80}}><Text numberOfLines={1} style={[styles.listItems2_subj]}>{item.nt_title}</Text></View>
        {item.is_new==='Y'?<View style={[styles.notiCountBox2]}><Text style={styles.cartCount}>{'N'}</Text></View>:null}
      </View>
      <Text style={styles.txtDate}>{item.nt_wdate.replace(/&nbsp;/gi,' ')}</Text>
    </TouchableOpacity>)
  );

  const onPressDetail = (val, item) => {
    if (item.is_new==='Y') {
        setListData(listData => {
            const result = [...listData];
            const index = listData.indexOf(item);
            result[index].is_new = 'N';
            return result;
        });
    }
    props.navigation.navigate('BoardDetail', {idx: val, bo_table: bo_table});
  }
  const backAction = (str) => {
      var newArray = props.loginInfo;
      newArray.updateTime = Api.formatDateTime(new Date(),'YmdHis');
      dispatch(loginAction.updateLogin(JSON.stringify(newArray)));
      
      if (str) {
        props.navigation.goBack();
      }
  }

  return (
    <Container>
      <HeaderWrap title={headTitle} navigation={props.navigation} route={props.route} right={'none'} backAction={() => backAction('back')} />
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
    loginInfo: state.login,
    updateTime: state.login.updateTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);

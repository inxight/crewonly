import React, { PureComponent, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { Container, Content, Footer, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { BtnSubmit, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

function QaList(props){
    const dispatch = useDispatch();
    const [mylist, setMylist] = useState(props.route.params.mylist);
    const [shop_id, setShop_id] = useState(props.route.params.shop_id);
    const [pt_idx, setPt_idx] = useState(props.route.params.pt_idx);

    const [listData, setListData] = useState([]);
    const [rows, setRows] = useState(20);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [fetchingStatus, setFetchingStatus] = useState(false);
    const [listDataNull, setListDataNull] = useState(false);

    useEffect(()=>{
        setMylist(props.route.params.mylist);
        setShop_id(props.route.params.shop_id);
        setPt_idx(props.route.params.pt_idx);
        getData(0, true);
    },[props.route.params]);

    const getData = (pagination=0, refresh=refreshing, cate="", keyword="") => {
        try {
            setPage(pagination);
            if (pagination===0) {
                setListData([]);
            }

            var method = 'qna_list';
            var params = { item_count: rows*pagination, limit_count: rows, mt_id: props.mt_id };
            if (shop_id || pt_idx) { method = 'product_detail_qna'; }
            if (shop_id) { params.st_idx = shop_id; }
            if (pt_idx) { params.pt_idx = pt_idx; }
            if (mylist) { params.mylist = 'true'; }
            Api.send(method, params, (args)=>{

                let resultItem = args.resultItem;
                let arrItems = args.arrItems.items;
                if (resultItem.result === 'Y' && arrItems) {
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
        <TouchableOpacity key={index} onPress={() => onPressDetail(item.qt_idx, item)} style={styles.listItems3}>
            <View style={[styles.rowVerticalCenter, {marginBottom: 8}]}>
                <Text style={[styles.text1, styles.ff1m, (item.qt_status==='3'?styles.clr5:styles.clr2), {marginRight: 8}]}>{item.qt_status==='3'?'답변완료':item.qt_status==='2'?'처리중':'답변대기'}</Text>
                <Text style={styles.txtDate}>{item.qt_wdate}</Text>
                {item.is_new==='Y'?<View style={[styles.notiCountBox2]}><Text style={styles.cartCount}>{'N'}</Text></View>:null}
            </View>
            <Text numberOfLines={1} style={[styles.listItems1_subj, styles.ff1b]}>{item.qt_content}</Text>
        </TouchableOpacity>
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
        props.navigation.navigate('QaDetail', {qt_idx: val});
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
            <HeaderWrap title={'1:1문의'} navigation={props.navigation} route={props.route} right={'none'} backAction={() => backAction('back')} />
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
            <Footer style={{height: 56}}>
                <FooterTab style={styles.bg2}>
                    <BtnSubmit title={"문의하기"} onPress={() => props.navigation.navigate('QaWrite', {})} style={styles.btn_st1} />
                </FooterTab>
            </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(QaList);

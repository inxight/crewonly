import React, {Component, useEffect, useState, useRef} from 'react';
import { View, Image, TouchableOpacity, TextInput, ActivityIndicator, Dimensions, Platform, Keyboard, } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';
import HeaderWrap from '../components/Header'
import FooterWrap from '../components/Footer'
import cusToast from '../components/CusToast'
import { Text } from '../components/BOOTSTRAP';

import {connect} from 'react-redux';
import ActionCreator from '../redux/actions';

function ProductSearch(props){
  const mounted = useRef(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [stx, setStx] = useState('');
  const [listData0, setListData0] = useState([]);
  const [listData1, setListData1] = useState([]);

  useEffect(()=>{
    mounted.current = true;
    if (mounted.current) {

      Api.send('search_fav_list', { }, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setListData0(arrItems);
        }
      });

      Api.send('search_lasted_list', { mt_idx: props.mt_idx }, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setListData1(arrItems);
        }
      });
    }
    
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
    return () => {
      mounted.current = false;
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  },[]);

  //----------------------------------------------------------------------------
  const searchItem = (val) => {
    var str = val==='search' ? stx.trim() : val.trim();
    if (str) {
        props.navigation.navigate('ProductList', {stx: str, sca: ''});
    } else {
      cusToast('검색어가 없습니다.');
      return false;
    }
  }
  //----------------------------------------------------------------------------
  const searchDel = (val) => {
    if (val) {
      const newArray = listData1.filter((arr, index) => {
        return arr.idx !== val;
      });
      setListData1(newArray);
    }
  }

  return(
    <Container>
      <HeaderWrap title={''} navigation={props.navigation} route={props.route} type={'search'} right={'none'} keyword={''} />
      <Content>
        <View style={[styles.contentWrap3]}>
          <View style={[styles.subTitleWr, styles.pt24, {marginBottom: 14}]}>
            <Text style={styles.subTitle00}>{'인기검색어'}</Text>
          </View>
          <View style={[styles.rowVerticalCenter, {flexWrap: 'wrap'}]}>
            {listData0.length ? listData0.map((item, index) => {
              return item ? 
                (<TouchableOpacity key={index} style={styles.keywordBox} onPress={() => searchItem(item)}>
                  <Text style={[styles.keywordTxt]}>#{item}</Text>
                </TouchableOpacity>) : null
            }) : <View style={styles.keywordBox}><Text style={[styles.keywordTxt]}>{'검색어가 없습니다.'}</Text></View>}
          </View>
          
          <View style={[styles.subTitleWr, styles.pt24, {marginBottom: 10}]}>
            <Text style={styles.subTitle00}>{'최근검색어'}</Text>
          </View>
          <View style={[styles.rowVerticalCenter, {flexWrap: 'wrap'}]}>
            {listData1.length ? listData1.map((item, index) => {
              return item.slt_txt ? 
                (<View key={index} style={[props.mt_id?styles.keywordBox:styles.searchBox]}>
                  <TouchableOpacity style={{paddingTop: 1, paddingRight: 1}} onPress={() => searchItem(item.slt_txt)}>
                    <Text style={[styles.keywordTxt]}>{item.slt_txt}</Text>
                  </TouchableOpacity>
                  {props.mt_id ?
                  <TouchableOpacity style={styles.searchIcn} onPress={() => searchDel(item.idx)} activeOpacity={1}>
                    <View style={styles.container1}><Icon name={'x'} size={14} color={'#666'} /></View>
                  </TouchableOpacity> : null}
                </View>) : null
            }) : <View style={styles.searchBox}><Text style={[styles.keywordTxt]}>{'검색어가 없습니다.'}</Text></View>}
          </View>
        </View>
      </Content>
      {isKeyboardVisible===false ? <FooterWrap actMenu={"search"} navigation={props.navigation} /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);

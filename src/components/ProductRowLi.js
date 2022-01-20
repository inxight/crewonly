import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';
import { CusImage, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function ProductRowLi(props) {
  let item = props.items;
  
  const onPressDetail = (val) => {
    if (props.navigation) {
      if (item.st_type==='F') {
        props.navigation.navigate('ProductShopDetail', {st_idx: item.st_idx});
      } else {
        props.navigation.navigate('ProductDetail', {pt_idx: val});
      }
    }
  };
  
  return (
    <View key={props.index} style={[styles.listItems1, {borderBottomWidth: 0, paddingTop: 0}, props.cusStyle]}>
      <TouchableOpacity onPress={() => onPressDetail(item.pt_idx)} style={props.cusStyle1} activeOpacity={1}>
        <CusImage uri={item.pt_image1} width={props.size?props.size:72} height={props.size?props.size:72} cusStyle={{borderRadius: 4}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPress?props.onPress:null} style={{flex: 1, paddingLeft: 16}} activeOpacity={1}>
        {item.st_name ? <Text style={[styles.text3, styles.clr4, {marginBottom: 1}]}>{item.st_name}</Text>:null}
        <Text style={[styles.itemSubj, styles.ff1m, {marginBottom: 1}, props.textStyle]} numberOfLines={2}>{item.pt_title}</Text>
        {/* {item.orderCnt ? <Text style={styles.text8}>{Api.comma(item.orderCnt)}{'개 구매중'}</Text> : null} */}
        {props.type==='option'&&item.ct_opt_value ? <Text style={[styles.text8, {marginBottom: 4}]}>{item.ct_opt_value}</Text> : null}
        <View style={styles.rowVerticalCenterB}>
          {props.type==='option'&&item.ct_price?<Text style={[styles.text1, styles.ff1m]}><Text style={[styles.txtPriceN, styles.ff2l, props.textStyle]}>{Api.comma(item.ct_price)}{item.display_price}</Text> / {item.ct_opt_qty}</Text>:null}
          {props.type==='option'&&item.ct_status_txt ? <Text style={[styles.text1, styles.ff1sb, (item.ct_status*1<10?styles.txtStrong:null)]}>{item.ct_status_txt}</Text> : null}
        </View>
        <View style={[styles.rowVerticalCenter]}>
        {props.screen==='cart'&&(item.pt_jaego==='0'||item.pt_jaego===0)?
          <View style={[styles.listtypeBox, {backgroundColor: '#E93323'}]}><Text style={[styles.text4, styles.ff2l, styles.clr1]}>{'품절'}</Text></View>
         : null}
         {item.ct_refund_price>0?<View style={[styles.listtypeBox, {backgroundColor: '#F89318'}]}><Text style={[styles.text4, styles.ff2l, styles.clr1]}>{'환불'}</Text></View> : null}
         </View>
      </TouchableOpacity>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRowLi);
import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import styles from '../style/Style';
import { CusImage, Score_Star, Text } from '../components/BOOTSTRAP';
import Api from '../Api';

import { connect } from 'react-redux';

function ReviewLi(props) {
  let item = props.items;
  const [isWish, setIsWish] = useState(item.wish_chk==='Y'?true:false);
  const [wishCount, setWishCount] = useState(item.wishCnt);
  // const [galleryIndex, setGalleryIndex] = useState(0);
  // const [visible, setIsVisible] = useState(false);
  
  const onPressGallery = (index) => {
    props.navigation.navigate('GalleryDetail', {total: item.rt_img.length, index: index, arrItems: item.rt_img});
  };
  const onPressWish = (val, pt_idx) => {
    if (props.mt_id) {
      if (props.mt_id !== item.mt_id) {
        Api.send('wish_input', { rel_item: val, rel_table: 'review', mt_id: props.mt_id }, (args)=>{
          
          let resultItem = args.resultItem;
          let arrItems = args.arrItems;
          if (resultItem.result === 'Y') {
            setWishCount(arrItems.wishCnt);
          }
        });
      }
    } else {
      Alert.alert(
        'CREWONLY',
        ("회원에게 제공되는 서비스입니다.\n로그인 후 이용해 주세요."),
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'Login', onPress: () => { props.navigation.navigate('Login', {screen: 'ProductDetail', param: {return_screen: 'Main', pt_idx: pt_idx}}); } },
        ],
        { cancelable: false }
      );
    }
  };
  //--
  const [isClicked, setIsClicked] = useState('');
  const onPressToggle = (val) => {
    console.log(val);
    if (isClicked === val) {
      setIsClicked('');
    } else {
      setIsClicked(val);
    }
  }
  //--

  return (
    <TouchableOpacity key={props.index} style={[styles.listItems3, {paddingHorizontal: 0}, props.cusStyle]} onPress={() => onPressToggle(props.index)} activeOpacity={1}>
      <View style={[styles.rowVerticalCenterB, {paddingVertical: 12}, props.cusStyle1]}>
        <View style={[styles.rowVerticalCenter, {flex: 1}]}>
          <Score_Star score={item.rt_score} />
          <Text style={[styles.text6, styles.ff2m]}> {item.rt_score}</Text>
        </View>
        {props.mt_id===item.mt_id?null:
        <TouchableOpacity onPress={() => props.navigation.navigate('SingoWrite', {idx: item.rt_idx})} style={{borderBottomWidth: 1, borderColor: '#999'}}>
          <Text style={[styles.text1, styles.clr2]}>{'신고'}</Text>
        </TouchableOpacity>}
      </View>

      <Text style={[styles.text6, {lineHeight: 18}]}>{item.rt_content}</Text>{/* numberOfLines={isClicked === props.index?0:2} */}
      
      {item.rt_img.length > 0 ? // && isClicked === props.index
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 12}}>
        {item.rt_img.slice(0, item.rt_img.length).map((arr, i) => {
          return (<TouchableOpacity key={i} onPress={() => onPressGallery(i)} style={{marginLeft: (i===0?0:8)}}>
            <CusImage uri={arr} width={60} height={60} cusStyle={{borderRadius: 6}} />
            </TouchableOpacity>)
        })}
      </ScrollView> : null}

      {props.screen==='ProductDetail' && item.pt_titles.length ? <View style={[styles.rowVerticalCenter, {flexWrap: 'wrap', marginTop: 8, marginBottom: 2}]}>
        {item.pt_titles.map((arr,i)=>{
          return <View key={i} style={[styles.searchBox, {paddingVertical: 4, paddingHorizontal: 10}]}><Text style={styles.text6}>{arr}</Text></View>
        })}
      </View> : null}

      <View style={[styles.rowVerticalCHorizonR, {flex: 1}]}>
        {item.mt_name ? <Text style={[styles.mbnick]}>{item.mt_name}</Text> : null}
        {item.mt_name ? <View style={{width: 3, height: 3, borderRadius: 3/2, backgroundColor: '#ccc', marginHorizontal: 8}}></View> : null}
        <Text style={[styles.txtDate]}>{item.rt_wdate}</Text>
      </View>

    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewLi);
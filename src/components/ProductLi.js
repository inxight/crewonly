import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';
import { CusImage, Text } from '../components/BOOTSTRAP.js';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function ProductLi(props) {
  let item = props.items;

  const itemWidth = (Dimensions.get('window').width-32);
  const [numColumns, setNumColumns] = useState(props.numColumns);
  const [isWish, setIsWish] = useState(item.wish_chk==='Y'?true:false);
  
  const onPressDetail = (val, st_idx) => {
    var screen = "ProductDetail";
    var param = {pt_idx: val};
    if (props.navigate==='push') {
      props.navigation.dispatch(
        StackActions.push(screen, param)
      );
    } else {
      props.navigation.navigate(screen, param)
    }
  };
  
  const onPressWish = (val, str) => {
    if (props.mt_id) {
      // Api.send('wish_input', { rel_table: 'product', rel_item: val, mt_id: props.mt_id }, (args)=>{
      //   let resultItem = args.resultItem;
      //   if (resultItem.result === 'Y') {
          setIsWish(str);

          if (props.screen==='ProductList' || props.screen==='ShopDetail') {
            props.set_idx('', props.screen, new Date());
          } else {
            props.set_idx(props.screen, '', new Date());
          }
      //   }
      // });
    } else {
      Alert.alert(
        'CREWONLY',
        ("회원에게 제공되는 서비스입니다.\n로그인 후 이용해 주세요."),
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'Login', onPress: () => { props.navigation.navigate('Login', {screen: props.screen, param: {return_screen: 'Main', stx: (props.keyword?props.keyword:'')}}); } },
        ],
        { cancelable: false }
      );
    }
  };
  
  const onPressCart = (val) => {
    props.onPressCart(val);
  };

  return (
    <TouchableOpacity key={props.index} style={{paddingBottom: numColumns===3?10:24, marginBottom: (props.spacing?props.spacing:0), width: (numColumns===3? itemWidth*0.33 : itemWidth*0.5)}} onPress={() => onPressDetail(item.pt_idx, item.st_idx)} activeOpacity={1}>
      <View style={{overflow: 'hidden', alignSelf: 'center'}}>
        {item.is_delivery==='Y'||item.is_new==='Y'?
        <View style={{position: 'absolute', bottom: 8, left: 4, zIndex: 2}}>
          {item.is_new==='Y'?<View style={[styles.listtypeBox, {backgroundColor: '#F3937C', marginRight: 0}]}>
            <Text style={[styles.text4, styles.ff1m, styles.clr1]}>{'NEW'}</Text>
          </View>:null}
          {item.is_delivery==='Y'?<View style={[styles.listtypeBox, {backgroundColor: '#000', marginRight: 0}]}>
            <Text style={[styles.text4, styles.ff1m, styles.clr1]}>{'무료배송'}</Text>
          </View>:null}
        </View>:null}

        <CusImage uri={item.pt_image1} width={( numColumns===3? itemWidth*0.33 : itemWidth*0.5 )-8} height={(numColumns===3? itemWidth*0.33 : itemWidth*0.5)+30} cusStyle={{borderRadius: 7}} />
        
        <View style={{position: 'absolute', top: 8, right: 8}}>
          {props.isWish!=false?
          <TouchableOpacity onPress={() => onPressWish(item.pt_idx, (isWish===true?false:true))} 
          style={[styles.wishBtn1, {marginBottom: 4}]}>
            {isWish===true ? <Image source={require('./../images/ico_heart_p.png')} style={styles.imgContain} />
            : <Image source={require('./../images/ico_heart_w.png')} style={styles.imgContain} />}
          </TouchableOpacity> : null}
        </View>
      </View>
      <View style={{marginHorizontal: 4, paddingTop: 10}}>
        {item.st_name ? 
        <View style={[styles.rowVerticalCenter, {marginBottom: 2}]}>
          <Text numberOfLines={1} style={[styles.text7, styles.ff1b]}>{item.st_name}</Text>
        </View> : null}
        <Text numberOfLines={2} style={[styles.itemSubj, numColumns===3?{fontSize: 13}:null]}>{item.pt_title}</Text>
        <View style={[styles.rowVerticalCenter, {marginTop: 6}]}>
          {item.sale_per_t ? <Text style={[styles.txtPriceBig, styles.txtStrong]}>{item.sale_per_t} &nbsp;</Text> : null}
          {/* {item.pt_selling_price ? <Text style={[styles.txtPriceDc, styles.ff1r]}>{Api.comma(item.pt_selling_price)}</Text> : null} */}
          <Text style={[styles.txtPriceBig]}>{Api.comma(item.pt_price)}</Text>
        </View>
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
    set_idx:(idx, idx1, idx2) => {
      dispatch(ActionCreator.updateIndex(idx, idx1, idx2));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLi);
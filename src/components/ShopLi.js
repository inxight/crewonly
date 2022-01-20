import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';
import { CusImage, CusTag, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function ShopLi(props) {
  let item = props.items;
  const [isWish, setIsWish] = useState(item.wish_chk==='Y'?true:false);
  
  const onPressDetailShop = (item) => {
    props.navigation.navigate('ShopDetail', {st_idx: item})
  };

  return (
    <TouchableOpacity key={props.index} style={[styles.listItems2, {paddingTop: 0, paddingBottom: 24}]} onPress={() => onPressDetailShop(item.st_idx)} activeOpacity={1}>
      <CusImage uri={item.st_image2} width={Dimensions.get('window').width-40} height={148} cusStyle={{borderRadius: 4}} />
      <View style={[styles.rowVerticalCenter, {marginTop: 16, marginBottom: 7, flexWrap: 'wrap'}]}>
        <Text style={[styles.item2Subj, styles.ff1b]}>{item.st_name}</Text>
      </View>
    </TouchableOpacity>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopLi);
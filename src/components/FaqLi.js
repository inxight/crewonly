import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Badge, Text as Textnb } from 'native-base';
import styles from '../style/Style';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import { Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';

function FaqLi(props) {
  let item = props.items;

  const [isClicked, setIsClicked] = useState('');
  const onPressToggle = (val) => {
    if (isClicked === val) {
      setIsClicked('');
    } else {
      setIsClicked(val);
    }
  }

  return (
    <TouchableOpacity onPress={()=> onPressToggle(item.fa_id)}>
      <View style={[styles.listItems1, styles.bg0, {borderBottomWidth: isClicked===item.fa_id?0:1}]}>
        {item.num ?
        <View style={[styles.bg1, styles.container0, {width: 26, height: 26, marginRight: 10, borderRadius: 26/2}]}>
          <Text style={[styles.text4, styles.clr1, styles.ff1sb]}>{item.num}</Text>
        </View> : null}
        <Text style={[styles.subTitle00, {flex: 1}]}>{item.fa_subject}</Text>
        <Icon name={isClicked===item.fa_id?'chevron-up':'chevron-down'} style={[styles.selectBoxIcn2]} />
      </View>
      {isClicked===item.fa_id ? <View style={[styles.contentWrap4]}>
        <View><Text style={[styles.text1, {lineHeight: 18}]}>{item.fa_content}</Text></View>
      </View> : null}
    </TouchableOpacity>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqLi);
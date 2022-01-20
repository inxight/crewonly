import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import styles from '../style/Style';
import Api from '../Api';
import { Text } from '../components/BOOTSTRAP';

export default function Coupon(props) {
  let item = props.items;

  return (
    <View style={[styles.contentWrap1, {marginBottom: 14, paddingHorizontal: 16}]}>
      <ImageBackground style={{ width: '100%', height: Dimensions.get('window').width*0.38}} source={require('./../images/coupon_bg.png')} resizeMode="cover">
        <View style={{justifyContent: 'center', flex: 1}}>
          <View style={[styles.listItems1, styles.couponLi]}>
            <View style={{flex: 1, paddingVertical: 4}}>{/* , paddingRight: 14 */}
              <View style={[styles.rowVerticalCenter, {paddingBottom: 2}]}>{/* paddingBottom: (item.cp_method_lbl || item.cp_target_lbl ? 10 : 0) */}
                <Text style={[styles.subTitle06, (item.disable_msg?styles.clr4:styles.txtStrong)]}>{Api.comma(item.cp_price)}</Text>
                <Text style={[styles.subTitle05, (item.disable_msg?styles.clr4:null)]}>{item.cp_display_price}</Text>
              </View>
              {/* {item.cp_method_lbl ? <View><Text style={styles.subTitle00}>{item.cp_method_lbl}</Text></View> : null} */}
              {/* {item.cp_target_lbl ? <View style={{paddingBottom: 8, paddingTop: 6}}><Text style={styles.text7}>{item.cp_target_lbl}</Text></View> : <View style={{paddingBottom: 8}} />} */}
              <Text style={[styles.text2, styles.ff1m, (item.disable_msg?styles.clr4:null)]}>{item.cp_subject}</Text>
              {item.cp_minimum || item.cp_maximum?
              <View style={{marginTop: 4}}>
                {item.cp_minimum ? <View style={{marginTop: 2}}><Text style={styles.text4}>{'최소주문금액 '+Api.comma(item.cp_minimum)+'원'}</Text></View> : null}
                {item.cp_maximum ? <View style={{marginTop: 2}}><Text style={styles.text4}>{'최대할인 '+Api.comma(item.cp_maximum)+'원'}</Text></View> : null}
              </View> : null}
              
              {/* <View style={[styles.rowVerticalCenter, {marginTop: 4}]}>
                {item.diff_date ? <Text style={[styles.text6, styles.clr4]}>{Api.comma(item.diff_date)}{'일 남음'}</Text> : null}
                {item.diff_date && item.cp_end ? <View style={{marginLeft: 2}} /> : null}
                {item.cp_end ? <Text style={[styles.text6, styles.clr4]}>({item.cp_end})</Text> : null}
              </View> */}
            </View>
            <View style={{borderWidth: 1, borderStyle: 'dashed', borderRadius: 1, borderColor: '#e3e3e3', width: 1, height: '100%'}}></View>
            <View style={[styles.container1, {flex: 0, paddingLeft: 14}]}>
              {item.diff_date ? <View style={{paddingBottom: 8}}><Text style={[styles.text7, styles.txtStrong1, styles.ff1m]}>{Api.comma(item.diff_date)}{'일 남음'}</Text></View> : null}
              {item.cp_end ? <Text style={styles.text8}>{item.cp_end}{'까지'}</Text> : <Text style={styles.text8}>{'만료기한없음'}</Text>}
            </View>
          </View>
          {item.disable_msg ? <View style={{marginHorizontal: 32, marginTop: 2}}><Text style={[styles.text6, {color: 'red'}]}>{item.disable_msg}</Text></View> : null}
        </View>
      </ImageBackground>
    </View>
  );
}

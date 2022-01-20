import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Dimensions, Platform, Alert, Animated } from 'react-native';
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import AntDesignIcon from 'react-native-vector-icons/AntDesign'; AntDesignIcon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import ProductRowLi from '../components/ProductRowLi'
import { BtnSubmit, Text } from '../components/BOOTSTRAP';

import { connect, useDispatch } from 'react-redux';
import ActionCreator from '../redux/actions';
import * as loginAction from '../redux/actions/loginAction';

export function ListCheckbox(props){
  return(
    <View></View>
  );
}

export function Detail_footer(props){
  const dispatch = useDispatch();

  const item = props.items;
  const category_option = props.category_option;
  const category_list = props.category_list;

  const [ct_qty, setQty] = useState([]);
  const [temp_ct, setTemp_ct] = useState(['','','']);
  const [ct_option, setCt_option] = useState([]);
  const [ct_price, setCt_price] = useState(item.pt_option_chk==='1'?item.pt_price:0);

  const [listCheckbox, setListCheckbox] = useState();

  useEffect(() => {
    setCt_price(item.pt_option_chk==='1'?item.pt_price:0);
  },[props.idx]);
  //----------------------------------------------------------------------------
  const onPressQty = (index, mode, jaego) => {
    let max = jaego*1 < item.pt_max_qty*1 ? jaego*1 : item.pt_max_qty*1;
    max = item.pt_max_qty*1===0?jaego*1:max;
    let newArray = ct_qty;
    let val = newArray[index] ? newArray[index]*1 : 1;
    if (mode==='minus' && val > 1) { val--; } else if (mode==='plus') { val++; }
    if (val > max) {
      if (jaego*1 < item.pt_max_qty*1 || item.pt_max_qty*1===0) {
        props.cusToast('재고가 부족합니다. (재고'+Api.comma(max)+'개)');
      } else {
        props.cusToast('최대 '+Api.comma(max)+'개 이하로 구매하실 수 있습니다');
      }
      return false;
    }
    newArray[index] = val+'';
    setQty(newArray);
    
    var ct_prices = 0;
    if (item.pt_option_chk==='1') {
      ct_prices = item.pt_price*val;
    } else {
      ct_option.map((arr, i) => {
        if (index===i) {
          return ct_prices += ((item.pt_price*1)+(arr.price*1))*val
        } else {
          return ct_prices += ((item.pt_price*1)+(arr.price*1))*ct_qty[i]
        }
      });
    }
    setCt_price(ct_prices);
    
    const rs2 = <ListCheckbox checked={true} items={val} />;
    setListCheckbox(rs2);
  };
  //----------------------------------------------------------------------------
  function arrSearch1(nameKey, myArray, key, valueKey) {
    for (var i=0; i < myArray.length; i++) {
      if (key==='value') {
        if (myArray[i].name === nameKey && myArray[i].value === valueKey) {
          return myArray[i];
        }
      } else {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    }
  }
  //----------------------------------------------------------------------------
  const [isClicked, setIsClicked] = useState(1);
  const onPressToggle = (index, val) => {
    if (isClicked === val) {
      setIsClicked('');
    } else {
      if (item.pt_option_type==='2') {
        if (index>0 && temp_ct[index-1] || index===0) {
          setIsClicked(val);
        }
      } else {
        setIsClicked(val);
      }
    }
  }
  const onPressOption = (name,val,index) => {
    setIsClicked('');

    if (name && val) {
      if (ct_option.length>=3) {
        props.cusToast('옵션은 3개까지 선택가능합니다');
        return false;
      }
      let newArray = temp_ct;
      var arr = [];
      if (index===2) {
        arr = [newArray[0],newArray[1],val];
      } else if (index===1) {
        arr = [newArray[0],val,''];
      } else {
        arr = [val,'',''];
      }
      setTemp_ct(arr);

      var nextStep = false;
      if (item.pt_option_type==='2') {
        if (category_list.length-1===index) {
          nextStep = true;
        }
      } else {
        nextStep = true;
      }

      if (nextStep) {
        var search_key = '';
        var ct_chk_value = '';
        if (item.pt_option_type==='2') {
          var ct_chk = arr.join('|:|')+'|:|';
        } else {
          search_key = 'value';
          var ct_chk = category_list[index].name;
          ct_chk_value = arr.join('');
        }
        
        var resultObject = arrSearch1(ct_chk, category_option, search_key, ct_chk_value);
        if (resultObject) {
          setTemp_ct(['','','']);

          var newArray2 = ct_option;
          var is_option = arrSearch1(ct_chk, ct_option, search_key, ct_chk_value);
          if (is_option) {
            props.cusToast('이미 선택한 옵션입니다');
            return false;

            var result = newArray2.filter(function(arr) { // 배열 요소 제거
              return arr.name !== ct_chk
            });
            setCt_option(result);
          } else {
            newArray2.push(resultObject);
            setCt_option(newArray2);

            var ct_prices = 0;
            var qtys = ct_qty;
            newArray2.map((arr, i) => { ct_prices += ((item.pt_price*1)+(arr.price*1))*(ct_qty[i]?ct_qty[i]:1); });
            setCt_price(ct_prices);
            qtys.push(1);
            setQty(qtys);
          }
        }
      }
    }
  };
  const onPressDelete = (index, val, val1) => {
    var newArray2 = ct_option;
    var search_key = '';
    if (item.pt_option_type==='2') {
    } else {
      search_key = 'value';
    }
    var is_option = arrSearch1(val, ct_option, search_key, val1);
    if (is_option) {
      var ct_prices = 0;
      var result = newArray2.filter(function(arr, i) { // 배열 요소 제거
        if (item.pt_option_type==='2') {
          if (arr.name!==val) {
            ct_prices += ((item.pt_price*1)+(arr.price*1))*(ct_qty[i]?ct_qty[i]:1)
          }
          return arr.name !== val
        } else {
          if (!(arr.name === val && arr.value === val1)) {
            ct_prices += ((item.pt_price*1)+(arr.price*1))*(ct_qty[i]?ct_qty[i]:1)
          }
          return !(arr.name === val && arr.value === val1)
        }
      });
      setCt_option(result);
      setCt_price(ct_prices);
      
      var qtys = ct_qty;
      qtys[index] = 0;
      var qty_result = qtys.filter(function(arr) { // 배열 요소 제거
        return arr !== null && arr !== undefined && arr !== '' && arr !== '0';
      });
      setQty(qty_result);
    }
  };
  const Submit_frm = (act) => {
    var params = {act: act, mt_idx: props.mt_idx, pt_idx: item.pt_idx, mk_idx: item.store_t.mk_idx, st_idx: item.store_t.idx, rft_idx: (props.rft_idx?props.rft_idx:''), ct_type: 'A'
      , ct_opt_name: '', ct_opt_value: '', ct_opt_price: '', ct_opt_qty: '', is_modal: 1000 };

    if (!props.mt_idx) {
      params.temp_mt_id = props.temp_mt_id;
    }
  
    var ct_opt_name = '',
        ct_opt_value = '',
        ct_opt_price = '',
        ct_opt_qty = '';
    if (item.product_option_t) {
      ct_option.map((arr, i) => {
        ct_opt_name += category_list.map((arr, i) => { return arr.name });
        if (item.pt_option_type==='2') {
          ct_opt_value += arr.name.replace(/\|:\|/gi,'/').slice(0,-1);
        } else {
          ct_opt_value += arr.value;
        }
        ct_opt_price += ((arr.price*1)+(item.pt_price*1));
        ct_opt_qty += (ct_qty[i]?ct_qty[i]:1);
        if (i < ct_option.length-1) {
          ct_opt_name += '|:|';
          ct_opt_value += '|:|';
          ct_opt_price += '|:|';
          ct_opt_qty += '|:|';
        }
      });
    }
    if (item.pt_option_chk==='1') {
      ct_opt_price = item.pt_price;
      ct_opt_qty = (ct_qty[0]?ct_qty[0]:1);
    }

    params.ct_opt_name = ct_opt_name.replace(/,/gi,'/');
    params.ct_opt_value = ct_opt_value;
    params.ct_opt_price = ct_opt_price;
    params.ct_opt_qty = ct_opt_qty;
    console.log(params);

    if (item.pt_option_chk!=='1') {
      if (!ct_option.length) {
        props.cusToast('옵션을 최소 하나 선택해주세요');
        return false;
      }
    }

    Api.send('cart_input', params, (args)=>{

      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        console.log(arrItems);
        setQty([]);
        setTemp_ct(['','','']);
        setCt_option([]);
        setCt_price(item.pt_option_chk==='1'?item.pt_price:0);
        
        Api.send('member_info', {mt_id: (props.mt_id?props.mt_id:''), temp_mt_id: props.temp_mt_id}, (args1)=>{
      
          let resultItem1 = args1.resultItem;
          let arrItems1 = args1.arrItems;
          if (resultItem1.result === 'Y' && arrItems1) {
            dispatch(loginAction.updateLogin(JSON.stringify(arrItems1)));

            props.cusToast('선택하신 상품을 장바구니에 담았습니다.');
            setTimeout(()=> {
              props.toggleModal();
            }, 1200);
          }
        });
      } else {
        if (resultItem.message) {
          props.cusToast(resultItem.message);
        }
      }
    });
  }

  return(
    <View>
      <View style={[styles.contentWrap4, {paddingTop: 0}]}>
        {item.product_option_t ?
        <View>
          {category_list.map((arr, i) => {
            if (arr.name && arr.items.length) {
            return(
            <View key={i} style={{marginBottom: 5, borderRadius: 6, borderWidth: 1, borderColor: '#dfdfdf', overflow: 'hidden'}}>
              <TouchableOpacity onPress={() => { onPressToggle(i, i+1); }} style={[styles.rowVerticalCenterB, {paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#dfdfdf'}]}>
                <Text style={[styles.dropPickerPh, {lineHeight: 40, flex: 1, color: (temp_ct[i] ? '#333' : '#999')}]}>{arr.name+(temp_ct[i] ? '/'+temp_ct[i] : '')}</Text>
                <Icon name={isClicked === i+1 ?'chevron-up':'chevron-down'} style={[styles.selectBoxIcn1]} />
              </TouchableOpacity>
              {isClicked === i+1 ?
              <ScrollView style={[styles.dropPickerLi, {maxHeight: 130, borderWidth: 0}]}>
                <View style={[{paddingVertical: 6}]}>
                  {arr.items.map((arr2, i2) => (
                  <TouchableOpacity key={i2} onPress={() => onPressOption(arr.name, arr2, i)} style={[styles.rowVerticalCenter, {paddingHorizontal: 12, paddingVertical: 8}]}>
                    <Text style={[styles.dropPickerLabel, {flex: 1}]}>{arr2}</Text>
                    <Text style={[styles.dropPickerLabel, styles.clr4]}>{Api.comma((item.pt_price*1)+(category_option[i2].price*1))} {'원'}</Text>
                  </TouchableOpacity>))}
                </View>
              </ScrollView> : null}
            </View>);
            }
          })}
          
          <View style={{maxHeight: 220}}>
            <ScrollView>
              {ct_option.map((arr, i) => 
              (<View key={i} style={[styles.bg0, {paddingLeft: 24, paddingBottom: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 3, marginTop: (i===0?5:10)}]}>
                <View style={[styles.rowVerticalCenterB]}>
                  <View style={[{flex: 1, flexWrap: 'wrap', paddingTop: 5}, styles.rowVerticalCenter]}>
                    <Text style={styles.text6}>{ (item.pt_option_type==='2') ? (arr.name.replace(/\|:\|/gi,'/ ')).slice(0,-2) : arr.value }
                      <Text style={styles.text1}>&nbsp; ({arr.price? Api.comma((item.pt_price*1)+(arr.price*1)) : Api.comma(item.pt_price)} {'원'})</Text>
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.menuTrigger} onPress={() => onPressDelete(i, arr.name, arr.value)}>
                    <AntDesignIcon name={'close'} size={18} color={'#333'} />
                  </TouchableOpacity>
                </View>
                <View style={[styles.rowVerticalCenterB, {paddingRight: 14}]}>
                  <View style={[styles.optionList]}>
                    <TouchableOpacity onPress={() => onPressQty(i, 'minus', (item.pt_option_type==='2'?arr.jaego:item.pt_jaego))} style={styles.optionListBtn}><Icon name={'minus'} size={14} color={'#666'} /></TouchableOpacity>
                    <View style={styles.optionListQty}>
                      <Text>{ct_qty[i] ? ct_qty[i] : '1'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPressQty(i, 'plus', (item.pt_option_type==='2'?arr.jaego:item.pt_jaego))} style={styles.optionListBtn}><Icon name={'plus'} size={14} color={'#666'} /></TouchableOpacity>
                  </View>
                  <Text style={[styles.text6, styles.clr4]}>최대주문수량 <Text style={styles.ff2m}>{item.pt_max_qty}</Text></Text>
                </View>
              </View>))}
            </ScrollView>
          </View>
        </View> : null}
        {item.pt_option_chk==='1' ?
        <View style={styles.rowVerticalCenterB}>
          <View style={[styles.optionList]}>
            <TouchableOpacity onPress={() => onPressQty(0, 'minus', (item.pt_jaego))} style={styles.optionListBtn}><Icon name={'minus'} size={14} color={'#666'} /></TouchableOpacity>
            <View style={styles.optionListQty}>
              <Text>{ct_qty[0] ? ct_qty[0] : '1'}</Text>
            </View>
            <TouchableOpacity onPress={() => onPressQty(0, 'plus', (item.pt_jaego))} style={styles.optionListBtn}><Icon name={'plus'} size={14} color={'#666'} /></TouchableOpacity>
          </View>
          <Text style={[styles.text6, styles.clr4]}>최대주문수량 <Text style={styles.ff2m}>{item.pt_max_qty}</Text></Text>
        </View> : null}

        <View style={[styles.rowVerticalCenterB, {paddingTop: 20}]}>
          <Text style={styles.subTitle00}>Total</Text>
          <Text style={[styles.txtStrong, {fontSize: 17}]}><Text style={[styles.txtPriceBig, styles.txtStrong]}>{Api.comma(ct_price)}{item.display_price}</Text></Text>
        </View>
      </View>
      {item.pt_jaego*1===0 ? 
      <BtnSubmit title={'상품이 품절되었습니다.'} style={[{borderRadius: 0}, styles.btn_bg2]} disabled={true} />
      :<BtnSubmit title={"장바구니"} style={{borderRadius: 0}} onPress={() => Submit_frm('cart')} />}
    </View>
  );
}

function CartModal(props) {

  const modalToastRef = useRef();
  const toastConfig = {
    'modal': (internalState) => (
      <View style={{ width: '90%', backgroundColor: '#000000e0', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 17 }}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 11.5}}>{internalState.text1}</Text>
      </View>
    ),
  }
  const [toastMsg, setToastMsg] = useState('');
  const topHeight = (Platform.OS=== 'ios'?getStatusBarHeight():0) + 56 + 10;
  const [toastY, setToastY] = useState(new Animated.Value(-topHeight));

  const [isModalVisible, setIsModalVisible] = useState(false);
  const deviceBottom = (Platform.OS === 'ios' && isIphoneX()) ? getBottomSpace() : 0;

  const [listData, setListData] = useState({pt_idx: ''});
  const [detail_footer, setDetail_footer] = useState(<></>);
  
  useEffect(()=>{
    setIsModalVisible(props.idx?true:false);
    getData(props.idx);

    // setToastY(new Animated.Value(-topHeight));
  },[props.idx]);

  const getData = (idx) => {
    if (idx) {
      Api.send('product_detail', { mt_idx: props.mt_idx, pt_idx: idx }, (args)=>{

        let resultItem = args.resultItem;
        let arrItems = args.arrItems;
        if (resultItem.result === 'Y') {
          setListData(arrItems);

          var category_option = [];
          var category_list = [];
          if (arrItems.product_option_t.length) {
            category_option = arrItems.product_option_t.map((arr, index) => {
              return { key: index, name: arr.pot_name, value: arr.pot_value, jaego: arr.pot_jaego, price: arr.pot_price }
            });
            
            category_list = arrItems.pt_option.filter(function(arr) {
              return arr.name !== '' && arr.items.length !== 0;
            });
          }
          const rs1 = <Detail_footer navigation={props.navigation} items={arrItems} idx={idx}
          category_list={category_list} category_option={category_option} toggleModal={toggleModal.bind(this)}
          cusToast={cusToastModal.bind(this)}
          mt_id={props.mt_id} mt_idx={props.mt_idx} temp_mt_id={props.temp_mt_id} />;
          setDetail_footer(rs1);
        }
      });
    }
  }

  const toggleModal = () => {
    // modalToastRef.current.hide();
    setToastMsg('');
    setIsModalVisible(!isModalVisible);
    props.onPressCart('');
  };

  const cusToastModal = (msg) => {
    setToastMsg(msg);
    Animated.timing(toastY, {
      toValue: topHeight,
      delay: 100,
      duration: 200,
      useNativeDriver: true
    }).start();

    setTimeout(()=>{
      Animated.timing(toastY, {
        toValue: -topHeight,
        delay: 500,
        duration: 200,
        useNativeDriver: true
      }).start();
      // setToastMsg('');
    },1200)
    // modalToastRef.current.show({
    //   type: 'modal',
    //   position: 'top',
    //   text1: msg,
    //   text2: "",
    //   visibilityTime: 1000,
    //   autoHide: true,
    //   topOffset: (Platform.OS === 'ios'?56+getStatusBarHeight():0)+10,
    // });
  }
  
  return (
    <Modal isVisible={isModalVisible}
      onSwipeComplete={() => toggleModal()}
      onBackdropPress={() => toggleModal()}
      onBackButtonPress={() => toggleModal()}
      propagateSwipe
      animationInTiming={200}
      backdropOpacity={0.3}
      style={{margin: 0, justifyContent: 'flex-end', paddingBottom: deviceBottom}}>
      {/* style={styles.containerBottom} */}
      
      <Animated.View
        pointerEvents={toastMsg ? 'auto' : 'none'}
        style={[{transform: [{translateY: toastY}], position: 'absolute', top: 0, width: '100%', zIndex: 10 }]}>
        {toastMsg ?
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ width: '90%', backgroundColor: '#000000e0', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 17 }}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 11.5}}>{toastMsg}</Text>
          </View>
        </View> : null}
      </Animated.View>
      {/* <Toast config={toastConfig} ref={modalToastRef} /> */}

      <View style={{marginBottom: -12, zIndex: 2}}>
        <AutoHeightImage width={Dimensions.get('window').width} source={require('./../images/line1.png')} />
      </View>
      <View style={[styles.bottomModal, {alignItems: 'stretch'}]}>
        {listData.pt_idx ?
        <View style={[styles.contentWrap2, styles.rowVerticalCenterB]}>
          <ProductRowLi items={listData} navigation={props.navigation} cusStyle={{paddingBottom: 0, paddingLeft: 0, flex: 1}} />
          <View style={{height: '100%'}}>
            <TouchableOpacity style={[styles.menuTrigger, {height: 32}]} onPress={() => toggleModal()}>
              <AntDesignIcon name={'close'} size={18} color={'#999'} />
            </TouchableOpacity>
          </View>
        </View> : null}
        {detail_footer}
      </View>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    temp_mt_id: state.sconf.temp_mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
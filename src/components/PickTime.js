import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Button } from 'native-base';

import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import FeatherIcon from 'react-native-vector-icons/Feather'; FeatherIcon.loadFont();
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from '../style/Style';
import Api from '../Api';

export default function PickTime(props) {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [sch_date, setSch_date] = useState(props.setDate);
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  
  const [minute_option, setMinute_option] = useState([]);
  const [second_option, setSecond_option] = useState([]);

  useEffect(() => {
    setSch_date(props.setDate?props.setDate:'06:00');

    var str = props.setDate.split(':');
    setMinute(str[0] ? str[0] : '06');
    setSecond(str[1] ? str[1] : '00');

    var arr = [];
    for (var i=0;i<24;i++) {
      var arr_str = i; if (i<10) { arr_str = '0'+i; }
      arr.push({key: i, label: arr_str, value: arr_str});
    }
    setMinute_option(arr);

    var arr = [];
    for (var i=0;i<6;i++) {
      var arr_str = i*10; if (arr_str<10) { arr_str = '0'+arr_str; }
      arr.push({key: i, label: arr_str, value: arr_str});
    }
    setSecond_option(arr);
    
  },[props.setDate]);

  const handleConfirm = () => {
    // console.log(sch_date, props.name);
    setSch_date(minute+':'+second);
    props.settStateTime(props.name, minute+':'+second);
  };

  //----------------------------------------------------------------------------
  const toggleModal = () => {
    setDatePickerVisibility(false);
    handleConfirm();
  };
  return (
    <View style={{width: '100%'}}>
      <Button onPress={() => setDatePickerVisibility(true)} style={[styles.rowVerticalCenterB, styles.textInput, {paddingRight: 8}]}>
        <Text style={{flex: 1, color: '#333', fontSize: 14}}>{sch_date}</Text>
        <Icon name={'clockcircleo'} style={{fontSize: 22, color: '#999', marginRight: 8}} />
      </Button>
      <Modal isVisible={isDatePickerVisible}
          onSwipeComplete={() => toggleModal()}
          onBackdropPress={() => toggleModal()}
          onBackButtonPress={() => toggleModal()}
          propagateSwipe>
        <View style={styles.container1}>
          <View style={[styles.selectModal, {height: 190}]}>
            <View style={[styles.modalTitleTop]}>
              <Text style={[styles.subTitle02]}>시간선택</Text>
              <TouchableOpacity onPress={() => toggleModal()} style={styles.modalClose}>
                <Icon name={'close'} size={22} color={'#111'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.rowVerticalCenter, {flex: 1, width: '100%', paddingHorizontal: 18, marginTop: 12, justifyContent: 'space-between'}]}>
              <View style={{flex: 0.48}}>
                <ModalSelector
                  data={minute_option} initValue="시간 선택"
                  accessible={true} backdropPressToClose={true}
                  cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1, position: 'relative'}}
                  onChange={(option)=>{ setMinute(option.label); }}>
                  <TextInput style={styles.textInput} placeholder={'시간 선택'}
                    value={minute+'시'}
                    autoCorrect={false} editable={false}
                  />
                  <FeatherIcon name={'chevron-down'} style={styles.selectBoxIcn} />
                </ModalSelector>
              </View>
              <View style={{flex: 0.48}}>
                <ModalSelector
                  data={second_option} initValue="분 선택"
                  accessible={true} backdropPressToClose={true}
                  cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1, position: 'relative'}}
                  onChange={(option)=>{ setSecond(option.label); }}>
                  <TextInput style={styles.textInput} placeholder={'분 선택'}
                    value={second+'분'}
                    autoCorrect={false} editable={false}
                  />
                  <FeatherIcon name={'chevron-down'} style={styles.selectBoxIcn} />
                </ModalSelector>
              </View>
            </View>
            <View style={[styles.btnConfirm, {flex: 1, width: '100%', paddingHorizontal: 18, marginTop: 8}]}>
              <Button block onPress={() => {toggleModal();/* handleConfirm();*/}} style={[styles.btnSubmit]}>
                <Text style={styles.btnSubmitTxt}>확인</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
  );
}

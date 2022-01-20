import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Container, Button } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import FeatherIcon from 'react-native-vector-icons/Feather'; FeatherIcon.loadFont();
import {Calendar, CalendarList, LocaleConfig} from 'react-native-calendars';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';

import styles from '../style/Style';
import { Fonts } from '../style/Fonts';
import Api from '../Api';
import { Text } from './BOOTSTRAP';

var minDate = new Date();
minDate.setDate(minDate.getDate());
minDate = Api.formatDate(minDate);

LocaleConfig.locales['kr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
};
LocaleConfig.defaultLocale = 'kr';

export default function PickDate(props) {

  //----------------------------------------------------------------------------
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [sch_date, setSch_date] = useState(props.setDate);
  const [tempDate, setTempDate] = useState(props.setDate ? props.setDate : Api.formatDate(new Date()));
  const [marking, setMarking] = useState();

  //----------------------------------------------------------------------------
  const [isYmVisible, setIsYmVisible] = useState(false);
  const yearArr = [];
  for (var i=1950;i<new Date().getFullYear();i++) {
    yearArr.push(i);
  }
  const yearArr_option = yearArr.map((arr, index) => {
    return { key: index, label: arr }
  });

  const monthArr = [];
  for (var i=1;i<=12;i++) {
    monthArr.push(i<10?'0'+i:i);
  }
  const monthArr_option = monthArr.map((arr, index) => {
    return { key: index, label: arr }
  });
  //----------------------------------------------------------------------------

  useEffect(()=>{
    setSch_date(props.setDate);
    markDate(props.setDate);
    
    setTempDate(props.setDate ? props.setDate : Api.formatDate(new Date())); // 

  }, [props.setDate]);

  const _renderArrow = (direction) => {
    if(direction === 'left') {
        return <View style={[styles.clndArrow, {marginLeft: -12}]}><FeatherIcon name={'chevron-left'} size={18} color={'#D6513C'} /></View>
    } else {
        return <View style={[styles.clndArrow, {marginRight: -12}]}><FeatherIcon name={'chevron-right'} size={18} color={'#D6513C'} /></View>
    }
  }

  const onDayPress = (day) => {
    markDate(day.dateString);
    setTempDate(day.dateString);
  }
  const markDate = (day) => {
    let markDates = {};
    markDates[day] = { selected: true, selectedColor: '#D6513C', marked: true};
    setMarking(markDates);
  }
  const onMonthPress = (day) => {
    // console.log('PickDate month press...', day);
    setIsYmVisible(true);
  }
  
  const handleConfirm = () => {
    setTempDate(tempDate); //''
    markDate(tempDate);
    setSch_date(tempDate);
    props.settStateDate(props.name, tempDate);
  };
  //----------------------------------------------------------------------------
  const toggleModal = () => {
    setDatePickerVisibility(false);
    setIsYmVisible(false);

    setTempDate(sch_date); //''
    markDate(sch_date);
  };
  //----------------------------------------------------------------------------
  const onDayPress2 = (day, type) => {
    if (type==='y') {
      day = day ? day +'-'+ (tempDate ? tempDate.substring(5,7) : Api.formatDate(new Date()).substring(5,7)) : '';
    } else if (type==='m') {
      day = day ? (tempDate ? tempDate.substring(0,4) : Api.formatDate(new Date()).substring(0,4)) +'-'+ day : '';
    }
    day = day ? day +'-'+'01' : ''; // sch_date.substring(8,10)
    setTempDate(day);
  };
  //----------------------------------------------------------------------------

  return (
    <View style={{width: '100%'}}>
      <Button onPress={() => setDatePickerVisibility(true)} style={[styles.rowVerticalCenterB, styles.textInput, {paddingRight: 8}, props.cusStyle]}>
        <Text style={{flex: 1, color: '#333', fontSize: 14}}>{sch_date}</Text>
        <Icon name={'calendar'} style={{fontSize: 20, color: '#999', marginRight: 8}} />
      </Button>
      <Modal isVisible={isDatePickerVisible}
          onSwipeComplete={() => toggleModal()}
          onBackdropPress={() => toggleModal()}
          onBackButtonPress={() => toggleModal()}
          propagateSwipe
          style={{margin: 0}}>
        <View style={[styles.bg2, {borderRadius: 6, overflow: 'hidden', marginHorizontal: 22}]}>
          <CalendarList
            style={{height: 390}}
            theme={{
              todayTextColor: '#D6513C',
              'stylesheet.calendar.header': {
                monthText: {
                  fontSize: 15, fontFamily: Fonts.NanumSquareB, letterSpacing: -0.8,
                },
              },
              textDayFontSize: 13,
              textDayHeaderFontSize: 12,
              textDisabledColor: '#afafaf',
              backgroundColor: '#eaeaea',
              calendarBackground: '#eaeaea'
            }}
            horizontal={true}
            hideExtraDays={true}
            hideArrows={false}
            renderArrow={_renderArrow}
            monthFormat={'yyyy년 MM월'}
            current={tempDate ? tempDate : Api.formatDate(new Date())}
            minDate={props.minDate?"":minDate}
            maxDate={props.maxDate?Api.formatDate(new Date()):''}
            onDayPress={onDayPress}
            onMonthPress={onMonthPress}
            markedDates={marking}

            pagingEnabled={true}
            calendarWidth={(Dimensions.get('window').width-44)}
            scrollEnabled={true}
            showScrollIndicator={false}
            pastScrollRange={60}
            futureScrollRange={60}
          />
          {isYmVisible ? <View style={[styles.btnConfirm1, {width: '100%', paddingHorizontal: 18, marginVertical: 16, flex: 0}]}>
            <ModalSelector
              data={yearArr_option} initValue="연도 선택"
              accessible={true} backdropPressToClose={true}
              cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1}} overlayStyle={styles.selectBox1}
              onChange={(option)=>{ onDayPress2(option.label, 'y'); }}>
              <Text style={[styles.textInput, {lineHeight: 46, paddingVertical: 0}]}>{tempDate ? tempDate.substring(0,4) : Api.formatDate(new Date()).substring(0,4)}년</Text>
              <FeatherIcon name={'chevron-down'} style={styles.selectBoxIcn} />
            </ModalSelector>
            <ModalSelector
              data={monthArr_option} initValue="월 선택"
              accessible={true} backdropPressToClose={true}
              cancelText={'취소'} cancelButtonAccessibilityLabel={'취소'} style={{flex: 1}} overlayStyle={styles.selectBox1}
              onChange={(option)=>{ onDayPress2(option.label, 'm'); }}>
              <Text style={[styles.textInput, {lineHeight: 46, paddingVertical: 0}]}>{tempDate ? tempDate.substring(5,7) : Api.formatDate(new Date()).substring(5,7)}월</Text>
              <FeatherIcon name={'chevron-down'} style={styles.selectBoxIcn} />
            </ModalSelector>
          </View> : null}

          <Button block onPress={() => {toggleModal(); handleConfirm();}} style={[styles.btnSubmit, styles.btn_st1]}>
            <Text style={styles.btnSubmitTxt}>완료</Text>
          </Button>
        </View>
      </Modal>
      
    </View>
  );
}

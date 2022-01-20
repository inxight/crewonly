import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import styles from '../style/Style';
import { BtnFrmline, Text } from '../components/BOOTSTRAP';

export default function CusAlert(props) {

  return (
    <Modal isVisible={props.isVisible}
      // onSwipeComplete={() => props.onPress()}
      // onBackdropPress={() => props.onPress()}
      // onBackButtonPress={() => props.onPress()}
      propagateSwipe
      animationInTiming={200}
      backdropOpacity={0.3}
      style={{margin: 0}}>
      <View style={styles.container1}>
        <View style={[styles.selectModal, {height: 'auto'}]}>

          <View style={[styles.contentWrap2, {paddingBottom: 0}]}>
            <View style={[styles.container1, {flex: 0}]}>
              <View style={{width: 60, height: 60, marginBottom: 14}}>
                <Image source={require('./../images/ico_warning.png')} style={styles.imgContain} />
              </View>
              {props.title ? <View style={{marginBottom: props.message?7:0}}><Text style={[styles.subTitle01, {textAlign: 'center', fontSize: (props.title.length>10?16:18)}]}>{props.title}</Text></View> : null}
              {props.message ? <Text style={[styles.ff1l, styles.text7, {textAlign: 'center', lineHeight: 18}]}>{props.message}</Text> : null}
            </View>
          </View>

          <View style={[styles.contentWrap2, styles.container0]}>
            {props.cancel?
            <View style={{flex: 0.45}}>
              <BtnFrmline title={'닫기'} onPress={() => props.onPress()} style={[{height: 40}, styles.btn_bg2]} textStyle={[styles.text1, styles.clr1]} />
            </View> : null}
            {props.cancel? <View style={{marginHorizontal: 5}} /> : null}
            <View style={{flex: 0.45}}>
              <BtnFrmline title={props.btnName?props.btnName:'닫기'} onPress={() => props.onPress(1)} style={[{height: 40}, (props.cancel?(props.icon==='check1'?styles.btn_bg4:styles.btn_bg1):styles.btn_bg2)]} textStyle={[styles.text1, styles.clr1]} />
            </View>
          </View>
          
        </View>
      </View>
    </Modal>
  );
}

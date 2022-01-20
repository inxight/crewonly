import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import styles from '../style/Style';
import { Text } from '../components/BOOTSTRAP';
import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();

export default function InfoTxt(props) {

  const onPressNav = (id) => {
    props.navigation.navigate('ContentDetail', {idx: id});
  }

  return (
    <View style={[styles.contentWrap4, styles.bg0, {flex: 0, width: '100%', borderTopWidth: 1, borderColor: '#eee'}, props.cusStyle]} onLayout={(event) => { props.onLayout?props.onLayout(event):null }}>
      { props.type==='Register' ?
      <View style={[styles.rowB, {paddingBottom: 6}]}>
        <Icon name={'alert-circle'} size={18} color={'#888'} />
        <View style={{flex: 1, marginLeft: 6}}>
          <Text style={[styles.text6, styles.clr4, {lineHeight: 18}]}>
            {"CREWONLY는 14세 이상만 이용 가능하며 회원가입 또는 서비스를 이용하면 아래 3가지 약관에 동의하는 것입니다."}
          </Text>
          <Text style={[styles.text6, styles.clr4, {lineHeight: 18}]}>
            <TouchableWithoutFeedback onPress={() => {onPressNav('agree1')}} style={styles1.inlineBtn}>
              <View><Text style={[styles.text6, styles.txtStrong]}>{"서비스 이용약관,"}</Text></View>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => {onPressNav('agree2')}} style={styles1.inlineBtn}>
              <View><Text style={[styles.text6, styles.txtStrong]}>{"개인정보 취급방침,"}</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {onPressNav('agree3')}} style={styles1.inlineBtn}>
              <View><Text style={[styles.text6, styles.txtStrong]}>{"위치정보 이용약관"}</Text></View>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      : props.type==='CartList' ?
      <View>
        <View style={[styles.rowVerticalCenter, {marginBottom: 6}]}>
          <Icon name={'alert-circle'} size={18} color={'#888'} />
          <Text style={[styles.text6, styles.clr2, styles.ff1m]}> {"확인해주세요!"}</Text>
        </View>
        <Text style={[styles.text4, styles.clr4, {lineHeight: 20}]}>
          {"· 장바구니 상품은 20일간 저장됩니다.\n · 가격 변경 시 변경된 가격으로 표기됩니다.\n · 옵션이 변경된 경우 상품으로 표시됩니다."}
        </Text>
      </View>
      : props.type==='PaymentWrite' ?
      <View>
        <View style={[styles.rowVerticalCenter, {marginBottom: 6}]}>
          <Icon name={'alert-circle'} size={18} color={'#888'} />
          <Text style={[styles.text6, styles.clr2, styles.ff1m]}> {"확인해주세요!"}</Text>
        </View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{'CREWONLY는 통신판매중개자이며 통신판매의 당사자가 아닙니다.'}</Text>
        </View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{'각 시장 상점에서 등록한 상품, 상품정보 및 거래에 관한 의무와 책임은 판매자에게 있습니다.'}</Text>
        </View>
        <View style={[styles.rowB, {paddingTop: 2}]}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, color: 'red'}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.ff1b, {lineHeight: 18, flex: 1, color: 'red'}]}>{'상품관련 교환 및 환불 문의는 배달완료 후 3시간 이내에 가능합니다.'}</Text>
        </View>
      </View>
      : props.type==='ReviewWrite' ?
      <View>
        <View style={[styles.rowVerticalCenter, {marginBottom: 6}]}>
          <Icon name={'alert-circle'} size={18} color={'#888'} />
          <Text style={[styles.text6, styles.clr2, styles.ff1m]}> {"확인해주세요!"}</Text>
        </View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{'상품평의 취지와 어긋나는 글은 삭제될 수 있습니다.'}</Text>
        </View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{'상품평 작성 후 상품 구매를 취소하실 경우(반품 제외) 작성하신 상품평은 삭제 처리됩니다.'}</Text>
        </View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{'휴대폰번호, 송장번호와 같은 개인 정보의 입력은 금지되어 있습니다.'}</Text>
        </View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{'텍스트 리뷰와 포토리뷰 적립혜택은 중복으로 지급되지 않으며, 포토리뷰작성 포인트는 최초 작성 시 사진을 첨부할 경우에만 적립됩니다.'}</Text>
        </View>
      </View>
      : props.type==='OrderReturn' ?
      <View>
        <View style={styles.rowB}>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{'· '}</Text>
          <Text style={[styles.text4, styles.clr4, {lineHeight: 18, flex: 1}]}>{"계좌이체/가상계좌 환불은 상품의 반품 완료 후 ‘마이페이지 > 내 지갑’으로 입금됩니다."}</Text>
        </View>
      </View>
      : props.type==='DepositWrite' ?
      <View>
        <Text style={[styles.text4, styles.clr4, {lineHeight: 18}]}>{"출금 신청 후 입금까지 "}<Text style={styles.txtStrong}>{"법정 공휴일 제외 2~3일 정도 소요"}</Text>{"됩니다."}</Text>
      </View>
      : null}
    </View>
  );
}


const styles1 = StyleSheet.create({
  inlineBtn: {borderWidth: 0, paddingTop: 0, paddingBottom: 0, elevation: 0}
});
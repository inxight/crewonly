import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
import styles from '../style/Style';

import HeaderWrap from '../components/Header'
import { BtnSubmit, BtnFrmline, Text } from '../components/BOOTSTRAP';

import {connect} from 'react-redux';

function RegisterResult(props){
  const onPressNav = (screen) => {
    if (screen) {
      props.navigation.dispatch(StackActions.replace(screen, {}));
    }
  }
  
  return(
    <Container>
      <HeaderWrap title={'가입완료'} navigation={props.navigation} route={props.route} right={'none'} />
      <Content contentContainerStyle={styles.container1}>
        <View style={{marginVertical: 14}}><Text style={[styles.subTitle06, {textAlign: 'center'}]}>{"회원가입이\n완료되었습니다."}</Text></View>
      </Content>
      <Footer style={{height: 56}}>
        <FooterTab style={styles.bg2}>
          <BtnSubmit title={"홈으로 가기"} onPress={() => props.navigation.navigate('Main')} style={styles.btn_st1} />
        </FooterTab>
      </Footer>
    </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterResult);
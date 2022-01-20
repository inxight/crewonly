import React, { Component, useEffect, useState, useRef } from 'react';
import { ScrollView, View, Image, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Linking } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import cusToast from '../components/CusToast'
import { BtnSubmit, BtnFrmline, CusCheckbox, CusWebview, Text } from '../components/BOOTSTRAP';

import {connect} from 'react-redux';
import ActionCreator from '../redux/actions';

function RegisterAgree(props) {
  const mounted = useRef(false);
  const step = 1;

  const [isLoading, setIsLoading] = useState(true);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeArr, setAgreeArr] = useState([
    {name: '서비스 약관동의', checked: false, id: 'agree1' },
    {name: '개인정보 처리방침', checked: false, id: 'agree2' },
  ]);
  
  const [isClicked, setIsClicked] = useState('');

  //----------------------------------------------------------------------------
  const Submit_frm = () => {
    if (!(agreeArr[0].checked===true && agreeArr[1].checked===true)) {
      cusToast("필수 약관에 동의해주세요");
    } else {
      props.navigation.navigate('Register', {});
    }
  }

  const toggleSwitch = (index, e) => {
    const newArray = [...agreeArr];
    newArray[index].checked = !agreeArr[index].checked;
    setAgreeArr(newArray); // setState({ agreeArr });
    if (newArray[0].checked===true && newArray[1].checked===true) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }

  const toggleSwitchAll = () => {
    const newArray = [...agreeArr];
    newArray[0].checked = !agreeAll;
    newArray[1].checked = !agreeAll;
    setAgreeArr(newArray);
    setAgreeAll(!agreeAll);
  }

  const contentScreen = (val) => {
    if (isClicked === val) {
      setIsClicked('');
    } else {
      setIsClicked(val);
    }
  }

  return(
    <Container>
      <HeaderWrap title={''} navigation={props.navigation} route={props.route} headerStyle={styles.bg0} type={'none'} />
      <Content>
        
        <View style={[styles.contentWrap3]}>
          <View style={styles.mt24}><Text style={[styles.ff2b, styles.text6]}>{props.aname+"는 서비스에 필요한 최소한의 정보만을 수집합니다.\n정보공개에 대한 부담없이 쉽고 편하게 사용하세요."}</Text></View>
          <View style={styles.mt44} />

          {/* <View style={[styles.checkGroup, {borderWidth: 1}]}>
            <CusCheckbox check={agreeAll} name={'전체 약관에 동의합니다.'} onPress={toggleSwitchAll.bind(this)} cusStyle2={{paddingLeft: 12}} cusStyle3={{fontWeight: 'bold'}} />
          </View> */}

          {agreeArr.map((arr, i) =>
          <View key={i}>
            <View style={[styles.btn_st0, styles.btn_bg0, {marginBottom: 14}]}>
              <View style={[styles.checkGroup, {paddingHorizontal: 24, paddingVertical: 8}]}>
                <CusCheckbox check={agreeArr[i].checked} name={arr.name} onPress={toggleSwitch.bind(this, i)} 
                cusStyle={{flex: 1}} cusStyle3={[styles.ff1b]} />
                {agreeArr[i].id ?
                <TouchableOpacity onPress={() => contentScreen(agreeArr[i].id)} style={{paddingVertical: 10}}>
                  <Text style={[styles.ff2b, styles.text1, styles.txtStrong]}>{isClicked === agreeArr[i].id?'닫기':'보기'}</Text></TouchableOpacity>
                : null}
              </View>
            </View>
            
            <View style={[styles.bg0, {borderRadius: 10}, (isClicked === agreeArr[i].id ? {height: 150, marginBottom: 14} : {height: 0, marginBottom: 0})]}>
              <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ paddingHorizontal: 28, paddingVertical: 28 }}>
                {/* {isLoading ? <ActivityIndicator size="large" color="#F44336" style={[{ marginLeft: 4, marginTop: 22 }]} /> : null} */}
                <CusWebview tbl={'reg_agree'} idx={agreeArr[i].id} />
              </ScrollView>
            </View>
          </View>
          )}

        </View>
        <View style={[styles.contentWrap4]}>
          <BtnSubmit title="동의하고 계속하기" onPress={() => Submit_frm()} //disabled={(agreeAll?false:true)}
          />
        </View>
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    aname: state.sconf.aname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAgree);

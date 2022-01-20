import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';

import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { MenuTab, Text, CusWebview } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';

export function Detail_header(props){
    return(
        <HeaderWrap title={props.items} navigation={props.navigation} route={props.route} right={'none'} />
    );
}
export function Detail_info(props){
    return(
        <View style={styles.contentWrap2}>
            <CusWebview tbl={'agree'} idx={props.idx} />
        </View>
    );
}

function ContentDetail(props){
  const [isLoading, setIsLoading] = useState(true);
  const [detail_header, setDetail_header] = useState(<></>);
  const [detail_info, setDetail_info] = useState(<></>);

  const [idx, setIdx] = useState('');//props.route.params.idx
  const [agreeArr, setAgreeArr] = useState([
    {name: '이용약관', id: 'agree1' },
    {name: '개인정보취급방침', id: 'agree2' },
    {name: '위치정보이용약관', id: 'agree3' },
  ]);

  useEffect(() => {
    var headTitle = '약관';
    // switch(props.route.params.idx) {
    //     case 'agree1': headTitle = '이용약관';
    //         break;
    //     case 'agree2': headTitle = '개인정보 취급방침';
    //         break;
    //     case 'agree3': headTitle = '위치정보이용약관';
    //         break;
    // }
    const rs = <Detail_header navigation={props.navigation} route={props.route} items={headTitle} />;
    setDetail_header(rs);
    
    if (props.route.params.idx) {
        setIdx(props.route.params.idx);
        contentScreen(props.route.params.idx);
    } else {
        setIdx('agree1');
        contentScreen('agree1');
    }
    
  },[props.route.params]);
  //----------------------------------------------------------------------------
  const contentScreen = (idx) => {
    if (idx) {
        const rs1 = <Detail_info idx={idx} />;
        setDetail_info(rs1);
        setIsLoading(false);
    }
  }

  return(
    <Container>
        { detail_header }
        <Content>
            {agreeArr.length?
            <View style={[styles.menuWr, styles.rowVerticalCenterB]}>
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuScrollCenter}> */}
                    {agreeArr.map((arr, index) => (<MenuTab key={index}
                    cusStyle={{flex: 1}} cusStyle1={{paddingHorizontal: 0}} cusStyle2={{fontSize: 14, letterSpacing: -0.5}}
                    title={arr.name} check={idx===arr.id?true:false} onPress={() => { setIdx(arr.id); contentScreen(arr.id); }} />))}
                {/* </ScrollView> */}
            </View> : null}
            {isLoading ? <ActivityIndicator size="large" color="#F44336" style={[{ marginLeft: 4, marginTop: 22 }]} /> : null}
            { detail_info }
        </Content>
    </Container>
  );
}

function mapStateToProps(state, props) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetail);

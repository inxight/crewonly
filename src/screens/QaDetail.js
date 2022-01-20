import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { CusImage, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

export function Detail_info(props){
    const item = props.items;

    return(
      <View>
        <View style={styles.listItems3}>
            <View style={[styles.rowVerticalCenter, {marginBottom: 8}]}>
                <Text style={[styles.text1, styles.ff1m, (item.qt_status==='3'?styles.clr5:styles.clr2), {marginRight: 8}]}>{item.qt_status==='3'?'답변완료':item.qt_status==='2'?'처리중':'답변대기'}</Text>
                <Text style={styles.txtDate}>{item.qt_wdate}</Text>
            </View>
            <Text style={[styles.listItems1_subj, styles.ff1b]}>{item.qt_content}</Text>
            {item.qt_file ? <CusImage uri={item.qt_file} width={(Dimensions.get('window').width - 40)} cusStyle={{marginTop: 10}} /> : null}
            {item.qt_answer ? null : 
            <View style={[styles.rowVerticalCHorizonR, {marginTop: 10}]}>
                <View style={{flexWrap: 'wrap'}}>
                    <TouchableOpacity style={styles.listBtn} onPress={() => props.navigation.navigate('QaWrite', {idx: item.qt_idx})}>
                        <Text style={styles.listBtnTxt}>{'수정하기'}</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
        
        {item.qt_answer ? 
        <View style={styles.contentWrap4}>
            <View style={[styles.rowVerticalCenter, {marginBottom: 8}]}>
                <Text style={[styles.text7, styles.ff1m, {marginRight: 8}]}>{item.qt_type==='2'?'판매자':'관리자'}</Text>
                <Text style={styles.txtDate}>{item.qt_adate}</Text>
            </View>
            <Text style={[styles.text6, {lineHeight: 18}]}>{item.qt_answer}</Text>
        </View> : null}
        <View style={{paddingBottom: 24}} />
      </View>
    );
}

function QaDetail(props){
    const [detail_info, setDetail_info] = useState(<></>);
  
    useEffect(() => {
        Api.send('qna_detail', { mt_id: props.mt_id, qt_idx: props.route.params.qt_idx }, (args)=>{

            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y') {
                const rs = <Detail_info navigation={props.navigation} items={arrItems} />;
                setDetail_info(rs);
            }
        });
    },[]);

    return(
      <Container>
        <HeaderWrap title={'1:1문의'} navigation={props.navigation} route={props.route} />
        <Content>
            { detail_info }
        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(QaDetail);

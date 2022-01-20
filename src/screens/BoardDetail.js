import React, { Component, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Alert, Linking } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import Api from '../Api';

import HeaderWrap from '../components/Header'
import { CusImage, CusWebview, Text } from '../components/BOOTSTRAP';

import { connect } from 'react-redux';
//------------------------------------------------------------------------------
export function Detail_header(props){
  return(
    <HeaderWrap title={props.items} navigation={props.navigation} route={props.route} right={'none'} />
  );
}
//------------------------------------------------------------------------------
export function Detail_info(props){
  const item = props.items;

  return(
    <View>
      <View style={styles.listItems3}>
        <Text style={[styles.subTitle01, {paddingBottom: 12}]}>{item.nt_title}</Text>
        <Text style={styles.txtDate}>{item.nt_wdate}</Text>
      </View>
      <View style={styles.contentWrap3}>
        {item.nt_content ? <CusWebview tbl={'notice'} idx={props.idx} /> : null}
      </View>
      <View style={{paddingBottom: 24}} />
    </View>
  );
}

function BoardDetail(props){
  const [detail_header, setDetail_header] = useState(<></>);
  const [detail_info, setDetail_info] = useState(<></>);
  let headTitle = "";
  const bo_table = props.route.params.bo_table,
        idx = props.route.params.idx;

  useEffect(() => {
    Api.send('notice_detail', { mt_id: props.mt_id, nt_idx: idx }, (args)=>{

      let resultItem = args.resultItem;
      let arrItems = args.arrItems;
      if (resultItem.result === 'Y') {
        const rs = <Detail_info navigation={props.navigation} tbl={bo_table} mt_id={props.mt_id} items={arrItems}
         idx={props.route.params.idx} />;
        setDetail_info(rs);
      }
    });
    
    if (bo_table==='notice') { headTitle = "공지사항";
    } else if (bo_table==='event') { headTitle = "이벤트";
    } else { headTitle = "게시판"; }

    const rs2 = <Detail_header navigation={props.navigation} route={props.route} items={headTitle} />;
    setDetail_header(rs2);
  },[]);

  return(
    <Container>
      { detail_header }
      <Content>
        { detail_info }
      </Content>
    </Container>
  );
}

function mapStateToProps(state, props) {
  return {
    mt_id: state.login.mt_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);

import React, { Component, createRef, useEffect, useState } from 'react';
import { Platform, ScrollView, View, Image, TouchableOpacity, TouchableHighlight, Dimensions, Alert, BackHandler } from 'react-native';
import { Footer, FooterTab, Button, Badge, Text as NText } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import FeatherIcon from 'react-native-vector-icons/Feather'; FeatherIcon.loadFont();
// import messaging from '@react-native-firebase/messaging';
import styles from '../style/Style';
import { Text } from '../components/BOOTSTRAP';
import Api from '../Api';

import { connect } from 'react-redux';
import ActionCreator from '../redux/actions';

function FooterWrap (props) {
    const [fimg1, setFimg1] = useState(require("../images/menu1_off.png"));
    const [fimg2, setFimg2] = useState(require("../images/menu2_off.png"));
    const [fimg3, setFimg3] = useState(require("../images/menu3_off.png"));
    const [fimg4, setFimg4] = useState(require("../images/menu4_off.png"));
    const [fimg5, setFimg5] = useState(require("../images/menu5_off.png"));
    const [ftxt1, setFtxt1] = useState();
    const [ftxt2, setFtxt2] = useState();
    const [ftxt3, setFtxt3] = useState();
    const [ftxt4, setFtxt4] = useState();
    const [ftxt5, setFtxt5] = useState();
    
    useEffect(() => {
      if (props.actMenu == "home") { setFimg1(require("../images/menu1_on.png")); setFtxt1(styles.clr5); }
      if (props.actMenu == "category") { setFimg2(require("../images/menu2_on.png")); setFtxt2(styles.clr5); }
      if (props.actMenu == "mylist") { setFimg3(require("../images/menu3_on.png")); setFtxt3(styles.clr5); }
      if (props.actMenu == "shop") { setFimg4(require("../images/menu4_on.png")); setFtxt4(styles.clr5); }
      if (props.actMenu == "mypage") { setFimg5(require("../images/menu5_on.png")); setFtxt5(styles.clr5); }
      
      getCount();
      
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [props, props.updateTime]);

    const onPressNav = (scrName, param) => {
      if (!props.mt_id && (scrName==='Mylist' || scrName==='OrderList')) {
        props.navigation.navigate('Login', {});
      } else {
        if (param) {
          props.navigation.navigate(scrName, param);
        } else {
          props.navigation.navigate(scrName);
        }

        setTimeout(() => {
          getCount();
        },500);
      }
    }
  
    //------------------------------------------------------------------
    const [totalCount1, setTotalCount1] = useState(0);
    
    const backAction = (str) => {
      setTimeout(() => {
        getCount();
      },500);
    };
    
    // useEffect(()=>{
    //   // foreground
    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     console.log('A new FCM message arrived! Footer');
        
    //     if (remoteMessage.data) {
    //       var msg = remoteMessage.data;
    //       if (msg.send_to.indexOf(props.mt_id) != -1 || msg.send_to===props.mt_id) {
    //         if (msg.push_type2==='orderFin' || msg.push_type2==='deliverFin' || msg.push_type2==='orderConfirm') {
    //           setTotalCount1(totalCount1+1);
    //         }
    //       }
    //     }
    //   });
    
    //   return unsubscribe;
    // },[]);
    
    const getCount = () => {
      // if (props.mt_id) {
      //   Api.send('member_count', {mt_id: props.mt_id, tbl: 'member_t', sch_sdate: Api.formatDate(new Date())}, (args)=>{
          
      //     let resultItem = args.resultItem;
      //     let arrItems = args.arrItems;
      //     if (resultItem.result === 'Y') {
      //       setTotalCount1(arrItems.od_n_Count1*1);
      //     }
      //   });
      // }
    }
    //------------------------------------------------------------------

    return(
      <Footer style={{height: 56, elevation: 3}}>
        <FooterTab style={[styles.footWr]}>
          <TouchableOpacity style={styles.container1} onPress={() => {onPressNav('Main', {})}}>
            <Image source={fimg1} style={[styles.imgContain, styles.footIcn]} />
            <Text style={[styles.footTxt, styles.ff1m, ftxt1]}>{'HOME'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container1} onPress={() => {onPressNav('CategoryList')}}>
            <Image source={fimg2} style={[styles.imgContain, styles.footIcn]} />
            <Text style={[styles.footTxt, styles.ff1m, ftxt2]}>{'CATEGORY'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container1} onPress={() => {onPressNav('Mylist')}}>
            <Image source={fimg3} style={[styles.imgContain, styles.footIcn]} />
            <Text style={[styles.footTxt, styles.ff1m, ftxt3]}>{'ZZIM'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container1} onPress={() => {onPressNav('ShopList')}}>
            <Image source={fimg4} style={[styles.imgContain, styles.footIcn]} />
            <Text style={[styles.footTxt, styles.ff1m, ftxt4]}>{'STORE'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container1} onPress={() => {onPressNav('Mypage', {})}}>
            <Image source={fimg5} style={[styles.imgContain, styles.footIcn]} />
            <Text style={[styles.footTxt, styles.ff1m, ftxt5]}>{'MYPAGE'}</Text>
            {totalCount1>0 ? <Badge style={styles.footBadge}><NText style={[styles.ff2l, {fontSize: 14}]}>{totalCount1}</NText></Badge> : null}
          </TouchableOpacity>
        </FooterTab>
      </Footer>
    );
  }
    
  function mapStateToProps(state) {
    return {
      mt_id: state.login.mt_id,
      mt_level: state.login.mt_level,
      updateTime: state.login.updateTime,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FooterWrap);
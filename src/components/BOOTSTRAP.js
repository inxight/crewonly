import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, ScrollView, Text as Text1, Image, View, TextInput, ActivityIndicator, Alert, Dimensions, Platform, Linking, Keyboard } from 'react-native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Button } from 'native-base';
import { ScrollView as GScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { WebView } from 'react-native-webview';
var SendIntentAndroid = require('react-native-send-intent');
import HTML from 'react-native-render-html';
import _ from 'lodash';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Feather'; Icon.loadFont();
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; FontAwesomeIcon.loadFont();
import cusToast from '../components/CusToast'
import styles from '../style/Style';
import stylesHtml from '../style/StyleHtml';
import Api from '../Api';

export const Text = (props) => {
  var ff = props.fonts ? {fontFamily: ((Platform.OS === 'ios')?styles.ff1r:props.fonts)} : styles.ff1r;
  
  return (
    <Text1 style={[ff, props.style]} numberOfLines={props.numberOfLines ? props.numberOfLines : null}>{props.children}</Text1>
  );
};

export const BtnSubmit = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnSubmit, styles.container0, style]} disabled={props.disabled}>
      {props.leftComponent ? props.leftComponent : null}
      <Text style={[styles.btnSubmitTxt, styles.ff1sb, textStyle]}>{props.title}</Text>
      {props.rightComponent ? props.rightComponent : null}
    </TouchableOpacity>
  );
};

export const BtnFrmline = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnFrmline, styles.container0, style]} disabled={props.disabled}>
      {props.leftComponent ? props.leftComponent : null}
      <Text style={[styles.btnFrmlineTxt, styles.ff1sb, textStyle]}>{props.title}</Text>
      {props.rightComponent ? props.rightComponent : null}
    </TouchableOpacity>
  );
};

export const Btn01 = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.cateBox, style]}>
      {props.icon ? <CusImage uri={props.icon} width={56} height={56} cusStyle={{width: 56, height: 56, borderRadius: 56/2, marginBottom: 8}} /> : null}
      <Text style={[styles.text6, textStyle]} numberOfLines={props.numberOfLines?props.numberOfLines:2}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export const BtnTab = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.keywordBox, 
      {paddingHorizontal: 14, paddingTop: Platform.OS==='ios'?7:10, paddingBottom: 7, backgroundColor: props.check?'#6BD738':'#fff', borderColor: props.check?'#6BD738':'#e9e9e9', paddingRight: (props.visible?30:14)}]} activeOpacity={1}>
      <Text style={[styles.text6, {color: props.check?'#fff':'#333'}]}>{props.title}</Text>
      {props.visible ? <View style={{position: 'absolute', top: '36%', right: 8, zIndex: 1}}>
        <View style={styles.container1}>
          <Icon name={props.check?'chevron-up':'chevron-down'} style={[styles.selectBoxIcn2, {color: props.check?'#fff':'#333'}]} />
        </View>
      </View> : null}
    </TouchableOpacity>
  );
};

export const MenuTab = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity key={props.index} onPress={onPress} style={[styles.container1, {height: 50, flex: 0}, props.cusStyle]}>
      <View style={[{paddingHorizontal: 16}, props.cusStyle1]}><Text style={[styles.ff1m, {fontSize: 15, color: '#222'}, props.cusStyle2]}>{props.title}</Text></View>
      {props.check ? <View style={{position: 'absolute', bottom: 0, width: '70%', height: 2, backgroundColor: '#222', zIndex: 2}}></View> : null}
    </TouchableOpacity>
  );
};

export const SocialBtn = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[props.title?styles.container1:{marginHorizontal: 16}]} disabled={props.disabled} activeOpacity={1}>
      <View style={[styles.container0
        , {width: 48, height: 48, borderRadius: 48/2, marginBottom: 12}, style]}>
        {props.leftComponent ? props.leftComponent : null}
      </View>
      {props.title ? <Text style={[styles.ff1l, {textAlign: 'center', color: '#666', fontSize: 13, letterSpacing: -0.6}, textStyle]}>{props.title}</Text> : null}
    </TouchableOpacity>
  );
};

export const SkipBtn = (props) => {
  const { style = {}, textStyle = {}, onPress } = props;

  return (
    <View style={{position: 'absolute', top: (Platform.OS === 'ios'?getStatusBarHeight():0), right: 0, zIndex: 10}}>
      <TouchableOpacity style={{paddingHorizontal: 20, height: 50}} onPress={onPress}>
        <View style={styles.container1}>
          <Text style={[styles.ff1m, {fontSize: 16, color: '#777'}]}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const CusCheckbox = (props) => {
  return (
    <View style={[{width: '100%'}, props.cusStyle]}>
      <TouchableOpacity onPress={() => {props.disabled?null:props.onPress()}} style={[styles.rowVerticalCenter, {height: 44}, props.cusStyle2]} activeOpacity={props.disabled?1:0}>
        <View style={{width: 20, height: 20}}>{props.disabled?null:<Image source={props.check?require('./../images/check_on.png'):require('./../images/check_off.png')} style={styles.imgContain} />}</View>
        {props.name ? <Text style={[styles.text6, styles.ff1m, {marginLeft: 6, color: '#777', letterSpacing: -0.5}, props.cusStyle3]}>{props.name}</Text> : null}
        {props.nameComponent}
      </TouchableOpacity>
    </View>
  );
}

export const CusSelect = (props) => {
  // const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={[styles.selectBox2, {marginBottom: 18}, props.cusStyle1]}>
      <TouchableOpacity onPress={() => { Keyboard.dismiss(); props.setIsVisible(!props.isVisible)}} style={[styles.rowVerticalCenterB, {paddingLeft: 15, paddingRight: 10, paddingVertical: 14}, props.cusStyle2]}>
        {props.selected ? <Text style={[styles.text6, {flex: 1}]} numberOfLines={1}>{props.selected}</Text> : <Text style={[styles.dropPickerPh, {flex: 1}]}>{'선택해주세요'}</Text>}
        <Icon name={props.isVisible?'chevron-up':'chevron-down'} style={[styles.selectBoxIcn1]} />
      </TouchableOpacity>
      {props.isVisible ? <View style={styles.line01} /> : null}
      {props.isVisible ? <GScrollView style={[styles.bg0, {maxHeight: 120}]} nestedScrollEnabled={true}>
        <View style={{paddingVertical: 8}}>
          {props.categories.map((arr, index) => 
          (<TouchableOpacity key={index} onPress={() => { props.onPress(arr.value, arr.label); props.setIsVisible(false) }} style={{paddingLeft: 15, paddingRight: 10, paddingVertical: 6}}>
            <Text style={[styles.text1]}>{arr.label}</Text>
          </TouchableOpacity>))}
        </View>
      </GScrollView> : null}
    </View>
  );
};

export const CusTag = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.tagWrap}>
      <View style={[styles.tagBox]}>{/*, {backgroundColor: (props.check?'#54158617':'#fff')} */}
        <Text style={[styles.tagTxt, {color: (props.check?'#D2317E':'#999')}, props.textStyle]}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const CusImage = (props) => {
  const mounted = useRef(false);

  const [maxWidth , setMaxWidth] = useState(props.width ? props.width : Math.floor(Dimensions.get('window').width + 2));
  const [maxHeight , setMaxHeight] = useState(props.height ? props.height : 0);
  const [imgWidth , setImgWidth] = useState(0);
  const [imgHeight , setImgHeight] = useState(0);

  useEffect(()=>{
    mounted.current = true;
    if (props.uri) {
      Image.getSize(props.uri, (width, height) => {
        if (mounted.current) {
          if (width > maxWidth) {
            setImgWidth(maxWidth);
            setImgHeight((maxWidth*height)/width);
          } else {
            setImgWidth(width);
            setImgHeight(height);
          }

          if (maxHeight > 0) {
            setImgHeight(maxHeight);
          }
        }
      });
    }
    return () => {
      mounted.current = false;
    };
  },[]);

  return (
    <View style={[{overflow: 'hidden', alignSelf: 'center'}, props.cusStyle]}>
      {props.uri?<Image source={{uri: props.uri}} style={[{width: parseInt(imgWidth), height: parseInt(imgHeight), resizeMode: 'cover'}, props.cusStyle2]} />
      :<View style={{width: props.width, height: props.height, backgroundColor: '#eaeaea'}}></View>}
    </View>
  );
}

export const Score_Star = (props) => {
  const score_t = [];

  for (let i=1;i<=Math.round(props.score);i++) {
    if (props.score>=i) {
      score_t.push(<Image key={"s"+i} style={styles.rwRateIcn} source={require('./../images/ic_star_on.png')} />);
    } else {
      score_t.push(<Image key={"s"+i} style={styles.rwRateIcn} source={require('./../images/ic_star_half.png')} />);
    }
  }

  for (let i=1;i<=(5 - Math.round(props.score));i++) {
    score_t.push(<Image key={"i"+i} style={styles.rwRateIcn} source={require('./../images/ic_star_off.png')} />);
  }

  return (
    <View style={styles.rowVerticalCenter}>
      {score_t}
    </View>
  );
};

export function Profile(props){
  const item = props.items;

  return(
    <TouchableOpacity onPress={() => {item.is_member ? props.navigation.navigate('Register', {}) : props.navigation.navigate('Login', {}) }} 
      style={[styles.contentWrap4]}>
      <View style={[styles.rowVerticalCenter]}>
        <View style={[styles.bg2, styles.shopicon, {borderWidth: 0}]}>
          <View style={styles.container1}>
            {item.mt_image1 ? <Image source={{ uri: item.mt_image1 }} style={styles.imgCover} />
            : <FontAwesomeIcon name={'user'} size={24} color={'#bbb'} />}
          </View>
        </View>
        <View style={[styles.rowVerticalCenterB, {paddingLeft: 16, flex: 1, flexGrow: 1}]}>
          {item.is_member ?
            (item.mt_name?
            <View style={{flex: 1}}>
              <Text style={[styles.text2, styles.ff2l, styles.txtStrong]}>{item.mt_grade_lbl}</Text>
              <Text style={[styles.subTitle05, {fontSize: 18}]}>{item.mt_name} <Text style={[styles.text1, styles.ff2l]}>{'님'}</Text></Text>
              <Text style={[styles.text4, styles.ff2l]}>{'('+(item.mt_login_type==='1'?item.mt_hp:item.mt_login_type_lbl)+')'}</Text>
            </View>
            :
            <View style={{flex: 1}}>
              <Text style={[styles.subTitle05, {fontSize: 18}]}>{'회원정보를 입력해주세요'}</Text>
            </View>)
          :
          <View style={{flex: 1}}>
            <Text style={[styles.subTitle05, {fontSize: 18}]}>{'로그인해주세요'}</Text>
          </View>}
          {item.is_member ? null:
          <TouchableOpacity onPress={() => props.navigation.navigate('Login', {})} style={{paddingVertical: 10}}>
            <Text style={[styles.text1, styles.txtStrong]}>{'로그인'}</Text>
          </TouchableOpacity>}
        </View>
      </View>
      {/* <View style={[styles.rowVerticalCenterB]}>
        <View style={[styles.rowVerticalCenterB, {flex: 1}]}>
          <Btn01 onPress={() => props.navigation.navigate('Login', {loginV: 'Y'})} title={'Login'} style={[{flex: 1, backgroundColor: '#333'}]} textStyle={{fontSize: 12}} />
          <View style={{marginRight: 10}} />
          <Btn01 onPress={() => props.navigation.navigate('Login', {})} title={'Join'} style={[{flex: 1, backgroundColor: '#fff'}]} textStyle={{fontSize: 12, color: '#333'}} />
        </View>
      </View> */}
    </TouchableOpacity>
  );
}

export function PageLoadingIcon(props){

  return(
  <View style={styles.fix100}>
    <View style={styles.container2}>
      <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 4, backgroundColor: '#f8f8f8', padding: 10, borderRadius: 50 }} />
    </View>
  </View>);
}

export const OdConfirmModal = (props) => { // 구매확정 모달

}
export const ReturnModal = (props) => { // 환불 모달
  
}

export const CusHtml = (props) => {
  const tags = _.without(IGNORED_TAGS, 
    'table', 'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
  )

  const tableDefaultStyle = { flex: 1, justifyContent: 'flex-start', }

  const tableColumnStyle = {
    ...tableDefaultStyle,
    flexDirection: 'column',
    alignItems: 'stretch'
  }

  const tableRowStyle = {
    ...tableDefaultStyle,
    flexDirection: 'row',
    alignItems: 'stretch'
  }

  const tdStyle = {
    ...tableDefaultStyle,
    padding: 2
  }

  const thStyle = {
    ...tdStyle,
    backgroundColor: '#ddd',
    alignItems: 'center'
  }

  var x = 1;
  const renderers={
    table: (htmlAttribs, children, style, passProps) => {

      return (
        <ScrollView key={`table${++x}`} horizontal={true}>
          {children}
        </ScrollView>
      );
    },
    tr: (html, children, style, passProps) => {
      return (
        <View
          key={`tr${++x}`}
          style={{
            flex: 1,
            flexDirection: "row",
            borderBottomWidth: 1,
          }}
        >
          {children}
        </View>
      );
    },
    th: (attribs, children, style, passProps) => {
      let rowspan = 1;
      if (attribs.colspan) {
        rowspan = parseInt(attribs.colspan, 10);
      }
      return (
        <View
          key={`th${++x}`}
          style={{
            width: 120 * rowspan,
            borderLeftWidth: passProps.nodeIndex === 0 ? 0 : 1,
            padding: 6
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
            {children}
          </Text>
        </View>
      );
    },
    td: (attribs, children, style, passProps) => {
      let rowspan = 1;
      if (attribs.rowspan) {
        rowspan = parseInt(attribs.rowspan, 10);
      }
      return (
        <View
          key={`td${++x}`}
          style={{
            width: 120 * rowspan,
            borderRightWidth: 1,
            borderLeftWidth: passProps.nodeIndex === 0 ? 1 : 0,
            padding: 6
          }}
        >
          <Text style={{fontSize: 12}}>{children}</Text>
        </View>
      );
    }
  }

  return (
    <HTML source={{html: props.items}} ignoredTags={tags} renderers={renderers} tagsStyles={stylesHtml} contentWidth={Dimensions.get('window').width - 40} onLinkPress={(evt, href)=> {Linking.openURL(href)}} />
  );
};

export const CusWebview = (props) => {
  const [isCheck, setIsCheck] = useState(props.tbl==='product'?false:true);
  const [viewHeight, setViewHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const domain = Api.state.url+'/api/view.php?tbl='+props.tbl + '&idx='+props.idx + '&os='+Platform.OS;

  useEffect(() => {
    if (props.tbl==='product') {
      var sTimeout = "";
      clearTimeout(sTimeout);
      sTimeout = setTimeout(() => {
        setIsCheck(true);
      }, 500);
    }
  },[]);

  const _onMessage = event => {
    // console.log('_onMessage', JSON.parse(event.nativeEvent.data))
    let msgData;
    try {
        msgData = JSON.parse(event.nativeEvent.data) || {}
    } catch (error) {
        console.error(error)
        return
    }
    // console.log(msgData, domain);

    if (msgData.targetFunc==="getAlert" && msgData.data) {
      // console.log(msgData.data);
      if (msgData.data.message) {
        
      }
    }
    if (msgData.targetFunc==="getData" && msgData.data) {
      console.log(msgData.data.height, msgData.data.chk);
      //Alert.alert(msgData.data.height+' , '+msgData.data.chk);
      setViewHeight(msgData.data.height*1);
    }
  }

  const patchPostMessageFunction = function() {
    const originalPostMessage = window.postMessage;
    const patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.postMessage = patchedPostMessage;
  };
  const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

  const handleNav = (evt) => {
    //console.log(evt);
    if (evt.url.startsWith('http://') || evt.url.startsWith('https://') || evt.url.startsWith('about:blank')) {
      return true;
    }
  
    if (Platform.OS === 'android') {
      SendIntentAndroid.openAppWithUri(evt.url)
        .then(isOpened => {
          if (!isOpened) {
            console.log('외부 앱 실행에 실패했습니다');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Linking.openURL(evt.url).catch(err => {
        console.log('앱 실행에 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.');
      });
    }
    return false;
  };

  if (isCheck) {
    return (
      <View style={{height: (viewHeight)}}>
        <WebView
          source={{ uri: domain }}
          onMessage={_onMessage}
          injectedJavaScript={patchPostMessageJsCode}
          javaScriptEnabled={true}
          useWebKit={true}
          // onLoad={() => setIsLoading(false)}
          originWhitelist={['*']}
          onShouldStartLoadWithRequest={event => handleNav(event)}
          cacheEnabled={false}
        />
      </View>
    );
  } else {
    return null;
  }
}
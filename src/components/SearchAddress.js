import React, { Component, useEffect, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import styles from '../style/Style';
import Api from '../Api';
import { Text } from '../components/BOOTSTRAP';

import Modal from "react-native-modal";
import { WebView } from 'react-native-webview'
const domain = Api.state.url+'/api/daum_address.php';

export default function SearchAddress(props) {
  const [isLoading, setIsLoading] = useState(true);

  const _onMessage = event => {
    // console.log('_onMessage', JSON.parse(event.nativeEvent.data))
    let msgData;
    try {
        msgData = JSON.parse(event.nativeEvent.data) || {}
    } catch (error) {
        console.error(error)
        return
    }

    if (msgData.targetFunc==="getDataList" && msgData.data) {
      console.log(msgData.data);
      props.settStateAddr(msgData.data);
      props.toggleModalAddr();
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
  //----------------------------------------------------------------------------

  return (
    <View>
      <Modal isVisible={true}
        onSwipeComplete={() => props.toggleModalAddr()}
        onBackdropPress={() => props.toggleModalAddr()}
        onBackButtonPress={() => props.toggleModalAddr()}
        propagateSwipe
        style={{margin: 0}}>
        <View style={styles.container1}>
          <View style={[styles.selectModal]}>
            <View style={styles.modalTitleTop}><Text style={[styles.subTitle02]}>주소검색</Text>
              <TouchableOpacity onPress={() => props.toggleModalAddr()} style={styles.modalClose}>
                <Icon name={'close'} size={22} color={'#111'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.bg2, {flex: 1, width: '100%', height: '100%',}]}>
              {isLoading ? <ActivityIndicator size="large" color="#F44336" style={[{ marginLeft: 4, marginTop: 22 }]} /> : null}
              <WebView
                source={{ uri: domain }}
                onMessage={_onMessage}
                injectedJavaScript={patchPostMessageJsCode}
                javaScriptEnabled={true}
                useWebKit={true}
                onLoad={() => setIsLoading(false)}
              />
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

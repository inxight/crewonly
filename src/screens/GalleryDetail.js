import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Container, Content, Button, Footer, FooterTab } from 'native-base';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import AutoHeightImage from 'react-native-auto-height-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import styles from '../style/Style';

import { connect } from 'react-redux';

export function PaginationPager(props){
  return(
    <View style={[styles.sldPager, {left: 0, right: 0, height: 44, paddingVertical: 0, backgroundColor: '#000'}]}>
      <Text style={[styles.sldPagerTxt, {marginLeft: 0, fontSize: 17, color: '#888'}]}>{props.index} / {props.total}</Text>
    </View>
  );
}
//------------------------------------------------------------------------------
export function Detail_info(props){
  const item = props.items;

  const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : ExtraDimensions.get("REAL_WINDOW_HEIGHT") - ExtraDimensions.get("STATUS_BAR_HEIGHT");

  const [galleryIndex, setGalleryIndex] = useState(props.galleryIndex);
  const handleIndexChange = (index) => {
    index = index + 1;
    setGalleryIndex(index);
  };

  return (
    <View style={{width: '100%', height: deviceHeight}}>
      <ImageViewer
        imageUrls={item}
        index={props.galleryIndex}
        onSwipeDown={() => props.navigation.goBack()}
        enableSwipeDown={true}
        // renderHeader={() => <View></View>}
      />
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={{position: 'absolute', right: 6, top: 24, zIndex: 10, padding: 6}}>
        <View style={[styles.container1, {width: 38, height: 38, borderRadius: 38/2, backgroundColor: '#ffffff8c'}]}>
          <Icon name={'close'} size={22} color={'#000'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
//------------------------------------------------------------------------------
function GalleryDetail(props){
  const [total, setTotal] = useState(props.route.params.total);
  const [galleryIndex, setGalleryIndex] = useState(props.route.params.index);
  const [detail_info, setDetail_info] = useState(<></>);
  const [paginationPager, setPaginationPager] = useState();

  //------------------------------------------------------------------
  useEffect(() => {
    
    var newArray = props.route.params.arrItems.map((arr, index) =>({url: arr, freeHeight: true}));
    const rs1 = <Detail_info navigation={props.navigation} items={newArray} galleryIndex={galleryIndex} />;
    setDetail_info(rs1);
    
  },[]);

  const settstate = (index, total) => {
    const rs2 = <PaginationPager index={index} total={total} />;
    setPaginationPager(rs2);
  };
  //------------------------------------------------------------------

  return(
    <Container>
      <Content>
        {detail_info}
      </Content>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetail);

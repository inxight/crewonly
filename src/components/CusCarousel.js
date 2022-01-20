import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from '../style/Style';
import { CusImage, Text } from './BOOTSTRAP';

export const sliderWidth = Dimensions.get('window').width;
export const itemWidth = sliderWidth;

export function PaginationPager(props){
  return(
    <View style={[styles.sldPager, {right: 16, left: null, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3}]}>
      <Text style={[styles.sldPagerTxt, styles.clr1]}>{props.index}</Text>
      <Text style={[styles.sldPagerTxt]}>/ {props.total}</Text>
    </View>
  );
}

export default function CusCarousel(props) {
  const thumbs = props.thumbs;
  
  const [paginationPager, setPaginationPager] = useState();
  const [activeSlide, setActiveSlide] = useState(1);
  const handleIndexChange = (index) => {
    index = index + 1;
    setActiveSlide(index);

    const rs2 = <PaginationPager index={index?index:activeSlide} total={thumbs.length} />;
    setPaginationPager(rs2);
  };

  const _renderThumbs = ({item, index}) => (
    <View key={index}>
      {item ? <TouchableOpacity onPress={() => onPressBanner()} activeOpacity={1}>
        <CusImage uri={item} width={itemWidth} cusStyle={{borderRadius: 0}} />
      </TouchableOpacity> : null}
      <PaginationPager index={activeSlide} total={thumbs.length} />
    </View>
  );

  const onPressBanner = () => {
    var i = activeSlide===0?activeSlide:activeSlide-1;
    props.navigation.navigate('BannerDetail', {bn_idx: props.items[i].bn_idx});
  }

  return(
    <View>
      <Carousel
        data={thumbs}
        renderItem={_renderThumbs}
        onSnapToItem={(index) => handleIndexChange(index)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}//-10
        layout={"default"}
        //hasParallaxImages={true}
        //inactiveSlideScale={0.84}
        //inactiveSlideOpacity={0.7}
        inactiveSlideScale={1}
        loop={true}
        autoplay={true} autoplayDelay={5000}
      />
    </View>
  );
}

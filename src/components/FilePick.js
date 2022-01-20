import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import styles from '../style/Style';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign'; Icon.loadFont();
import cusToast from './CusToast'
import { BtnFrmline, CusCheckbox } from './BOOTSTRAP';

export default function FilePick(props) {
  const [isFileVisible, setIsFileVisible] = useState(false);
  const [imagePickMethod, setImagePickMethod] = useState('gallery');
  
  const pickSingle = (index) => {
    if (imagePickMethod==='camera') {
      ImagePicker.openCamera({
				mediaType: 'photo',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        includeBase64: true,
			}).then(image => {
        const file = { uri: image.path, type: image.mime, data: image.data, name: 'photo.jpg' }
        props.setFile(file, index);
      }).catch(e => {
        cusToast(e.message ? e.message : e);
      });
    } else {
      ImagePicker.openPicker({
        mediaType: 'photo',
        sortOrder: 'none',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
        useFrontCamera: false,
        includeBase64: true,
      }).then(image => {
        // console.log('receivedImage', index, image);
        const file = { uri: image.path, type: image.mime, data: image.data, name: 'photo.jpg' }
        props.setFile(file, index);
      }).catch(e => {
        cusToast(e.message ? e.message : e);
      });
    }
  }
  const pickMultiple = (str) => {
    if (imagePickMethod==='camera') {
      ImagePicker.openCamera({
				mediaType: 'photo',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        includeBase64: true,
			}).then(image => {
        props.setFile({uri: image.path}, str);
      }).catch(e => {
        cusToast(e.message ? e.message : e);
      });
    } else {
      ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        multiple: true,
        maxFiles: 5,
        includeBase64: true,
        // cropping: true,
        // showCropFrame: false,
        // cropperCircleOverlay: false,
        // forceJpg: true,
        // sortOrder: 'asc',
      }).then(images => {
        //console.log('pickMultiple', images.length, str);
        images.map((i, index) => {
          // console.log('receivedImage',index , i);
          //const file = { uri: i.path, type: i.mime, data: i.data, name: 'photo.jpg' }
          props.setFile({uri: i.path}, (index+str));
        })
      }).catch(e => {
        cusToast(e.message ? e.message : e);
      });
    }
  }

  const pickRemove = (str, index) => {
    if (str==='single') {
      props.setFile({}, index);
      props.del_file(index);
    } else {
      props.del_file('', index);
    }
  }

  if (props.multiple) {
    return(
      <View>
        <TouchableOpacity onPress={() => 
          setIsFileVisible(true)
          //pickMultiple(props.index)
        }>
          <View style={{width: (Dimensions.get('window').width - 40) * 0.25, height: (Dimensions.get('window').width - 40) * 0.25}}>
            <View style={[styles.container1, styles.imgBox]}>
              {props.file.uri || props.file.imgurl ? 
              <Image source={{uri: props.file.uri ? props.file.uri : props.file.imgurl}} style={[styles.imgCover]} />
              : <Image source={require('./../images/ico_plus.png')} style={[styles.imgContain, {width: 26, height: 26}]} />}
            </View>
          </View>
        </TouchableOpacity>
        {props.file.uri || props.file.imgurl ? 
        <TouchableOpacity onPress={() => pickRemove('multiple', props.index)} style={{width: 26, height: 26, borderRadius: 26/2, backgroundColor: '#4B4B4BB3', position: 'absolute', bottom: 0, right: 0, zIndex: 2}}>
          <View style={styles.container1}><Icon name={'close'} size={14} color={'#fff'} /></View>
        </TouchableOpacity> : null}

        <Modal isVisible={isFileVisible}
          onSwipeComplete={() => setIsFileVisible(false)}
          onBackdropPress={() => setIsFileVisible(false)}
          onBackButtonPress={() => setIsFileVisible(false)}
          backdropOpacity={0.4}
          propagateSwipe>
          <View style={styles.container1}>
            <View style={[styles.selectModal, {height: 'auto'}]}>
              <View style={[styles.contentWrap4]}>
                <CusCheckbox check={imagePickMethod==='camera'?true:false} name={'카메라'} onPress={()=> setImagePickMethod('camera')} cusStyle2={[styles.listCheck, {height: 36}]} />
                <CusCheckbox check={imagePickMethod==='gallery'?true:false} name={'갤러리'} onPress={()=> setImagePickMethod('gallery')} cusStyle2={[styles.listCheck, {height: 36}]} />

                <View style={[styles.rowVerticalCenterB, {marginTop: 20}]}>
                  <View style={{flex: 1}}><BtnFrmline title={'닫기'} onPress={() => {setIsFileVisible(false)}} style={[{height: 40}, styles.btn_bg2]} textStyle={[styles.text1, styles.clr1]} /></View>
                  <View style={{width: 10}} />
                  <View style={{flex: 1}}><BtnFrmline title={'확인'} onPress={() => {setIsFileVisible(false);
                    setTimeout(() => {
                      pickMultiple(props.index);
                    }, 500);
                    }} style={[{height: 40}, styles.btn_bg1]} textStyle={[styles.text1, styles.clr1]} /></View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        
      </View>
    );
  } else {
    return(
      <View>
        <TouchableOpacity onPress={() => 
          setIsFileVisible(true)
          //pickSingle(props.index)
        }>
          <View style={{width: (Dimensions.get('window').width - 40) * 0.25, height: (Dimensions.get('window').width - 40) * 0.25}}>
            <View style={[styles.container1, styles.imgBox]}>
              {props.file.uri || props.file.imgurl ? 
              <Image source={{uri: props.file.uri ? props.file.uri : props.file.imgurl}} style={[styles.imgCover]} />
              : <Image source={require('./../images/ico_plus.png')} style={[styles.imgContain, {width: 26, height: 26}]} />}
            </View>
          </View>
        </TouchableOpacity>
        {props.file.uri || props.file.imgurl ? 
        <TouchableOpacity onPress={() => pickRemove('single', props.index)} style={{width: 26, height: 26, borderRadius: 26/2, backgroundColor: '#4B4B4BB3', position: 'absolute', bottom: 0, right: 0, zIndex: 2}}>
          <View style={styles.container1}><Icon name={'close'} size={14} color={'#fff'} /></View>
        </TouchableOpacity> : null}
        
        <Modal isVisible={isFileVisible}
          onSwipeComplete={() => setIsFileVisible(false)}
          onBackdropPress={() => setIsFileVisible(false)}
          onBackButtonPress={() => setIsFileVisible(false)}
          backdropOpacity={0.4}
          propagateSwipe>
          <View style={styles.container1}>
            <View style={[styles.selectModal, {height: 'auto'}]}>
              <View style={[styles.contentWrap4]}>
                <CusCheckbox check={imagePickMethod==='camera'?true:false} name={'카메라'} onPress={()=> setImagePickMethod('camera')} cusStyle2={[styles.listCheck, {height: 36}]} />
                <CusCheckbox check={imagePickMethod==='gallery'?true:false} name={'갤러리'} onPress={()=> setImagePickMethod('gallery')} cusStyle2={[styles.listCheck, {height: 36}]} />

                <View style={[styles.rowVerticalCenterB, {marginTop: 20}]}>
                  <View style={{flex: 1}}><BtnFrmline title={'닫기'} onPress={() => {setIsFileVisible(false)}} style={[{height: 40}, styles.btn_bg2]} textStyle={[styles.text1, styles.clr1]} /></View>
                  <View style={{width: 10}} />
                  <View style={{flex: 1}}><BtnFrmline title={'확인'} onPress={() => {setIsFileVisible(false);
                    setTimeout(() => {
                      pickSingle(props.index);
                    },500);
                    }} style={[{height: 40}, styles.btn_bg1]} textStyle={[styles.text1, styles.clr1]} /></View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

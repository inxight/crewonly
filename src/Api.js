import React from 'react';
import { Platform, Alert, Linking, View, Image, ActivityIndicator } from 'react-native';
import { Toast } from 'native-base';
import cusToast from './components/CusToast'
import Axios from 'axios';
import jwt_decode from "jwt-decode";

class Api {

  constructor(){
    //super(props);

    this.state = {
      isLoading: false,
      SERVER_NAME: "jangbogo_server",
      SECRETKEY: '1111882EAD94E9C493CEF089E1B023A2122BA778',
      url: 'http://dmonster1544.cafe24.com',
      path: '',
      option: {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: null,
      },
      dataSource: {},
    };
  }

  //formdata 로 변경
  makeFormData(method = '', datas, files = {}){
    let formdata = new FormData();
    formdata.append('method', method);
    formdata.append('secretKey', this.state.SECRETKEY);
    formdata.append('jwt_data', datas);

    for (let [key, value] of Object.entries(files)) {
      formdata.append(key, value);
    }

    this.state.path = '/api/'+method+'.php';
    this.state.option.body = formdata;
  }

  //기본
  send(method, datas, callback, files){
    const jwt = require('jwt-encode');
    const jwt_secret = this.state.SECRETKEY;
    const jwt_data = jwt(datas, jwt_secret);

    this.makeFormData(method, jwt_data, files);

    this.state.isLoading = true;

    return Axios.post(this.state.url + this.state.path, this.state.option.body, this.state.option.headers)
    .then((response) => {
        //console.warn(responseJson);
        const responseJson = jwt_decode(response.data.jwt, jwt_secret);
        // let responseJson = response.data;
        let resultItem = responseJson.result;
        let message = responseJson.msg;
        let arrItems = responseJson.data;
        // console.log(responseJson);

        let returnJson = { resultItem: { result: resultItem === 'false'?'N':'Y', message: message }, arrItems: arrItems };
        this.state.isLoading = false;

        if (resultItem === 'false' && message) {
          console.log(method, message);
          if (!(method==='member_login_history' || message==='member_login_history' || message==='ReturnNotAllow' || datas.is_modal===1000)) {
            cusToast(message);
          }
        }

        if(typeof(callback)=='function'){
          callback(returnJson);
        }else{
          return returnJson;
        }
    })
    .catch(function (error) {
      console.log("Axios catch!!!>>", method, error);
    });
  }
  //--------------------------------------------------------------------------------------------------
  loadingView(){
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    )
  }

  //--------------------------------------------------------------------------------------------------
  formatDate(date) {
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();

    if( currentMonth < 10 )
        currentMonth = '0' + currentMonth;
    if( currentDate < 10 )
        currentDate = '0' + currentDate;

  	return currentYear+"-"+currentMonth+"-"+currentDate;
  }
  formatDateTime(date, format) {
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();

    var currentHours = date.getHours();
    var currentMinutes = date.getMinutes();
    var currentSeconds = date.getSeconds();

    var hours = currentHours;
    var minutes = currentMinutes;

    if( currentMonth < 10 )
        currentMonth = '0' + currentMonth;
    if( currentDate < 10 )
        currentDate = '0' + currentDate;
    if( currentHours < 10 )
        currentHours = '0' + currentHours;
    if( currentMinutes < 10 )
        currentMinutes = '0' + currentMinutes;
    if( currentSeconds < 10 )
        currentSeconds = '0' + currentSeconds;

    if (format==='YmdHis') {
      return currentYear+""+currentMonth+""+currentDate+""+currentHours+""+currentMinutes+""+currentSeconds;
    } else if (format==='Ymd') {
      return currentYear+""+currentMonth+""+currentDate;
    } else if (format==='H:i') {
      return currentHours+":"+currentMinutes;
    } else if (format==='AMPM') {
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      //hours + ':' + minutes + ' ' + ampm;

      return currentHours+":"+currentMinutes+' '+ampm;
    } else {
      return currentYear+"-"+currentMonth+"-"+currentDate+" "+currentHours+":"+currentMinutes;
    }
  }
  //--------------------------------------------------------------------------------------------------
  diffTime(start, end, format) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
      hours = hours + 24;
    // hours = ((hours <= 9 ? "0" : "") + hours);
    if (hours==='00') {hours = "0";}

    minutes = ((minutes <= 9 ? "0" : "") + minutes);
    if (minutes==='00') {minutes = "";}

    if (format==='H') {
      return (hours ? hours : "");
    } else if (format==='i') {
      return (minutes ? minutes : "");
    } else {
      return (hours ? hours + "시간 " : "") + (minutes ? minutes + "분" : "");
    }
  }
  //--------------------------------------------------------------------------------------------------
  //콤마찍기
  comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }
  //콤마풀기
  uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  }
  //--------------------------------------------------------------------------------------------------
  imgResize(imgWidth, imgHeight, maxWidth){
    let width = 0, height = 0;
    if (imgWidth > maxWidth) {
      width = maxWidth;
      height = imgHeight * (maxWidth / imgWidth);
    } else {
      width = imgWidth;
      height = imgHeight;
    }
    width = parseInt(width);
    height = parseInt(height);

    return width+','+height;
  }
  //--------------------------------------------------------------------------------------------------
  dialCall = (number) => {
    let phoneNumber = '';

    if (Platform.OS === 'ios') { phoneNumber = `telprompt:${number}`; }
    else { phoneNumber = `tel:${number}`; }
    Linking.openURL(phoneNumber);
  };
  //--------------------------------------------------------------------------------------------------
  arrSearch = (nameKey, myArray) => {
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }
  //--------------------------------------------------------------------------------------------------

}

export default Api = new Api();

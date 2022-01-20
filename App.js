import React, { Component, useEffect, useState } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux';
import initStore from './src/redux/store';
// import SplashScreen from 'react-native-splash-screen';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-toast-message';

import Auth from './src/screens/Auth';

import Main from './src/screens/Main';
import MainNew from './src/screens/MainNew';
import MainBest from './src/screens/MainBest';
import MainSale from './src/screens/MainSale';
import Login from './src/screens/Login';
import RegisterAgree from './src/screens/RegisterAgree';
import RegisterCheck from './src/screens/RegisterCheck';
import Register from './src/screens/Register';
import RegisterResult from './src/screens/RegisterResult';
import RegisterConfirm from './src/screens/RegisterConfirm';
import RegisterUpdatePwd from './src/screens/RegisterUpdatePwd';
import RegisterInfo from './src/screens/RegisterInfo';
import Mypage from './src/screens/Mypage';
import Mylist from './src/screens/Mylist';

import AddressWrite from './src/screens/AddressWrite';
import AddressList from './src/screens/AddressList';
import CategoryList from './src/screens/CategoryList';
import ShopList from './src/screens/ShopList';
import ShopDetail from './src/screens/ShopDetail';
import ProductList from './src/screens/ProductList';
import ProductSearch from './src/screens/ProductSearch';
import ProductDetail from './src/screens/ProductDetail';
import CartList from './src/screens/CartList';
import PaymentWrite from './src/screens/PaymentWrite';
import PaymentScreen_iam from './src/screens/PaymentScreen_iam';
import PaymentResult from './src/screens/PaymentResult';
import PaymentCancel from './src/screens/PaymentCancel';
import OrderConfirm from './src/screens/OrderConfirm';
import OrderList from './src/screens/OrderList';
import OrderDetail from './src/screens/OrderDetail';
import OrderReturn from './src/screens/OrderReturn';
import ReviewList from './src/screens/ReviewList';
import MyReviewList from './src/screens/MyReviewList';
import ReviewWrite from './src/screens/ReviewWrite';

import BoardList from './src/screens/BoardList';
import BoardDetail from './src/screens/BoardDetail';
import FaqList from './src/screens/FaqList';
import QaList from './src/screens/QaList';
import QaWrite from './src/screens/QaWrite';
import QaDetail from './src/screens/QaDetail';
import CouponList from './src/screens/CouponList';
import CouponZoneList from './src/screens/CouponZoneList';
import PointList from './src/screens/PointList';
import PushList from './src/screens/PushList';
import PushSetting from './src/screens/PushSetting';
import ContentDetail from './src/screens/ContentDetail';
import GalleryDetail from './src/screens/GalleryDetail';

const store = initStore();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Stack_Navigation(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                // gestureEnabled: true,
                gestureDirection: 'horizontal',
                // cardStyle: { backgroundColor: 'transparent' },
            }}
            mode="card"
            initialRouteName="Auth"
        >
            <Stack.Screen name="Auth" options={{ title: '', headerTransparent: true, headerShown: false }} component={Auth} />
            <Stack.Screen name="Main" options={{ title: '', headerTransparent: true, headerShown: false }} component={Main} />
            <Stack.Screen name="MainNew" options={{ title: '', headerTransparent: true, headerShown: false }} component={MainNew} />
            <Stack.Screen name="MainBest" options={{ title: '', headerTransparent: true, headerShown: false }} component={MainBest} />
            <Stack.Screen name="MainSale" options={{ title: '', headerTransparent: true, headerShown: false }} component={MainSale} />

            <Stack.Screen name="Login" options={{ title: '', headerTransparent: true, headerShown: false }} component={Login} />
            <Stack.Screen name="RegisterAgree" options={{ title: '', headerTransparent: true, headerShown: false }} component={RegisterAgree} />
            <Stack.Screen name="RegisterCheck" options={{ title: '', headerTransparent: true, headerShown: false }} component={RegisterCheck} />
            <Stack.Screen name="Register" options={{ title: '', headerTransparent: true, headerShown: false }} component={Register} />
            <Stack.Screen name="RegisterResult" options={{ title: '', headerTransparent: true, headerShown: false }} component={RegisterResult} />
            <Stack.Screen name="RegisterConfirm" options={{ title: '', headerTransparent: true, headerShown: false }} component={RegisterConfirm} />
            <Stack.Screen name="RegisterUpdatePwd" options={{ title: '', headerTransparent: true, headerShown: false }} component={RegisterUpdatePwd} />
            <Stack.Screen name="RegisterInfo" options={{ title: '', headerTransparent: true, headerShown: false }} component={RegisterInfo} />
            <Stack.Screen name="Mypage" options={{ title: '', headerTransparent: true, headerShown: false }} component={Mypage} />
            <Stack.Screen name="Mylist" options={{ title: '', headerTransparent: true, headerShown: false }} component={Mylist} />

            <Stack.Screen name="CategoryList" options={{ title: '', headerTransparent: true, headerShown: false }} component={CategoryList} />
            <Stack.Screen name="ShopList" options={{ title: '', headerTransparent: true, headerShown: false }} component={ShopList} />
            <Stack.Screen name="ShopDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={ShopDetail} />
            <Stack.Screen name="ProductList" options={{ title: '', headerTransparent: true, headerShown: false }} component={ProductList} />
            <Stack.Screen name="ProductSearch" options={{ title: '', headerTransparent: true, headerShown: false }} component={ProductSearch} />
            <Stack.Screen name="ProductDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={ProductDetail} />
            <Stack.Screen name="CartList" options={{ title: '', headerTransparent: true, headerShown: false }} component={CartList} />
            <Stack.Screen name="PaymentWrite" options={{ title: '', headerTransparent: true, headerShown: false }} component={PaymentWrite} />
            <Stack.Screen name="PaymentScreen_iam" options={{ title: '', headerTransparent: true, headerShown: false }} component={PaymentScreen_iam} />
            <Stack.Screen name="PaymentResult" options={{ title: '', headerTransparent: true, headerShown: false }} component={PaymentResult} />
            <Stack.Screen name="PaymentCancel" options={{ title: '', headerTransparent: true, headerShown: false }} component={PaymentCancel} />
            <Stack.Screen name="OrderConfirm" options={{ title: '', headerTransparent: true, headerShown: false }} component={OrderConfirm} />
            <Stack.Screen name="OrderList" options={{ title: '', headerTransparent: true, headerShown: false }} component={OrderList} />
            <Stack.Screen name="OrderDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={OrderDetail} />
            <Stack.Screen name="OrderReturn" options={{ title: '', headerTransparent: true, headerShown: false }} component={OrderReturn} />
            <Stack.Screen name="MyReviewList" options={{ title: '', headerTransparent: true, headerShown: false }} component={MyReviewList} />
            <Stack.Screen name="ReviewList" options={{ title: '', headerTransparent: true, headerShown: false }} component={ReviewList} />
            <Stack.Screen name="ReviewWrite" options={{ title: '', headerTransparent: true, headerShown: false }} component={ReviewWrite} />
            
            <Stack.Screen name="AddressWrite" options={{ title: '', headerTransparent: true, headerShown: false }} component={AddressWrite} />
            <Stack.Screen name="AddressList" options={{ title: '', headerTransparent: true, headerShown: false }} component={AddressList} />
            <Stack.Screen name="BoardList" options={{ title: '', headerTransparent: true, headerShown: false }} component={BoardList} />
            <Stack.Screen name="BoardDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={BoardDetail} />
            <Stack.Screen name="FaqList" options={{ title: '', headerTransparent: true, headerShown: false }} component={FaqList} />
            <Stack.Screen name="QaList" options={{ title: '', headerTransparent: true, headerShown: false }} component={QaList} />
            <Stack.Screen name="QaWrite" options={{ title: '', headerTransparent: true, headerShown: false }} component={QaWrite} />
            <Stack.Screen name="QaDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={QaDetail} />
            
            <Stack.Screen name="CouponList" options={{ title: '', headerTransparent: true, headerShown: false }} component={CouponList} />
            <Stack.Screen name="CouponZoneList" options={{ title: '', headerTransparent: true, headerShown: false }} component={CouponZoneList} />
            <Stack.Screen name="PointList" options={{ title: '', headerTransparent: true, headerShown: false }} component={PointList} />
            <Stack.Screen name="PushList" options={{ title: '', headerTransparent: true, headerShown: false }} component={PushList} />
            <Stack.Screen name="PushSetting" options={{ title: '', headerTransparent: true, headerShown: false }} component={PushSetting} />
            <Stack.Screen name="ContentDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={ContentDetail} />
            <Stack.Screen name="GalleryDetail" options={{ title: '', headerTransparent: true, headerShown: false }} component={GalleryDetail} />
            
        </Stack.Navigator>
    );
}

function App(props) {

    useEffect(() => {
        // setTimeout(() => {
        //   SplashScreen.hide();
        // }, 1200);
        
        // if (Platform.OS === 'ios') {
        //   PushNotificationIOS.setApplicationIconBadgeNumber(0);
        // }
    }, []);
    
    const toastConfig = {
      'custom_type': (internalState) => (
        <View style={{ width: '90%', backgroundColor: '#000000e0', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 17 }}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 11.5}}>{internalState.text1}</Text>
        </View>
      ),
      'push': ({text1, text2, props}) => (
        <TouchableOpacity style={{ width: Dimensions.get('window').width-40, backgroundColor: '#fff', borderRadius: 0, paddingHorizontal: 24, paddingVertical: 30, 
        shadowColor: "#000000", shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.4, shadowRadius: 2, elevation: 2,
        marginTop: 56, borderLeftWidth: 5, borderColor: '#6BD738', zIndex: 9 }} onPress={props.onPress ? props.onPress : null} activeOpacity={1}>
          {text1 ? <Text1 style={{color: '#000', fontSize: 15, fontWeight: 'bold', lineHeight: 18}}>{text1}</Text1> : null}
          {text1&&text2 ? <View style={{marginBottom: 2}} /> : null}
          {text2 ? <Text1 style={{color: '#000', fontSize: 14, lineHeight: 18}}>{text2}</Text1> : null}
        </TouchableOpacity>
      )
    }

	return (
        <Provider store={store}>
        {/* <Root> */}
            <NavigationContainer>
                {Stack_Navigation()}
            </NavigationContainer>
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        {/* </Root> */}
        </Provider>
	);
}

export default App;
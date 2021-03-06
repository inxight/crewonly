import React, {Component} from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Fonts } from './Fonts';

export default StyleSheet.create({
    header: { shadowColor: '#000000', elevation: 0, borderBottomWidth: 0 },
    headTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', /*textAlign: 'center', marginLeft: 24*/
        fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'bold':'normal' },
    menuTrigger: {
      justifyContent: 'center', alignItems:'center',
      width: 40, height: 48,
    },
    headRight: { position: 'absolute', top: -2, right: 0, alignItems: 'center', justifyContent: 'center', },
    headLeft: { alignItems: 'center', justifyContent: 'center', width: 44, },
    headLeftIcn: { flexDirection: 'row', justifyContent: 'center', /*justifyContent: 'flex-start', paddingLeft: 6,*/ },
    headBack: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44, flexDirection: 'row', },
    footWr: { flex: 1, flexDirection:'row', backgroundColor: '#232323', borderTopWidth: 1, borderColor: '#232323', },
    footIcn: { /*width: '90%', height: '85%'*/width: 25, height: 25, marginBottom: 3 },
    footTxt: { color: '#727171', fontSize: 11 },
	footBadge: { position: 'absolute', top: 0, right: '12%', 
	  transform: [
		{ scaleX: 0.7 },
		{ scaleY: 0.7 },
	  ]
	},
    bg0: { backgroundColor: '#f8f8f8' },
    bg1: { backgroundColor: '#f6f2ff' },
    bg2: { backgroundColor: '#fff' },
    bg3: { backgroundColor: '#333' },
    bg4: { backgroundColor: '#888' },
    bg5: { backgroundColor: '#f2f2f2' },
    container0: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    container1: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    container2: { flex: 1, flexDirection:'column', alignItems: 'center', justifyContent: 'center' },
    containerBottom: { flex: 1, alignItems: 'stretch', justifyContent: 'flex-end' },
    contentWrap1: { paddingHorizontal: 20, paddingVertical: 0 },
    contentWrap2: { paddingHorizontal: 20, paddingVertical: 24 },
    contentWrap3: { paddingHorizontal: 20, paddingVertical: 16 },
    contentWrap4: { paddingHorizontal: 20, paddingVertical: 20 },
    rowVerticalCenter: { flexDirection: 'row', alignItems: 'center' },
    rowVerticalCHorizonR: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
    rowVerticalCenterB: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    rowB: { flexDirection: 'row', justifyContent: 'space-between' },
    colB: { flexDirection: 'column', justifyContent: 'space-between' },
    btnConfirm: { marginVertical: 16 },
    btnConfirm1: { flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between' },
    btnConfirm2: { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 },
    btnConfirm2In: { height: 70, backgroundColor: '#F8F8F8E6', paddingVertical: 10, paddingHorizontal: 20, borderWidth: 0 },
    mt24: { marginTop: 24 },
    mt44: { marginTop: 44 },
    mt88: { marginTop: 88 },
    pt24: { paddingTop: 24 },
    pt36: { paddingTop: 36 },
    pt44: { paddingTop: 44 },
    pt88: { paddingTop: 88 },

    fix100: { position: 'absolute', width: '100%', height: '100%', zIndex: 10 },
    modalClose: { alignItems:'center', justifyContent: 'center', width: 60, height: 55, position:'absolute', top: 0, right: 0, zIndex: 2 },
    selectModal: { width: (Dimensions.get('window').width*0.8), height: '58%', borderRadius: 6, overflow: 'hidden', backgroundColor: '#fff' },
    bottomModal: { borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden', backgroundColor: '#fff', alignItems: 'center',
        // borderWidth: 1, borderBottomWidth: 0, borderColor: '#eaeaea',
        // elevation: 16, shadowColor: '#000',  shadowOffset: { width: 0, height: -10, }, shadowOpacity: 0.1, shadowRadius: 5.0
    },
    modalTitleTop: { width: '100%', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#e3e3e3', backgroundColor: '#fff' },
    modalTitleTop2: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, paddingTop: 10 },
    modalTitleTop3: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 10 },
    panelGradient: { width: '100%', position: 'absolute', top: -6, opacity: 0.8 },
    panelHandle: { width: 40, height: 4, borderRadius: 4, backgroundColor: '#00000040', marginTop: 12, },
    logoIcn: { width: 110, height: 22 },
    login_btn: { width: '76%', marginBottom: 10, height: 50, borderRadius: 4 },
    login_btnTxt: { color: '#fff', fontSize: 15, fontFamily: Fonts.PretendardMedium, fontWeight: 'bold' },
    login_btnGroup: { padding: 4 },
    login_btnGroup2: { width: '76%' },

    radiusL: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
    radiusR: { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 },

    toastTxt: { textAlign: 'center', fontSize: 12 },
    toastWr: { marginHorizontal: 20, marginTop: (Platform.OS === 'ios'?0:-40), marginBottom: 5, borderRadius: 50, zIndex: 1 },

    toastTxt2: { textAlign: 'center', fontSize: 15, color: '#fff', paddingHorizontal: 10, paddingVertical: 8 },
    toastWr2: { marginHorizontal: 20, borderRadius: 10, backgroundColor: '#000'
        , shadowColor: '#000000', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.8, shadowRadius: 6, elevation: 6, zIndex: 1 },

    ff: { fontFamily: Fonts.PretendardRegular },
    ff1r: { fontFamily: Fonts.PretendardRegular, fontWeight: 'normal' },
    ff1m: { fontFamily: Fonts.PretendardMedium, fontWeight: (Platform.OS === 'ios')?'500':'normal' },
    ff1b: { fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'bold':'normal' },
    ff1sb: { fontFamily: Fonts.PretendardSemiBold, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    ff1l: { fontFamily: Fonts.PretendardLight, fontWeight: 'normal' },
    text1: { color: '#888', fontSize: 14, },
    text2: { color: '#333', fontSize: 15, },
    text3: { color: '#333', fontSize: 12, },
    text4: { color: '#888', fontSize: 12, },
    text5: { color: '#999', fontSize: 11.5, },
    text6: { color: '#333', fontSize: 13, },
    text7: { color: '#333', fontSize: 14, },
    text8: { color: '#a2a2a2', fontSize: 12, },
    text9: { color: '#fff', fontSize: 14, fontWeight: 'normal' },
    clr1: { color: '#fff' },
    clr2: { color: '#727171' },
    clr3: { color: '#333' },
    clr4: { color: '#a5a5a5' },
    clr5: { color: '#F3937C' },
    txtDate: { color: '#9f9f9f', fontSize: 14, fontWeight: 'normal', letterSpacing: -0.5 },
    txtInfo: { color: '#727171', fontSize: 12, lineHeight: 16, marginTop: 2 },
    txtEmpty: { color: '#afafaf', fontSize: 13, paddingVertical: 26 },
    txtChkInfo: { color: 'red', fontSize: 12, marginTop: -4, marginLeft: 0, paddingBottom: 10 },
    txtPriceN: { color : '#333', fontSize: 14, fontFamily: Fonts.PretendardMedium, fontWeight: 'normal', letterSpacing: -0.2 },
    txtPrice: { color : '#222', fontSize: 16, fontFamily: Fonts.PretendardBold, fontWeight: 'bold', letterSpacing: -0.2 },
    txtPriceBig: { color : '#222', fontSize: 17, fontFamily: Fonts.PretendardBold, fontWeight: 'bold', letterSpacing: -0.8 },
    txtPriceDc: { color: '#a2a2a2', fontSize: 12, fontWeight: 'normal', letterSpacing: -0.2, textDecorationLine: 'line-through' },
    txtStrong: { color : '#FF2460' },
    txtStrong1: { color : '#7E4AFF' },
    cartCount: { color: '#fff', fontSize: 10.5, fontWeight: 'bold', letterSpacing: -0.6, textAlign: 'center' },
    cartCountBox: { position: 'absolute', top: 8, right: 2, minWidth: (Platform.OS==='ios'?18:16), paddingHorizontal: 4, paddingTop: 0, paddingBottom: 3, backgroundColor: '#FF2460', borderRadius: 50 },
    notiCountBox: { minWidth: 18, paddingHorizontal: 4, paddingVertical: 2, backgroundColor: 'red', borderRadius: 50 },
    notiCountBox2: { paddingHorizontal: 5, paddingVertical: 1, backgroundColor: 'red', borderRadius: 4, marginLeft: 4 },
    menuOn1: { position: 'absolute', bottom: 0, width: '100%', height: 2, backgroundColor: '#FF2460' },
    labelDeco: { width: 8, height: 8, resizeMode: 'contain', marginRight: 8 },

    inputGroup0: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputGroup1: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
    inputGroup2: { flex: 1, marginBottom: 6, marginTop: 0, },
    inputGroupLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: '#e3e3e3' },
    inputGroupLine2: { borderBottomWidth: 2, borderColor: '#333', overflow: 'hidden' },
    inputGroupIn: { flex: 0.75, },
    inputLabel0: { flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 4, marginBottom: 6, paddingTop: 8 },
    inputLabel: { flex: 0.25, fontSize: 14, },
    textInput: {
        width: '100%', height: 44, paddingVertical: 8, paddingHorizontal: 15,
        borderWidth: 1, borderRadius: 4, backgroundColor:'white', elevation: 0,
        fontSize: 13, color: '#333', borderColor: '#e3e3e3',
        fontFamily: Fonts.PretendardRegular
    },
    textInput1: {
        width: '100%', height: 44, paddingVertical: 8, paddingHorizontal: 15,
        borderWidth: 0, borderRadius: 4, backgroundColor:'white', elevation: 0,
        fontSize: 13, color: '#333',
        fontFamily: Fonts.PretendardRegular
    },
    textInput2: { height: 48 },
    textInput3: { height: 42 },
    textInputIcn: { zIndex: 2, position:'absolute', top: 0, right: 0, height: '100%', width: 44 },
    textArea: { paddingVertical: 10, paddingTop: 10, height: 120, textAlignVertical: 'top', backgroundColor: '#f6f6f6' },
    textAreaPh: { position: 'absolute', top: 0, left: 0, zIndex: 2, width: '100%', paddingHorizontal: 14, paddingVertical: 11 },
    selectBox: {
        width: '100%', height: 44, paddingHorizontal: 8, paddingHorizontal: 15, marginBottom: 0,
        borderWidth: 1, borderRadius: 4, backgroundColor:'white', elevation: 0, borderColor: '#e3e3e3',
        fontSize: 13,
    },
    selectBox2: { borderWidth: 1, borderColor: '#e3e3e3', borderRadius: 4 },
    selectBoxIcn: { position:'absolute', top: 15, right: 12, color: '#777', fontSize: 18 },
    selectBoxIcn1: { color: '#777', fontSize: 15 },
    selectBoxIcn2: { color: '#555', fontSize: 20 },
    selectBox1: { paddingHorizontal: 44, paddingVertical: 56 },
    dropPicker: { width: '100%', height: 34 },
    dropPickerLi: { backgroundColor: '#f1f1f1', borderWidth: 1, borderColor: '#e3e3e3' },
    dropPickerLabel: { fontSize: 13, color: '#333' },
    dropPickerPh: { fontSize: 13, color: '#999' },
    btnFrmline: { borderWidth: 1, borderRadius: 7, borderColor: '#b2b2b2', backgroundColor: '#b2b2b2',
        paddingHorizontal: 5, textAlign: 'center', height: 44, elevation: 0,
    },
    btnFrmline_st1: { borderColor: '#fff', height: 'auto', paddingTop: 10, paddingBottom: 8 },
    btnFrmlineTxt: { color: '#fff', fontSize: 14, textAlign: 'center' },
    btnSubmit: {
        borderWidth: 1, borderRadius: 4, borderColor: '#222', backgroundColor: '#222',
        textAlign: 'center', alignItems: 'center',width: '100%', height: 50, elevation: 0,
    },
    btnSubmitTxt: { color: '#fff', fontSize: 15, fontFamily: Fonts.PretendardMedium, letterSpacing: -0.5 },
    btnSearch: { /*backgroundColor: '#fff', */backgroundColor: 'transparent', width: 52, height: 42, elevation: 0, borderWidth: 0, alignItems: 'center', justifyContent: 'center' },
    btn_st1: { height: 56, borderWidth: 0, borderRadius: 0, elevation: 0 },
    btn_st2: { height: 50, borderColor: '#e3e3e3' },
    btn_st3: { height: 44, borderWidth: 1, borderColor: '#333', borderRadius: 6, elevation: 0 },
    btn_st4: { height: 42 },
    btn_bg0: { borderColor: '#7E4AFF', backgroundColor: '#7E4AFF' },
    btn_bg1: { borderColor: '#222', backgroundColor: '#222' },
    btn_bg2: { borderColor: '#727171', backgroundColor: '#727171' },
    btn_bg3: { borderColor: '#F89318', backgroundColor: '#F89318' },
    btn_bg4: { borderColor: '#E93323', backgroundColor: '#E93323' },
    btn_bg5: { borderColor: '#b2b2b2', backgroundColor: '#b2b2b2' },
    btnTxt_st1: { fontSize: 14, fontWeight: 'normal' },
    btnTxt_st2: { color: '#333', fontSize: 13, fontWeight: 'normal' },
    btnTxt_st3: { color: '#fff', fontWeight: 'normal' },
    checkBtn: { borderRadius: 2, borderColor: '#E93323' },
    checkLabel: { fontSize: 13, marginLeft: 14, paddingLeft: 6, paddingVertical: 8 },
    checkGroup:{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 2 },
    checkGroup_cb: { width: '70%', height: 22, elevation: 0 },
    imgBox: { marginVertical: 4, marginLeft: 0, marginRight: 8, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#dfdfdf', backgroundColor: '#f6f6f6' },
    btnScrollTop: {
        width: 38, height: 38, borderRadius: 38/2,
        borderWidth: 2, borderColor: '#00000085', backgroundColor: '#00000085',
        position: 'absolute', bottom: 70, right: 18,
        alignItems: 'center', justifyContent: 'center', opacity: 0.6, zIndex: 10
    },
    btnCart: {
        width: 44, height: 44, borderRadius: 44/2,
        borderWidth: 2, borderColor: '#FF2460', backgroundColor: '#FF2460',
        position: 'absolute', bottom: 70, right: 18,
        alignItems: 'center', justifyContent: 'center', opacity: 1, zIndex: 10
    },
    btnsBox1: { flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', },
    btnsBox1In: { flex: 1, flexDirection: 'column', margin: 2, },
    btnsBox2: { flex: 0.48, flexDirection: 'column', textAlign: 'center', alignItems: 'center',
        height: 210, borderRadius: 6, borderWidth: 0, backgroundColor: '#f1f1f1'
    },
    btnsBox2Icn: { width: 70, height: 70, marginTop: 10 },
    btn01: {
        margin: 0, borderWidth: 0, borderRadius: 6,
        height: 44, paddingHorizontal: 4, elevation: 0,
        textAlign: 'center', backgroundColor: '#eaeaea',
    },
    btnTxt01: { color: '#777', fontSize: 14, },
    line00: { borderBottomWidth: 4, borderColor: '#efefef', },
    line01: { borderBottomWidth: 1, borderColor: '#e3e3e3', },
    line02: { borderBottomWidth: 1, borderColor: '#a2a2a2', },
    line03: { borderTopWidth: 1, borderColor: '#f4f4f4', },
    subTitleWr: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    subTitleWr1: { borderColor: '#e3e3e3', borderTopWidth: 1 },
    subTitle00: { color: '#333', fontSize: 14, fontFamily: Fonts.PretendardMedium, fontWeight: 'bold' },
    subTitle01: { color: '#333', fontSize: 16, lineHeight: 22, letterSpacing: -0.4, fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    subTitle02: { color: '#111', fontSize: 15, lineHeight: 22, letterSpacing: -0.4, fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    subTitle04: { color: '#333', fontSize: 18, lineHeight: 22, letterSpacing: -0.4, fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    subTitle05: { color: '#333', fontSize: 22, lineHeight: 26, letterSpacing: -0.4, fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    subTitle06: { color: '#333', fontSize: 24, lineHeight: 34, letterSpacing: -0.6, fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    
    infoBoxBorder1: { marginTop: -10, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 50, backgroundColor: '#fff' },
    infoBoxBorder2: { marginVertical: 20, paddingVertical: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 4 },
    tagWrap: { paddingTop: 1, paddingBottom: 0, paddingRight: 4 },
    tagBox: { paddingRight: 10, paddingVertical: 4, borderRadius: 4, zIndex: 2 },
    tagTxt: { color: '#999', fontSize: 11, letterSpacing: -0.4 },
    tagColor: { width: 24, height: 6, marginRight: 2, marginTop: 2 },
    listtypeBox: { backgroundColor: '#333', borderRadius: 2, paddingHorizontal: 4, paddingVertical: 1, marginRight: 4, alignSelf: 'flex-start' },
    cateWrap: { width: 140, borderRadius: 50, backgroundColor: '#eee', overflow: 'hidden' },
    cateBox: { borderWidth: 0, borderRadius: 20, paddingHorizontal: 12, paddingTop: (Platform.OS==='ios'?8:10), paddingBottom: 8, minWidth: 10, /*flexDirection: 'row',*/ justifyContent: 'center', alignItems: 'center' },
    keywordBox: { flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', borderRadius: 20, 
        marginTop: 2, marginRight: 8, marginBottom: 6,
        paddingHorizontal: 16, paddingRight: 0, 
        backgroundColor: '#f8f8f8', borderWidth: 1, borderColor: '#e9e9e9' },
    keywordTxt: { color: '#333', fontSize: 13, letterSpacing: -0.2, fontFamily: Fonts.PretendardMedium },
    searchBox: { flexDirection:'row', alignItems: 'center', borderRadius: 20, marginTop: 2, marginRight: 8, marginBottom: 6, 
        paddingHorizontal: 16, paddingVertical: 10,
        backgroundColor: '#f8f8f8', borderWidth: 1, borderColor: '#e9e9e9' },
    searchIcn: { width: 30, height: 34, paddingRight: 4 },

    menuLi0: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#eaeaea', },
    menuLTM0: { flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', paddingRight: 12, paddingTop: 22, paddingBottom: 18 },
    menuLTM1: { borderWidth: 0, borderBottomWidth: 1 },
    menuLTxt0: { color: '#333', fontSize: 15, flex: 1, fontFamily: Fonts.PretendardMedium, fontWeight: (Platform.OS === 'ios')?'600':'normal' },
    menuLIcn0: { color: '#999', fontSize: 17, },
    menuLTxt1: { color: '#333', fontSize: 14, fontFamily: Fonts.PretendardMedium, fontWeight: 'bold', letterSpacing: -0.4 },
    menuLTxt2: { color: '#fff', fontSize: 14, marginTop: 4 },
    menuArrow: { color: '#000', fontSize: 26 },

    menuBox: { borderRadius: 6, overflow: 'hidden', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10
        , shadowColor: "#00000012", shadowOpacity: 0.2, shadowRadius: 2, elevation: 5, },
    menuWr: { paddingBottom: 0, borderBottomWidth: 1, borderColor: '#eee' },
    menuScroll: { paddingHorizontal: 10, alignItems: 'center' },
    menuScrollCenter: { justifyContent: 'center', flexGrow: 1, paddingHorizontal: 10, alignItems: 'center' },
    menuLi1: { paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderColor: '#fff', },
    mbnick: { fontSize: 13, lineHeight: 20, color: '#888', letterSpacing: -0.2 },
    mbicon: { width: 52, height: 52, borderRadius: 52/2, overflow: 'hidden', resizeMode: 'cover', borderWidth: 0.5, borderColor: '#e9e9e9', backgroundColor: '#fff' },
    shopicon: { width: 70, height: 70, borderRadius: 70/2, overflow: 'hidden', resizeMode: 'cover', borderWidth: 1, borderColor: '#f8f8f8', backgroundColor: '#fff' },
    mbicon_sm: { width: 42, height: 42, borderRadius: 42/2, marginRight: 12, borderWidth: 0, },

    wishBtn: { width: 32, height: 32, borderRadius: 32/2, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, right: 12 },
    wishBtn1: { width: 32, height: 32, borderRadius: 32/2, alignItems: 'center', justifyContent: 'center' },

    sldPager: {
        flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 0, paddingVertical: 0, zIndex: 2, borderRadius: 20, 
        //backgroundColor: 'transparent', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute', bottom: 10, left: 0, right: 0
    },
    sldPagerTxt: { color: '#B2B2B2', fontSize: 13, marginLeft: 2, },
    sldMarker: { alignItems: 'center', justifyContent: 'center', marginBottom: -7, width: 32, height: 32, backgroundColor: '#fff', borderRadius: 32/2, elevation: 8 },
    imgCover: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 0 },
    imgContain: { width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 0 },
    imgNone: { width: 42, height: 42, borderRadius: 42/2, backgroundColor: '#efefef' },
    writeBtn: { position: 'absolute', bottom: 80, right: 15, zIndex: 2, width: 56, height: 56, borderRadius: 56/2, backgroundColor: '#fff',
        alignItems: 'center', justifyContent: 'center', elevation: 2,
    },
    
    cateBtn: { paddingVertical: 7 },
    cateTxt1: { color: '#333', fontSize: 15, fontFamily: Fonts.PretendardMedium, fontWeight: 'bold', textAlign: 'center', },
    cateIcn: { width: 66, height: 66, overflow: 'hidden', marginBottom: 4 },

    calendar: { paddingBottom: 18 },
    clndArrow: { alignItems: 'center', justifyContent: 'center', width: 42, height: 42 },

    listItems1: { flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',
        paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#e3e3e3',
    },
    listItems1_subj: { color: '#111', fontSize: 14, paddingBottom: 6, lineHeight: 18, fontWeight: (Platform.OS === 'ios')?'bold':'normal' },
    listItems2: { flexDirection:'column', paddingVertical: 12, paddingHorizontal: 20, },
    listItems3: { flexDirection:'column',
        paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#dfdfdf',
    },
    listItems2_subj: { color: '#111', fontSize: 14, fontFamily: Fonts.PretendardBold, fontWeight: (Platform.OS === 'ios')?'bold':'normal' },

    listItems_shop: { borderWidth: 1, borderColor: '#dfdfdf', borderRadius: 10, overflow: 'hidden'
        , paddingHorizontal: 15, paddingTop: 20, paddingBottom: 18, marginHorizontal: 20, marginBottom: 16 },
    itemSubj: { fontSize: 14, fontFamily: Fonts.PretendardLight, color: '#333', lineHeight: 20 },
    item2Subj: { fontSize: 16, color: '#333', lineHeight: 20, letterSpacing: -0.4 },

    listCheckWr: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        lineHeight: 44, borderBottomWidth: 0, borderColor: '#e3e3e3', paddingRight: 20
    },
    listCheck: { paddingVertical: 10, paddingLeft: 12, },
    listCheckTxt: { fontSize: 12 },
    listBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#eaeaea', borderRadius: 20 },
    listBtn2: { paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 6 },
    listBtn3: { borderColor: '#888', borderWidth: 1, backgroundColor: '#fff' },
    listBtnTxt: { color: '#777', fontSize: 11.5, letterSpacing: -0.5 },

    rwRate: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginHorizontal: 6 },
    rwRate2: { color: '#777', fontSize: 14, fontWeight: 'bold', marginRight: 8 },
    rwCount: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
    rwIcn: { width: 24, height: 24, resizeMode: 'contain' },
    rwRateIcn: { width: 15, height: 15, marginRight: 1, resizeMode: 'contain' },
    rwStatusBar: { flexDirection: 'row', height: 10, flex: 1, borderRadius: 8, backgroundColor: '#e3e3e3' },

    optionList: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#e3e3e3', backgroundColor: '#fff', width: 105, borderRadius: 20, zIndex: 2 },
    optionListBtn: { width: 34, height: 32, alignItems: 'center', justifyContent: 'center' },
    optionListQty: { flex: 1, height: 32, alignItems: 'center', justifyContent: 'center', /*borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e3e3e3'*/ },
    optionSizeWrap: { position: 'absolute', zIndex: 2, top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
    optionSize: { paddingHorizontal: 8, paddingVertical: 1, borderRadius: 4, borderWidth: 1, borderColor: '#fff' },





});

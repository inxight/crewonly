import types from '../actions/types';

const defaultState = {
    mt_id: null,
    mt_idx: null,
    mt_level: 2,
    mt_name: null,
    mt_nickname: null,
    mt_email: null,
    mt_hp: null,
    mt_image1: null,
    mt_height: null,
    mt_weight: null,
    mt_size_chest: null,
    mt_size_waist: null,
    mt_size_hip: null,
    mt_size_shoes: null,
    mt_grade: null,
    mt_grade_lbl: null,
    mt_sn: null,
    mt_recommend: null,
    mt_login_type: '1',
    mt_app_token: null,
    mt_point: 0,
    mt_coupon: 0,
    mt_coupon2: 0,
    cart_cnt: null,
    push_cnt: null,
    mt_is_info1: null,
    mt_is_info2: null,
    mt_certify: null,
    updateTime: null,
}

export default login = (state = defaultState, action) => {
    // For Debugger
    // console.log(state);

    switch (action.type) {
        case types.UPDATE_LOGIN_CK:
            return {
                mt_id: action.mt_id,
                mt_idx: action.mt_idx,
                mt_level: action.mt_level,
                mt_name: action.mt_name,
                mt_nickname: action.mt_nickname,
                mt_email: action.mt_email,
                mt_hp: action.mt_hp,
                mt_image1: action.mt_image1,
                mt_height: action.mt_height,
                mt_weight: action.mt_weight,
                mt_size_chest: action.mt_size_chest,
                mt_size_waist: action.mt_size_waist,
                mt_size_hip: action.mt_size_hip,
                mt_size_shoes: action.mt_size_shoes,
                mt_grade: action.mt_grade,
                mt_grade_lbl: action.mt_grade_lbl,
                mt_sn: action.mt_sn,
                mt_recommend: action.mt_recommend,
                mt_login_type: action.mt_login_type,
                mt_app_token: action.mt_app_token,
                mt_point: action.mt_point,
                mt_coupon: action.mt_coupon,
                mt_coupon2: action.mt_coupon2,
                cart_cnt: action.cart_cnt,
                push_cnt: action.push_cnt,
                mt_is_info1: action.mt_is_info1,
                mt_is_info2: action.mt_is_info2,
                mt_certify: action.mt_certify,
                updateTime: action.updateTime,
            };
        default:
          return state;
    }
};

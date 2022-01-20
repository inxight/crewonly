import types from './types';

export function updateLogin(data) {
    const args = JSON.parse(data);

    return {
        type: types.UPDATE_LOGIN_CK,
        mt_id: args.mt_id,
        mt_idx: args.mt_idx,
        mt_level: args.mt_level,
        mt_name: args.mt_name,
        mt_nickname: args.mt_nickname,
        mt_email: args.mt_email,
        mt_hp: args.mt_hp,
        mt_image1: args.mt_image1,
        mt_height: args.mt_height,
        mt_weight: args.mt_weight,
        mt_size_chest: args.mt_size_chest,
        mt_size_waist: args.mt_size_waist,
        mt_size_hip: args.mt_size_hip,
        mt_size_shoes: args.mt_size_shoes,
        mt_grade: args.mt_grade,
        mt_grade_lbl: args.mt_grade_lbl,
        mt_sn: args.mt_sn,
        mt_recommend: args.mt_recommend,
        mt_login_type: args.mt_login_type,
        mt_app_token: args.mt_app_token,
        mt_point: args.mt_point,
        mt_coupon: args.mt_coupon,
        mt_coupon2: args.mt_coupon2,
        cart_cnt: args.cart_cnt,
        push_cnt: args.push_cnt,
        mt_is_info1: args.mt_is_info1,
        mt_is_info2: args.mt_is_info2,
        mt_certify: args.mt_certify,
        updateTime: args.updateTime,
    };
}

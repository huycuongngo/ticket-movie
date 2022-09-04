import { ACCESS_TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { ThongTinTaiKhoanDatVe } from "../../_cores/models/ThongTinTaiKhoanDatVe";
import { DANG_KY, DANG_NHAP, LAY_THONG_TIN_TAI_KHOAN_DAT_VE } from "../types/QuanLyUserActionType"

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: userLogin,
  userSignup: {},
  thongTinTaiKhoanDatVe: new ThongTinTaiKhoanDatVe(),
}

export const QuanLyUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      state.userLogin = action.payload;
      return { ...state };
    }
    case DANG_KY: {
      state.userSignup = action.payload;
      return { ...state };
    }
    case LAY_THONG_TIN_TAI_KHOAN_DAT_VE: {
      state.thongTinTaiKhoanDatVe = action.payload;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
}

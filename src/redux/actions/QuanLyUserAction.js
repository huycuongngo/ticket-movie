import { message } from "antd";
import { quanLyUserServices } from "../../services/QuanLyUserService";
import { DANG_NHAP, DANG_KY, LAY_THONG_TIN_TAI_KHOAN_DAT_VE } from "../types/QuanLyUserActionType";

export const dangNhapAction = (thongTinDangNhap, onReDirect) => {
  return async (dispatch) => {
    try {
      let response = await quanLyUserServices.dangNhap(thongTinDangNhap);
      // console.log("🚀 ~ file: QuanLyUserAction.js ~ line 7 ~ return ~ response", response);
      if (response.status === 200) {
        message.success("Dang nhap thanh cong!");
        dispatch({
          type: DANG_NHAP,
          payload: response.data.content,
        });
        setTimeout(() => {
          onReDirect();
        }, 500);
      } else {
        message.error("Dang nhap that bai!");
      }
    } catch (error) {
      // console.log(error);
      message.error(error.response.data.content);
    }
  };
}

export const dangKyAction = (thongTinDangKy, onReDirect) => {

  return async (dispatch) => {
    try {
      let response = await quanLyUserServices.dangKy(thongTinDangKy);
      // console.log("🚀 ~ file: QuanLyUserAction.js ~ line 34 ~ return ~ response", response);
      if (response.status === 200) {
        message.success("Đăng ký thành công!");
        dispatch({
          type: DANG_KY,
          payload: response.data.content,
        })
        setTimeout(() => {
          onReDirect();
        }, 500)
      } else {
        message.error("Đăng ký thất bại!");
      }
    } catch (error) {
      // console.log(error);
      message.error(error.response.data.content);
    }
  }
}

export const layThongTinTaiKhoanDatVeAction = () => {

  return async (dispatch) => {
    try {
      let response = await quanLyUserServices.layThongTinTaiKhoanDatVe();
      // console.log("🚀 ~ file: QuanLyUserAction.js ~ line 34 ~ return ~ response", response)
      if (response.status === 200) {
        dispatch({
          type: LAY_THONG_TIN_TAI_KHOAN_DAT_VE,
          payload: response.data.content,
        })
      }
    } catch (error) {
      // console.log(error);
    }
  }
}

import { message } from "antd";
import { quanLyUserServices } from "../../services/QuanLyUserService";
import { DANG_NHAP, LAY_THONG_TIN_TAI_KHOAN_DAT_VE } from "../types/QuanLyUserActionType";

export const dangNhapAction = (thongTinDangNhap, onDirect) => {
  return async (dispatch) => {
    try {
      let response = await quanLyUserServices.dangNhap(thongTinDangNhap);
      console.log("🚀 ~ file: QuanLyUserAction.js ~ line 7 ~ return ~ response", response);
      if (response.status === 200) {
        message.success("Dang nhap thanh cong!");
        dispatch({
          type: DANG_NHAP,
          payload: response.data.content,
        });
        setTimeout(() => {
          onDirect();
        }, 500);
      } else {
        message.error("Dang nhap that bai!");
      }
    } catch (error) {
      message.error("Dang nhap that bai!");
      console.log(error);
    }
  };
}

export const layThongTinTaiKhoanDatVeAction = () => {

  return async (dispatch) => {
    try {
      let response = await quanLyUserServices.layThongTinTaiKhoanDatVe();
      console.log("🚀 ~ file: QuanLyUserAction.js ~ line 34 ~ return ~ response", response)
      if (response.status === 200) {
        dispatch({
          type: LAY_THONG_TIN_TAI_KHOAN_DAT_VE,
          payload: response.data.content,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

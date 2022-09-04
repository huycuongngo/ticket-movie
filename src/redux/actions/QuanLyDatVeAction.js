import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { CHUYEN_TAB, DAT_VE_HOAN_TAT, LAY_THONG_TIN_PHONG_VE } from "../types/QuanLyDatVeType";
import { message } from 'antd';
import { hideLoadingAction, showLoadingAction, } from "./LoadingAction";

export const layThongTinPhongVeAction = (maLichChieu) => {

  return async (dispatch) => {
    try {
      let response = await quanLyDatVeService.layThongTinPhongVe(maLichChieu);
      console.log("🚀 ~ file: QuanLyDatVeAction.js ~ line 8 ~ return ~ response", response);
      if (response.status === 200) {
        dispatch({
          type: LAY_THONG_TIN_PHONG_VE,
          payload: response.data.content,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const datVeAction = (thongTinDatVe) => {

  return async (dispatch) => {
    try {
      dispatch(showLoadingAction)
      if (thongTinDatVe.danhSachVe !== null) {
        let response = await quanLyDatVeService.datVe(thongTinDatVe);
        console.log(response);
        if (response.status === 200) {
          await dispatch(layThongTinPhongVeAction(thongTinDatVe.maLichChieu));
          await dispatch({
            type: DAT_VE_HOAN_TAT,
            payload: '',
          })
          await dispatch(hideLoadingAction)
          dispatch({
            type: CHUYEN_TAB,
            payload: 2,
          })
          message.success(response.data.content);
        } else {
          message.error("Đặt vé thất bại!")
          dispatch(hideLoadingAction)
        }
      } else {
        message.error("Đặt vé thất bại!")
        dispatch(hideLoadingAction)
      }
    } catch (error) {
      dispatch(hideLoadingAction)
      message.error("Đặt vé thất bại!")
      console.log(error);
    }
  }
}

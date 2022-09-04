import { quanLyRapServices } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP } from "../types/QuanLyRapActionType";

export const layDanhSachHeThongRapAction = () => {

  return async dispatch => {
    try {
      const response = await quanLyRapServices.layDanhSachHeThongRap();
      // console.log("🚀 ~ file: QuanLyRapAction.js ~ line 9 ~ layDanhSachHeThongRapAction ~ response", response)
      if (response.status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP,
          payload: response.data.content,
        })
      }
    } catch (error) {
      // console.log("🚀 ~ file: QuanLyRapAction.js ~ line 6 ~ return ~ error", error)
    }
  }
}

export const layThongTinLichChieuPhimTheoRapAction = (maPhim) => {

  return async (dispatch) => {
    try {
      const response = await quanLyRapServices.layThongTinLichChieuPhimTheoRap(maPhim);
      // console.log("🚀 ~ file: QuanLyRapAction.js ~ line 27 ~ return ~ response", response);
      if (response.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHIM,
          payload: response.data.content,
        })
      }
    } catch (error) {
      // console.log(error);
    }
  };
}

import { quanLyPhimServices } from "../../services/QuanLyPhimServices";
import { ADD_FILM, CAP_NHAT_PHIM, LAY_THONG_TIN_PHIM, SET_FILM } from "../types/QuanLyPhimActionType";

export const layDanhSachPhimAction = () => {

  return async dispatch => {
    try {
      const response = await quanLyPhimServices.layDanhSachPhim();
      console.log("🚀 ~ file: QuanLyPhimAction.js ~ line 9 ~ layDanhSachPhimAction ~ response", response)
      if (response.status === 200) {
        dispatch({
          type: SET_FILM,
          payload: response.data.content
        })
      } 
    } catch (error) {
      console.log("🚀 ~ file: QuanLyPhimAction.js ~ line 14 ~ layDanhSachPhimAction ~ error", error)
    }
  };
}

export const themPhimAction = (formData) => {

  return async (dispatch) => {
    try {
      const response = await quanLyPhimServices.themPhim(formData);
      console.log("🚀 ~ file: QuanLyPhimAction.js ~ line 27 ~ return ~ response", response);
      alert("them thanh cong");
      dispatch({
        type: ADD_FILM,
        payload: response.data.content
      })
    } catch (error) {
      console.log(error)
    }
  };
}

export const layThongTinPhimAction = (maPhim) => {

  return async (dispatch) => {
    try {
      let response = await quanLyPhimServices.layThongTinPhim(maPhim);
      console.log("🚀 ~ file: QuanLyPhimAction.js ~ line 44 ~ return ~ response", response)
      dispatch({
        type: LAY_THONG_TIN_PHIM,
        payload: response.data.content,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const capNhatPhimAction = (formData) => {

  return async (dispatch) => {
    try {
      let response = await quanLyPhimServices.capNhatPhim(formData);
      console.log("🚀 ~ file: QuanLyPhimAction.js ~ line 60 ~ return ~ response", response);
      alert('cap nhat thanh cong');

      dispatch(layDanhSachPhimAction());

    } catch (error) {
      console.log(error)
    }
  }
}

export const xoaPhimAction = (maPhim) => {

  return async dispatch => {
    try {
      let response = await quanLyPhimServices.xoaPhim(maPhim);
      console.log("🚀 ~ file: QuanLyPhimAction.js ~ line 77 ~ xoaPhimAction ~ response", response)
      if (response.status === 200) {
        alert("Xóa phim thành công!");
      }
      dispatch(layDanhSachPhimAction());
      
    } catch (error) {
      console.log(error)
    }
  };
}

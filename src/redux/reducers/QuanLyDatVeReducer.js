import { ThongTinPhongVe } from "../../_cores/models/ThongTinPhongVe";
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, DAT_VE_HOAN_TAT, LAY_THONG_TIN_PHONG_VE } from "../types/QuanLyDatVeType";

const stateDefault = {
  thongTinPhongVe: new ThongTinPhongVe(),
  danhSachGheDangDat: [],
  tabActive: 1,
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_THONG_TIN_PHONG_VE: {
      state.thongTinPhongVe = action.payload;
      return { ...state };
    }

    case DAT_VE: {
      // cập nhật ds ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex((ghe) => {

        return ghe.tenGhe === action.payload.tenGhe;
      })
      if (index === -1) {
        danhSachGheCapNhat.push(action.payload);
      } else {
        danhSachGheCapNhat.splice(index, 1);
      }

      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }

    case CHUYEN_TAB: {
      state.tabActive = action.payload;
      return { ...state };
    }
      
    default: {
      return { ...state };
    }
  }
}

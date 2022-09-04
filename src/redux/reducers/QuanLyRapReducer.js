import { SET_HE_THONG_RAP } from "../types/QuanLyRapActionType";

const stateDefault = {
  heThongRapChieu: [],

  
}

export const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP: {
      state.heThongRapChieu = action.payload;
      return { ...state };
    }
      
    default: {
      return { ...state };
    }
  }
}

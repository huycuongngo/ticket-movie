import { ADD_FILM, CAP_NHAT_PHIM, LAY_THONG_TIN_PHIM, SET_FILM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../types/QuanLyPhimActionType";
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapActionType";

const stateDefault = {
  arrayFilm: [
  ],
  dangChieu: true,
  sapChieu: false,
  arrayFilmDefault: [],
  filmDetail: {},

  thongTinPhim: {},


}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_FILM: {
      state.arrayFilm = action.payload;
      state.arrayFilmDefault = state.arrayFilm
      return { ...state };
    }

    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = true;
      state.sapChieu = false;

      state.arrayFilm = state.arrayFilmDefault.filter(film => film.dangChieu === state.dangChieu)
      return { ...state };
    }

    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = true;
      state.dangChieu = false;

      state.arrayFilm = state.arrayFilmDefault.filter(film => film.sapChieu === state.sapChieu)
      return { ...state };
    }

    case ADD_FILM: {
      state.arrayFilm.push(action.payload);
      state.arrayFilmDefault = state.arrayFilm

      return { ...state };
    }

    case LAY_THONG_TIN_PHIM: {
      state.thongTinPhim = action.payload;

      return { ...state };
    }
    
    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.payload;
      return { ...state };
      }
    default: return { ...state };
  }
}

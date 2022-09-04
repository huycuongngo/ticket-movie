import { SET_CAROUSEL } from "../types/CarouselActionType";

const stateDefault = {
  arrBanners: [
    {
      "maBanner": 1,
      "maPhim": 1282,
      "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
    },
  ],
};

export const CarouselReducer = (state = stateDefault, action) => {

  switch (action.type) {
    case SET_CAROUSEL: {
      state.arrBanners = action.payload;
      return { ...state };
    }

    default: return { ...state }
  }
}

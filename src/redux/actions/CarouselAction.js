import { quanLyPhimServices } from "../../services/QuanLyPhimServices";
import { SET_CAROUSEL } from "../types/CarouselActionType";

export const getCarouselAction = (param) => {

  return async dispatch => {
    try {
      const response = await quanLyPhimServices.layDanhSachBanner();
      console.log("🚀 ~ file: CarouselAction.js ~ line 15 ~ getCarouselAction ~ response", response);

      dispatch({
        type: SET_CAROUSEL,
        payload: response.data.content
      })

    } catch (error) {
      console.log("🚀 ~ file: CarouselAction.js ~ line 18 ~ getCarouselAction ~ error", error)
    }
  };
}

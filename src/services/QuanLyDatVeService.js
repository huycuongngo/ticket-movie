import { GROUPID } from "../utils/settings/config";
import { ThongTinDatVe } from "../_cores/models/ThongTinDatVe";
import { baseService } from "./baseServices";

class QuanLyDatVeService extends baseService {
  constructor() {
    super()
  }

  layThongTinPhongVe = (maLichChieu) => {
    return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
  }
  
  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  }
}

export const quanLyDatVeService = new QuanLyDatVeService();

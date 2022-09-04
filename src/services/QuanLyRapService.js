import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseServices";

class QuanLyRapServices extends baseService{
  constructor() {
    super()
  }

  layDanhSachHeThongRap() {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
  }

  layThongTinLichChieuPhimTheoRap(maPhim) {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  }
}

export const quanLyRapServices = new QuanLyRapServices();

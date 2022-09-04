import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseServices";

class QuanLyPhimServices extends baseService{
  constructor() {
    super()
  }

  layDanhSachBanner = () => {
  
    return this.get('/api/QuanLyPhim/LayDanhSachBanner');
  }

  layDanhSachPhim = () => {
  
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  }

  themPhim = (formData) => {
  
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  }

  layThongTinPhim = (maPhim) => {
  
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  }

  capNhatPhim = (formData) => {
  
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  }

  xoaPhim = (maPhim) => {
  
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
  }
}

export const quanLyPhimServices = new QuanLyPhimServices();

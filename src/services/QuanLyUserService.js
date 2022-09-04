import { baseService } from "./baseServices";

class QuanLyUserSerive extends baseService {
  constructor() {
    super()
  }

  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  }

  dangKy = (thongTinDangKy) => {
    
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  }

  layThongTinTaiKhoanDatVe = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`, {});
  }

}

export const quanLyUserServices = new QuanLyUserSerive();

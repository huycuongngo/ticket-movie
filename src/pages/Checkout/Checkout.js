import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import styles from "./Checkout.module.scss";
import { datVeAction, layThongTinPhongVeAction } from "../../redux/actions/QuanLyDatVeAction"
import { layThongTinTaiKhoanDatVeAction } from "../../redux/actions/QuanLyUserAction"
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE } from '../../redux/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_cores/models/ThongTinDatVe';
import { Tabs } from 'antd';
import moment from 'moment';

function Checkout(props) {
  const dispatch = useDispatch();
  const { userLogin } = useSelector(state => state.QuanLyUserReducer);
  console.log(userLogin);
  const { thongTinPhongVe, danhSachGheDangDat, danhSachGheKhachDangDat } = useSelector(state => state.QuanLyDatVeReducer)
  console.log(thongTinPhongVe);

  const { thongTinPhim, danhSachGhe } = thongTinPhongVe;

  const { id } = useParams();

  useEffect(() => {
    dispatch(layThongTinPhongVeAction(id));
  }, [])

  const renderSeats = () => {

    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "ghe-vip" : "";
      let classGheKhachDaDat = ghe.daDat ? "ghe-da-dat" : "";
      let classGheDangDat = "";
      let classGheMinhDat = "";
      let classGheKhachDangDat = "";

      // Kiểm tra từng ghế render xem có trong mảng ghế khách đang đặt hay không
      let indexGheKhachDangDat = danhSachGheKhachDangDat.findIndex((gheKhachDangDat) => gheKhachDangDat.maGhe === ghe.maGhe)
      if (indexGheKhachDangDat !== -1) {
        classGheKhachDangDat = 'ghe-khach-dang-dat';
      }

      // Kiểm tra xem ghế chính mình đặt trong mảng ghế đã đặt
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheMinhDat = "ghe-minh-dat";
      }

      // Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDangDat = danhSachGheDangDat.findIndex((gheDangDat) => {

        return gheDangDat.maGhe === ghe.maGhe;
      })
      if (indexGheDangDat != -1) {
        classGheDangDat = "ghe-dang-dat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                payload: ghe,
              })
            }}
            disabled={ghe.daDat || classGheKhachDangDat !== ""}
            className={`${styles.ghe} ${styles[classGheVip]} ${styles[classGheKhachDaDat]} ${styles[classGheDangDat]} ${styles[classGheMinhDat]} ${styles[classGheKhachDangDat]} text-center`}
          >
            {ghe.daDat ? (userLogin.taiKhoan === ghe.taiKhoanNguoiDat ? <UserOutlined style={{ color: "green", fontSize: "1.5rem" }} /> : <CloseOutlined />) : ghe.stt}
          </button>

          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  }

  return (
    <div className='container my-10'>
      <div className='grid grid-cols-12'>
        <div className='col-span-9'>
          <p className='font-bold'>Màn hình</p>
          <div className={`${styles.hinhthang} mx-auto mb-5`}></div>
          <div>{renderSeats()}</div>
          <div>
            <table className='mx-auto mt-10'>
              <tr>
                <th>Ghế Thường Chưa Đặt</th>
                <th>Ghế Vip Chưa Đặt</th>
                <th>Ghế Khách Đã Đặt</th>
                <th>Ghế Mình Đã Đặt</th>
                <th>Ghế Khách Đang Đặt</th>
              </tr>
              <tr>
                <td><button className='text-center w-8 h-8 border rounded-sm border-red-500'></button></td>
                <td><button className='text-center border-red-500 bg-orange-500 w-8 h-8 border rounded-sm'></button></td>
                <td><button className='text-center bg-red-500 w-8 h-8 border rounded-sm'>X</button></td>
                <td><button className='text-center w-8 h-8 border rounded-sm border-red-400'><UserOutlined style={{ color: "green", fontSize: "1.5rem" }} /></button></td>
                <td><button className={`${styles['ghe-khach-dang-dat']}text-center w-8 h-8 border rounded-sm bg-blue-500`}></button></td>
              </tr>
            </table>
          </div>
        </div>

        <div className='col-span-3 min-h-screen'>
          <h3 className='text-center text-2xl'>{thongTinPhim.tenPhim}</h3>
          <p>{thongTinPhim?.diaChi}</p>
          <div className='flex justify-between'>
            <p>{thongTinPhim.ngayChieu}  - {thongTinPhim.gioChieu}</p>
            <p>{thongTinPhim.tenRap}</p>
          </div>
          <hr />
          <div className='grid grid-cols-2 my-5'>
            <div className='text-left'>
              <p className='text-red-500'>Ghế</p>
              {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDangDat, index) => {

                return (
                  <>
                    <span key={index}
                      className="text-green-500 mx-2"
                    >
                      {gheDangDat.tenGhe}
                    </span>
                    {(index + 1) % 5 === 0 ? <br /> : ""}
                  </>
                );
              })
              }
            </div>
            <div className='text-right'>
              <span className=''>
                {
                  danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {

                    return tongTien += gheDangDat.giaVe;
                  }, 0).toLocaleString()
                }
              </span>
            </div>
          </div>
          <hr />
          <div className='text-left my-5'>
            <p>Email:</p>
            <p>{userLogin?.email}</p>
          </div>
          <hr />
          <div className='text-left my-5'>
            <p>Phone:</p>
            <p>{userLogin?.soDT}</p>
          </div>
          <hr />
          <div className='text-left flex justify-between my-5'>
            <div>
              <p>Mã giảm giá:</p>
              <input placeholder='Nhập mã giảm giá...' className='border-2 rounded-lg' />
            </div>
            <div>
              <button className='border-2 rounded-lg p-2'>Áp dụng</button>
            </div>
          </div>
          <hr />

          <div className='w-full'>
            <button
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                console.log("thongTinDatVe",thongTinDatVe);

                dispatch(datVeAction(thongTinDatVe));
              }}
              className='w-full p-5 border-2 rounded-lg text-2xl bg-red-400'>Đặt vé</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();

  const { thongTinTaiKhoanDatVe } = useSelector(state => state.QuanLyUserReducer);
  console.log(thongTinTaiKhoanDatVe);

  useEffect(() => {
    dispatch(layThongTinTaiKhoanDatVeAction());
  }, [])

  
  const renderThongTinTaiKhoanDatVe = () => {

    // return thongTinTaiKhoanDatVe
  }

  const renderKetQuaDatVe = () => {

    return thongTinTaiKhoanDatVe.thongTinDatVe.map((ve, index) => {
      // lấy ra phần tử đầu tiên trong mảng danhSachGhe
      const seats = _.first(ve.danhSachGhe);

      return (
        <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ve.hinhAnh} />
            <div className="flex-grow text-left">
              <h2 className="text-gray-900 title-font font-medium">Tên phim: {ve.tenPhim}</h2>
              <p className="text-gray-500">Giờ chiếu: {moment(ve.ngayDat).format('HH:mm A')} - Ngày Chiếu: {moment(ve.ngayDat).format("DD/MM/YYYY")}</p>
              <p>Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
              <p>Danh Sách Ghế:
                {
                  ve.danhSachGhe.map((ghe, index) => {
                    return (
                      <span key={index}> {ghe.tenGhe}</span>
                    );
                  })
                }
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className=''>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">KẾT QUẢ ĐẶT VÉ</h1>
          </div>
          <div className="flex flex-wrap -m-2">
            {renderKetQuaDatVe()}
          </div>
        </div>
      </section>

    </div>
  )
}
const { TabPane } = Tabs;

export default function Demo(props) {
  const dispatch = useDispatch();

  const onChange = (key) => {
    dispatch({
      type: CHUYEN_TAB,
      payload: key, 
    })
  };

  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
  console.log(tabActive);

  return (
    <div className='p-5'>
      <Tabs defaultActiveKey={tabActive.toString()} activeKey={tabActive.toString()} onChange={onChange}>
        <TabPane
          tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane
          tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

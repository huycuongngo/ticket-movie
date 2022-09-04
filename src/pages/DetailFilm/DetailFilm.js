import React, { useEffect } from 'react'
import { Progress } from 'antd';
import { Tabs } from 'antd';
import moment from 'moment';


import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuPhimTheoRapAction } from '../../redux/actions/QuanLyRapAction';
import { StarOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;

export default function DetailFilm(props) {
  const dispatch = useDispatch();
  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
  // console.log("filmDetail", filmDetail);

  useEffect(() => {
    // lay thong tin maPhim tu url, nen lay o trong useEffect
    let { id } = props.match.params;
    dispatch(layThongTinLichChieuPhimTheoRapAction(id));

    //return();
  }, []);

  const renderChiTietPhim = () => {
    return filmDetail.heThongRapChieu?.map((heThongRap, index) => {

      return (
        <TabPane
          tab={
            <div>
              <img style={{ width: "50px", height: '50px' }} src={heThongRap.logo} alt="" />
            </div>
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {
              heThongRap.cumRapChieu?.map((rapChieu, index) => {

                return (
                  <TabPane
                    tab={
                      <div className='text-left text-black'>
                        <img style={{ width: "50px", height: '50px' }} src={rapChieu.hinhAnh} alt="" />
                        <p>{rapChieu.diaChi}</p>
                        <p>{rapChieu.tenCumRap}</p>
                      </div>
                    }
                    key={index}
                  >
                    <div className='grid grid-cols-3' style={{ height: '500px', overflowY: 'scroll' }}>
                      {
                        rapChieu.lichChieuPhim?.map((lichChieu, index) => {

                          return (
                            <div key={index} className='border-2 rounded-lg m-5 font-bold'>
                              <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="hover:text-red-300">
                                <p>{lichChieu.tenRap}</p>
                                <p>{lichChieu.giaVe}vnd</p>
                                <p>{moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY-HH:mm")}</p>
                              </NavLink>
                            </div>
                          );
                        })
                      }
                    </div>
                  </TabPane>
                );
              })
            }
          </Tabs>
        </TabPane>
      );
    })
  }

  return (
    <div>
      <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", minHeight: '100vh' }}>
        <CustomCard
          style={{ paddingTop: 150, minHeight: '100vh' }}
          effectColor="#000" // required
          color="#fff" // default color is white
          blur={3} // default blur value is 10px
          borderRadius={0} // default border radius value is 10px
        >
          <div className='grid grid-cols-12'>
            <div className='col-start-3 col-span-4'>
              <div className='grid grid-cols-2'>
                <img src={`${filmDetail.hinhAnh}`} alt="logophim" />
                <div className='my-auto px-5 text-left ml-5 flex flex-col justify-center'>
                  <p>Ten phim: <span className='text-red-600 font-bold'>{filmDetail.tenPhim}</span></p>
                  <p>Ngay Chieu: <span className='text-red-600 font-bold'>{moment(filmDetail.ngayKhoiChieu).format("DD/MM/YYYY - HH:mm")}</span></p>
                  <p>Mo ta: <span className='text-red-600 font-bold'>{filmDetail.moTa}</span></p>
                </div>
              </div>
            </div>
            <div className='col-start-10'>
              <h1 className='mb-5 bg-white text-blue-500'>Đánh giá phim</h1>
              <Progress
                strokeColor="yellow"
                type="circle"
                percent={filmDetail.danhGia * 10}
                format={(percent) => {
                  return (
                    <p className='flex flex-col'>
                      <span>{percent / 10}</span>
                      <span style={{ fontSize: '20px', color: 'yellow' }}><StarOutlined /></span>
                    </p>
                  )
                }}
              />
            </div>
          </div>

          <div className='mt-10 p-10 containe'>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<div className='bg-white px-5 py-2 border-2 rounded-lg'>Lịch Chiếu</div>} key="1">
                <Tabs tabPosition="left">
                  {renderChiTietPhim()}
                </Tabs>
              </TabPane>
              <TabPane tab={<div className='bg-white px-5 py-2 border-2 rounded-lg'>Thông tin</div>} key="2">
                Thông tin Phim
              </TabPane>
              <TabPane tab={<div className='bg-white px-5 py-2 border-2 rounded-lg'>Đánh Giá</div>} key="3">
                Đánh giá
              </TabPane>
            </Tabs>
          </div>
        </CustomCard>

      </div>
    </div>
  )
}

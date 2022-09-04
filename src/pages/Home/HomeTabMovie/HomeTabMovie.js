import React from 'react'
import { Tabs } from 'antd';
import moment from "moment";

const { TabPane } = Tabs;

export default function HomeTabMovie(props) {
  const { heThongRapChieu } = props;
  // console.log("🚀 ~ file: HomeTabMovie.js ~ line 8 ~ HomeTabMovie ~ heThongRap", heThongRapChieu)

  const renderHeThongRapChieu = () => {

    return heThongRapChieu?.map((heThongRap, index) => {

      return (
        <TabPane
          key={index}
          tab={
            <img src={heThongRap.logo} alt="" className='border-0 rounded-full w-10 h-10' />
          }
        >
          <Tabs tabPosition="left" style={{ height: 500 }} defaultActiveKey="1">
            {
              heThongRap.lstCumRap?.map((cumRap, index) => {

                return (
                  <TabPane
                    key={index}
                    tab={
                      <div className='flex'>
                        <img src={cumRap.hinhAnh} alt="" width="50px" />
                        <div className='ml-2 text-left'>
                          <p className='text-left my-2'>{cumRap.tenCumRap}</p>
                          <a className='text-red-400'>Xem Chi Tiet</a>
                        </div>
                      </div>
                    }
                  >
                    <Tabs tabPosition="left" style={{ height: 500 }} defaultValue="1">
                      {
                        cumRap.danhSachPhim?.map((phim, index) => {

                          return (
                            <TabPane
                              key={index}
                              tab={
                                <div className='flex items-center'>
                                  <img src={phim.hinhAnh} alt="" width="50px" />
                                  <p className='ml-2'>{phim.tenPhim}</p>
                                  <hr />
                                </div>
                              }
                            >
                              <div className="grid grid-cols-2 gap-5">
                                {
                                  phim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
                                    if (index < 6) {
                                      return (
                                        <div className='mr-2 border-2 rounded-lg p-2 hover:shadow-xl hover:cursor-pointer text-blue-500'>
                                          <p>{ lichChieu.tenRap}</p>
                                          <span className="text-center">
                                            {moment(lichChieu.ngayChieuGioChieu).format(
                                              "DD/MM/YYYY - HH:mm"
                                            )}
                                          </span>
                                        </div>
                                      )
                                    }
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
          </Tabs>
        </TabPane>
      )
    })
  }

  return (
    <div>
      <Tabs tabPosition="left">
        {renderHeThongRapChieu()}
      </Tabs>
    </div>
  )
}


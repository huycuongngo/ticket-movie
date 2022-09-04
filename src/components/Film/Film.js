import React from 'react'

export default function (props) {
  const { film } = props;


  // {
  //   "maPhim": 1296,
  //     "tenPhim": "Avengers: Infinity War ",
  //       "biDanh": "avengers-infinity-war",
  //         "trailer": "https://www.youtube.com/embed/DKqu9qc-5f4",
  //           "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/avengers-infinity-war.jpg",
  //             "moTa": "Biệt đội siêu anh hùng Avengers và những đồng minh sẽ phải sẵn sàng hi sinh tính mạng để chống lại siêu ác nhân hùng mạnh Thanos trước khi hắn phá huỷ mọi thứ và đặt dấu chấm hết cho vũ trụ. ",
  //               "maNhom": "GP00",
  //                 "ngayKhoiChieu": "2019-07-29T00:00:00",
  //                   "danhGia": 5,
  //                     "hot": true,
  //                       "dangChieu": false,
  //                         "sapChieu": true
  // },


  return (
    <div style={{height: '500px'}} className="m-2 bg-gray-100 bg-opacity-75 p-5 rounded-lg overflow-hidden text-center relative flex flex-col items-center justify-between">
      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{film.tenPhim}</h2>
      <div style={{ backgroundImage: `url(${film.hinhAnh}), url(https://picsum.photos/300)`, backgroundPosition: 'center', backgroundSize: '100%' }}>
        <img src={film.hinhAnh} alt="" className='w-48 h-50 mx-auto opacity-0' />
      </div>
      <p className="leading-relaxed my-3">{film.moTa.length > 100 ? <span>{film.moTa.slice(0, 100)}...</span> : <span>{film.moTa}</span>}</p>
      <a className="text-indigo-500 inline-flex items-center">Xem Chi Tiet
      </a>
    </div>
  )
}

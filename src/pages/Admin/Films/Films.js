import React, { useEffect } from 'react'
import { Button, Table } from 'antd';

import { Input } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';


const { Search } = Input;

const columns = [
  {
    title: 'Mã Phim',
    dataIndex: 'maPhim',
    width: "10%"
  },
  {
    title: 'Tên Phim',
    dataIndex: 'tenPhim',
    width: '20%'
  },
  {
    title: 'Hình Ảnh',
    dataIndex: 'hinhAnh',
    render: (text, film, index) => {

      return (
        <div key={index}>
          <img src={film.hinhAnh} style={{ width: '100px', height: '100px' }} alt="phim"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = `https://picsum.photos/id/${index}/100/100`;
              //return();
            }}
          />
        </div>
      );
    },
    width: "20%",
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    width: '40%'
  },
  {
    title: 'Thao tác',
    dataIndex: 'maPhim',
    render: (text, film, index) => {

      return (
        <div className='flex'>

          {/* cách dùng font awesome
          <div className='bg-black text-white'>
            <i className="fa fa-edit"></i>
          </div>
          <div className=''>
            <i className="fa fa-trash"></i>
          </div> */}

          {/* cách dùng ant desgin  */}
          <NavLink key={1} className='bg-slate-400 text-white mr-2 p-2 text-2xl' to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
          <span style={{ cursor: 'pointer' }}
            onClick={() => {
              if (window.confirm("Ban co chac muon xoa phim" + film.tenPhim)) {
                // goi action
                // dispatch(xoaPhimAction(film.maPhim))
                alert('xoa phim thanh cong');
              }
              //return();
            }}

            key={2} className='bg-red-600 text-white p-2 text-2xl' ><DeleteOutlined /></span>
        </div>
      );
    },
  },
];


const onSearch = (value) => console.log(value);

export default function Films(props) {
  const { arrayFilm } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const data = arrayFilm;


  // Goi API lay danh sach phim
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    // return()
  }, [])

  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      width: "10%"
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      width: '20%'
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (text, film, index) => {

        return (
          <div key={index}>
            <img src={film.hinhAnh} style={{ width: '100px', height: '100px' }} alt="phim"
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/100/100`;
                //return();
              }}
            />
          </div>
        );
      },
      width: "20%",
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      width: '40%'
    },
    {
      title: 'Thao tác',
      dataIndex: 'maPhim',
      render: (text, film, index) => {

        return (
          <div className='flex'>

            {/* cách dùng font awesome
          <div className='bg-black text-white'>
            <i className="fa fa-edit"></i>
          </div>
          <div className=''>
            <i className="fa fa-trash"></i>
          </div> */}

            {/* cách dùng ant desgin  */}
            <NavLink key={1} className='bg-slate-400 text-white mr-2 p-2 text-2xl' to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
            <span style={{ cursor: 'pointer' }}
              onClick={() => {
                if (window.confirm("Ban co chac muon xoa phim" + film.tenPhim)) {
                  // goi action
                  dispatch(xoaPhimAction(film.maPhim));
                }
                //return();
              }}

              key={2} className='bg-red-600 text-white p-2 text-2xl' ><DeleteOutlined /></span>
          </div>
        );
      },
    },
  ];


  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <div className='w-full'>
      <h3>Quản lý phim</h3>
      <Button><NavLink to="/admin/films/addnew">Thêm phim</NavLink></Button>
      <Search
        className='m-5'
        placeholder="Search TypeWork..."
        size="large"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
        allowClear
      />
      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
    </div>
  )
}

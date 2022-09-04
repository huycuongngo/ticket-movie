import React from 'react'
import styles from './Film_Flip.module.scss';
import { PlayCircleOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';

export default function Film_Flip(props) {
  const { film } = props;


  return (
    <div className={`${styles['flip-card']} my-5`}>
      <div className={`${styles["flip-card-inner"]}`}>
        <div className={`${styles["flip-card-front"]}`}>

          <img src={film.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
        </div>
        <div className={`${styles["flip-card-back"]}`} style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img src={film.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
          </div>
          <div className='flex items-center justify-center w-full h-full' style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)' }}>
            <div>
              <div className='rounded-full cursor-pointer' style={{ fontSize: '100px' }}><PlayCircleOutlined /></div>
              <div className="text-2xl mt-2 font-bold">{film.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={`/detail/${film.maPhim}`} className='bg-indigo-300 text-center cursor-pointer py-2 my-2 text-success-50 font-bold block hover:text-red-500'>
        XEM CHI TIẾT
      </NavLink>
    </div>
  )
}

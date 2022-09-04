import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import { useHistory } from 'react-router-dom';
import HomeCardMovie from './HomeCardMovie/HomeCardMovie';
import HomeCarousel from './HomeCarousel/HomeCarousel';
import HomeTabMovie from './HomeTabMovie/HomeTabMovie';
import { USER_LOGIN } from '../../utils/settings/config'

export default function Home(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  if (!localStorage.getItem(USER_LOGIN)) {
    history.push("/login");
  }
  const { arrayFilm } = useSelector(state => state.QuanLyPhimReducer)
  // console.log("🚀 ~ file: Home.js ~ line 12 ~ Home ~ arrayFilm", arrayFilm)
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  }, [])


  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
  // console.log("🚀 ~ file: Home.js ~ line 20 ~ Home ~ heThongRapChieu", heThongRapChieu);
  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction())
  }, [])


  return (
    <div className='container mx-auto'>
      <div>
        <HomeCarousel />
      </div>
      <div>
        <HomeCardMovie arrayFilm={arrayFilm} />
      </div>
      <div className='ml-5 mx-10'>
        <HomeTabMovie heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  )
}

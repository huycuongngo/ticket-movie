import React, { useEffect } from 'react'
import { Carousel } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCarouselAction } from '../../../redux/actions/CarouselAction';

import './HomeCarousel.module.css'

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const { arrBanners } = useSelector(state => state.CarouselReducer);
  console.log("arrBanners", arrBanners);
  
  useEffect(() => {
    // dispatch ngoài chạy trước từ UI lên middleware, dispatch trong 
    // chạy sau từ middleware lên reducer, dispatch trong do middleware cung cấp
    dispatch(getCarouselAction('hello'));

    // return()
  }, []);

  const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const renderBanner = () => {

    return arrBanners.map((item, index) => {

      return (
        <div className='test' key={index}>
          <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`, }}>
            <img src={item.hinhAnh} className='w-full opacity-0' alt="" />
          </div>
        </div>
      )
    })
  }


  // UI ant desgin
  return (
    <div>
      <Carousel effect="fade">
        {renderBanner()}
      </Carousel>
    </div>
  )
}

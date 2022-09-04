import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimActionType";
import Film_Flip from "../Film/Film_Flip";

import styleSlick from './MultipleRowSlick.module.scss'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick[`slick-next`]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick[`slick-prev`]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default function MultipleRows(props) {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
  
  let activeClassDangChieu = dangChieu ? 'active-film' : 'none-active-film';
  
  let activeClassSapChieu = sapChieu ? 'active-film' : 'none-active-film'

  const renderFilm = () => {

    return props.arrayFilm.slice(0, 12).map((film, index) => {

      return (
        <div key={index}>
          <Film_Flip film={film} />
        </div>
      );
    })
  }

  // UI react slick lib
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div>
      <div className='text-left'>
        <button
          onClick={() => {
            const action = { type: SET_PHIM_DANG_CHIEU };
            dispatch(action);
          }}
          type="button" className={`${styleSlick[activeClassDangChieu]} px-8 mr-2 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100`}>Phim Dang Chieu</button>
        
        <button
          onClick={() => {
            const action = { type: SET_PHIM_SAP_CHIEU };
            dispatch(action);
          }}
          type="button" className={`${styleSlick[activeClassSapChieu]} px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100`}>Phim Sap Chieu</button>
      </div>
      <Slider {...settings}>
        {renderFilm()}
      </Slider>
    </div>
  );
}



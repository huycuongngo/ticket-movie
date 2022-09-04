import React from 'react';
import FormRegister from './FormRegister/FormRegister';
import Lottie from "lottie-react";
import bgAnimate from "../../assets/bgRegister.json";

import "./Register.scss";

export default function Register() {

  return (
    <div className='register'>
      <div className='register__img'>
        <Lottie animationData={bgAnimate} loop={50} />
      </div>

      <div className='register__form'>
        <FormRegister />
      </div>
    </div>
  );
};


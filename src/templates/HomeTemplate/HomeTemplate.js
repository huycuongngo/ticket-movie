import React from 'react'
import { Route } from "react-router-dom";
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';


export default function HomeTemplate(props) {
  const { Component, ...restProps } = props;    //restProps la exact, path 

  return (
    <Route {...restProps} render={(propsRoute) => {       //propsRoute la history, match, location do <Route /> trả ra

      return (
        <>
          <Header {...propsRoute} />

          <Component {...propsRoute} />
          
          <Footer {...propsRoute} />
        </>
      );
    }} />
  )
}

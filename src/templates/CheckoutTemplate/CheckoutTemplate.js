import React from 'react'
import { useHistory } from 'react-router-dom';
import { Route } from "react-router-dom";
import { USER_LOGIN } from '../../utils/settings/config';
import Footer from '../HomeTemplate/Layout/Footer/Footer';
import Header from '../HomeTemplate/Layout/Header/Header';


export default function CheckoutTemplate(props) {
  const { Component, ...restProps } = props;    //restProps la exact, path
  // localStorage.setItem(USER_LOGIN, { name: 'cuong' });
  const history = useHistory();

  if (!localStorage.getItem(USER_LOGIN)) {
    history.push("/login");
  }

  return (
    <Route {...restProps} render={(propsRoute) => {       //propsRoute la history, match, location do <Route /> trả ra

      return (
        <div>
          <Component {...propsRoute} />
          <Footer />
        </div>
      );
    }} />
  )
}

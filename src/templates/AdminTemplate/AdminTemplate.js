import React from 'react'
import { useState } from 'react';
import { Input } from 'antd';
import './AdminTemplate.scss';
import { Pagination } from 'antd'

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu } from 'antd';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

export default function AdminTemplate(props) {
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Route {...restProps} render={(propsRoute) => {

      return (
        <Layout
          style={{
            minHeight: '100vh',
            margin: 0,
            textAlign: 'left'
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="bg-red-300 ">ngohuycuong</div>
            <ul className='bg-red-300 text-white'>
              <li>
                <NavLink to="/admin/films">Films</NavLink>
              </li>
              <li>
                <NavLink to="/admin/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/showtimes">Showtimes</NavLink>
              </li>
            </ul>
          </Sider>

          <Component {...propsRoute} />
        </Layout>
      );
    }}
    />
  );
}

import './App.css';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';

import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import { Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DetailFilm from './pages/DetailFilm/DetailFilm';
import Checkout from './pages/Checkout/Checkout';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import { Suspense, lazy } from 'react';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import Users from './pages/Admin/Users/Users';
import Showtimes from './pages/Admin/Showtimes/Showtimes';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import EditFilm from './pages/Admin/Films/EditFilm/EditFilm';
import UserTemplate from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';

const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Loading />
        <Switch>
          <HomeTemplate path="/" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <HomeTemplate path="/news" exact Component={News} />

          {/* trang xem chi tiet */}
          <HomeTemplate path="/detail/:id" exact Component={DetailFilm} />

          {/* trang dat ve xem phim */}
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
          
          {/* <Suspense fallback={<h1>Loading...</h1>}>
            <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
          </Suspense> */}

          <UserTemplate path="/login" exact Component={Login} />

          {/* Admin Template */}
          <AdminTemplate path="/admin/films" exact Component={Films} />
          <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={EditFilm} />
          <AdminTemplate path="/admin/users" exact Component={Users} />
          <AdminTemplate path="/admin/showtimes" exact Component={Showtimes} />

          

          <Route path="/register" exact render={(propsRoute) => {       //propsRoute la history, match, location do <Route /> trả ra

            return (
              <div><Register /></div>
            );
          }} />

         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

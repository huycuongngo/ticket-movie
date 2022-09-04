import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ACCESS_TOKEN, USER_LOGIN } from '../../../../utils/settings/config';
import { removeLocalStorage } from '../../../../utils/settings/localStorage';

export default function Header(props) {
  const history = useHistory();
  const { userLogin } = useSelector(state => state.QuanLyUserReducer);
  const renderLogin = () => {
    if (!userLogin) {
      return (
        <>
          <button className="self-center px-8 py-3 rounded" onClick={() => {
            history.push("/login");
          }}>Login</button>
          <button className="border-2 self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Signup</button>
        </>
      )
    }
    return (
      <>
        <button className="self-center px-8 py-3 rounded">{userLogin.hoTen}</button>
        <button onClick={() => {
          history.push("/login")
          removeLocalStorage(USER_LOGIN, ACCESS_TOKEN);
        }} className="border-2 self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Logout</button>
      </>
    );
  }
  // sử dụng UI manbaUI
  return (
    <div>
      <header className="p-4 dark:bg-gray-800 dark:text-gray-100 bg-black bg-opacity-40 text-white w-full">
        <div className="container flex justify-between h-16 mx-auto">
          <a onClick={() => {
            history.push("/")
          }} rel="noopener noreferrer" aria-label="Back to homepage" className="flex items-center p-2">
            <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
          </a>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <NavLink to="/" activeClassName='border-b-2' rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 dark:border-transparent text-white">Home</NavLink>
            </li>
            <li className="flex">
              <NavLink to="/contact" activeClassName='border-b-2' rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 dark:border-transparent text-white">Contact</NavLink>
            </li>
            <li className="flex">
              <NavLink to="/news" activeClassName='border-b-2' rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 dark:border-transparent text-white">News</NavLink>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {renderLogin()}
          </div>
        </div>
      </header>
    </div>
  )
}

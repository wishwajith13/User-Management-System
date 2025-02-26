import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Users';
import LoginPage from "./LoginPage/LoginPage"
import ProtectPage from "./ProtectPage/ProtectPage"
import RedirectPage from "./RedirectPage/RedirectPage"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='private' element={<ProtectPage/>}/>
      <Route path='oauth2/idpresponse' element={<RedirectPage/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


import Signin from './pages/signup/Signin';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Layout from "./components/layout/Layout";
import Ticketsubmit from './pages/Submitform/Ticketsubmit';
import Dashboard from './pages/dashboard/Dashboard';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
return <>
<BrowserRouter>
<Routes>
<Route path='/' element={<Layout/>}>
<Route path='login' element={<Login/>}/>
<Route path='signup' element={<Signin/>}/>
<Route path='home' element={<Home/>}/>
<Route path='Submitform' element={<Ticketsubmit/>}/>
<Route path='dashboard' element={<Dashboard/>}/>          
<Route path='dashboard/Profile' element={<Profile/>}/>
</Route>
</Routes>
</BrowserRouter>
</>
}

export default App

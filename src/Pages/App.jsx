import Home from './Home.jsx'
import {useState} from 'react'
import Adminpanel from './Adminpanel.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../Header/Navbar.jsx'
import Blog from './Blog.jsx'
import Service from './Service.jsx'
import Delivery from './Delivery.jsx'
import Payment from './Payment.jsx'
import Product from './Product.jsx'
import Cart from './Cart.jsx'
import Footer from '../Footer/Footer.jsx'
import Top from '../Top/Top.jsx'
import Login from '../LOG/Login.jsx'
import LogOut from '../LOG/LoginOut.jsx'

function App(){
 const [showData, setShowData] = useState(null);
 const [Add, setAdd]=useState([])

  return(
    <BrowserRouter>
    <Top/>
    <Navbar Add={Add}/>
    <Routes>
      <Route  path='/' element={<Home showData={showData}/>}/>
      <Route  path='/service' element={<Service/>}/>
      <Route  path='/Admin' element={<Adminpanel  setShowData={setShowData}/>}/>
      <Route  path='/Blog' element={<Blog  setAdd={setAdd}/>}/>
      <Route  path='/Delivery' element={<Delivery/>}/>
       <Route  path='/Payment' element={<Payment Add={Add}/>}/>
       <Route  path='/Product' element={<Product  setAdd={setAdd}/>}/>
        <Route  path='/Cart' element={<Cart Add={Add} setAdd={setAdd}/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/logout' element={<LogOut/>}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}
export default App
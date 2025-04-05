import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth.js"
import {login,logout} from './store/authSlice.js'
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { Outlet } from 'react-router-dom'

function App() {
  /* Jab v application sai data fecth karenge to network request mai thoda time lag skta hai
   Loading state use karke Conditional rendering kar skte hai */

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData})) /* dsipatch karenge tabhi action.playload mai milega data  */
      }else{
        dispatch(logout())
      }
    })
    /* .catch((error) => {
      console.error(error)
      dispatch(logout())
    }) */
    .finally(() => {
      setLoading(false)
    })
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : <div className='bg-black text-white'>Loading.....</div>;
}

export default App

import React, { useEffect,useState } from 'react'
export const backendURL=import.meta.env.BACKEND_VITE_URL;
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Navigate, Route,Routes } from 'react-router-dom'
import Add from "./pages/Add.jsx"
import Orders from "./pages/Orders"
import List from "./pages/List"
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const App = () => {
  const [token, setToken] = useState(false);
  const [loading,setloading]=useState(true);
  
  useEffect(() => {
    // Check if the token is valid
    axios.get("http://localhost:4000/api/product/verify-token", { withCredentials: true })
        .then(response => {
            if (response.data.success ) {
                setToken(true);
            } else {
                setToken(false);
            }
        })
        .catch(() => setToken(false))
        .finally(()=>setloading(false)); 
}, []);
if (loading) {
  return <p>Loading...</p>; // Show a loader instead of flashing Login page
}
  return (
  
    <div>
             <ToastContainer/>

      {
        token===false?<Login setToken={setToken}/> :<>
        <Navbar setToken={setToken} />
        <div className='flex gap-10 pr-10'>
        <div className="">
          <Sidebar/ >
        </div>
        <div className='w-full mx-auto my-8 text-gray-600'>
      

        
          <Routes>
            <Route path='/add' element={<Add/>} ></Route>
            <Route path='/list' element={<List token={token}/>}></Route>
            <Route path='/orders' element={<Orders token={token}/>}></Route>
    
    
            
          </Routes>
        
        </div>
        </div>
        
        </>
        
      }
    
    </div>
   
  )
}

export default App

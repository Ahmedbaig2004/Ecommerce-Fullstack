import React, { useState } from 'react'
import  backendURL  from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
   

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:4000/api/user/admin", 
              { email, password },
              { withCredentials: true } // Ensures cookies are included
          );

          // Now verify the token
          const verifyResponse = await axios.get("http://localhost:4000/api/product/verify-token", 
              { withCredentials: true }
          );

          if (verifyResponse.data.success) {
              setToken(true); // Set authentication state
          } else {
              toast.error("Token verification failed");
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Login failed");
      }
  };
  return (
    
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Email</label>
                <input onChange={(e)=>setemail(e.target.value)} value={email}
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Password</label>
                <input onChange={(e)=>setpassword(e.target.value)} value={password}
                  type="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
     
  )
}

export default Login

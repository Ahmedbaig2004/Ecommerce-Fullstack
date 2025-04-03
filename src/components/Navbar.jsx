
import React from "react";
import { assets } from "../assets/assets";
import axios from "axios";
const Navbar = ({setToken}) => {
  const logout = async () => {
    try {
        await axios.post("http://localhost:4000/api/user/logout", {}, { withCredentials: true });
        setToken(false);  // Clear token from frontend state
    } catch (error) {
        console.log("Logout failed", error);
        
    }
};
    return (
      <div className="flex items-center py-2 px-[4%] justify-between">
        <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
        <button onClick={logout} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full">
          Logout
        </button>
      </div>
    );
  };
  
  export default Navbar;
  
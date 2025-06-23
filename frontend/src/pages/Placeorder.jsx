import React, { useContext, useState } from "react";
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal";
import assets from "../assets/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";
const Placeorder = () => {
  const [method,setmethod]=useState("cod");
  const {navigate} = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t-2">
      {/* {left side} */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="w-full border border-gray-300 rounded-lg py-1.5 px-2 "
            type="text"
            placeholder="First Name"
          />
          <input
            className="w-full border border-gray-300 rounded-lg py-1.5 px-2 "
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="w-full border b borderorder-gray-300 rounded-lg py-1.5 px-2 "
          type="email"
          placeholder="Email"
        />
        <input
          className="w-full border border-gray-300 rounded-lg py-1.5 px-2 "
          type="text"
          placeholder="Address"
        />
        <div className="flex gap-3">
          <input
            className="w-full border border-gray-300 rounded-lg py-1.5 px-2 "
            type="text"
            placeholder="City"
          />
          <input
            className="w-full border border-gray-300 rounded-lg py-1.5 px-2"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="w-full border border-gray-300 rounded-lg py-1.5 px-2 "
            type="number"
            placeholder="ZIP CODE"
          />
          <input
            className="w-full border border-gray-300 rounded-lg py-1.5 px-2 "
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="w-full border border-gray-300 rounded-lg py-1.5 px-2"
          type="text"
          placeholder="Phone"
        />
      </div>
      {/* {right side} */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal className="mb-5" />
        </div>
        <div className="mt-5">
          <Title className="" text1={"Payment"} text2={"Method"} />
          <div className="flex gap-3 flex-col lg:flex-row my-5">
            <div onClick={()=>setmethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==="stripe" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setmethod("razor")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==="razor" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div  onClick={()=>setmethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==="cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>

                
            </div>
          </div>
        </div> 
        <div className="w-full text-end">
        <button onClick={()=>navigate("./orders")}className="bg-black text-white border px-10 py-3 border-gray-400 rounded">PLACE ORDER</button>
        </div>
        
      </div>
    </div>
  );
};

export default Placeorder;

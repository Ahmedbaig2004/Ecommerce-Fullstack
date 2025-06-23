import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = () => {
  const [list, setList] = useState([]);
  const getlistitems = async () => {
    const response = await axios.get("http://localhost:4000/api/product/list", {
      withCredentials: true,
    });
    if (response.data.success) {
      setList(response.data.products);
    } else {
      toast.error(response.data.message);
    }
  };
  const removeproduct = async (id)=> {
    try {
      const response = await axios.post("http://localhost:4000/api/product/remove", {id}, {
        withCredentials: true,
      });
      if(response.data.success)
      {
        toast.success("Product removed successfully")
        getlistitems();
      }
      else{
        toast.error(response.data.message)
      }
    }
  
   
     catch (error) {
      toast.error(error)
      console.log(error);
      
    }
  }
    useEffect(() => {
      getlistitems();
    }, []);
    
  return (
    <>
      <p>All products List</p>
      <div className="flex flex-col gap-2">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-200 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">ACTION</b>
        </div>
        <div>
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border-b"
            >
              <img
                className="w-12 h-12 object-cover"
                src={item.image[0] || assets.placeholder}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeproduct(item._id)}className="text-center cursor-pointer text-lg">X</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default List

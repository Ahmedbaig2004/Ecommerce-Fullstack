import React, { useEffect,useState } from 'react'
import {assets} from "../assets/assets.js"
import axios from 'axios';
import {toast} from 'react-toastify'
const Add = () => {

  const [image1,setimage1]=useState(false);
  const [image2,setimage2]=useState(false);
  const [image3,setimage3]=useState(false);
  const [image4,setimage4]=useState(false);
  const [name,setname]=useState("");
  const [description,setdescription]=useState("");
  const [price,setprice]=useState("");
  const [category,setcategory]=useState("Men");
  const [subCategory,setsubcategroy]=useState("Topwear");
  const [bestseller,setbestseller]=useState(false);
  const [sizes,setsizes]=useState([])



  const onSubmitHandler = async (e)=>{
    e.preventDefault()

    try {
        
const formData = new FormData()
formData.append("name", name)
formData.append("description", description) 
formData.append("price", price)
formData.append("category", category) 
formData.append("subCategory", subCategory) 
formData.append("bestseller", bestseller) 
formData.append("sizes", JSON.stringify(sizes))
image1 && formData.append("image1", image1)
 image2 && formData.append("image2", image2)
  image3 && formData.append("image3", image3)
image4 && formData.append("image4", image4)

const response = await axios.post("http://localhost:4000/api/product/add",formData,{ withCredentials: true })
console.log(response);
if(response.data.success)
{
  toast.success("Product added successfully")
  setimage1(false);
  setimage2(false);
  setimage3(false);
  setimage4(false);
  setname("");
  setdescription("");
  setprice("");
}



    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  
  return (
    <>
      <form  onSubmit={onSubmitHandler} className="flex flex-col gap-3 items-start"action="">
        <div>
          <p>Upload image</p>
          <div className='flex flex-row gap-2 mt-3'>
            <label htmlFor="image1">
              <img className="w-20"        src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
              <input onChange={(e)=>setimage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className="w-20"        src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
              <input onChange={(e)=>setimage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className="w-20"        src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
              <input onChange={(e)=>setimage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className="w-20"        src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
              <input onChange={(e)=>setimage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
        </div>
        <div className='w-full'>
        <p>Product Name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name}className='w-full max-w-[500px] border border-gray-300' type="text" placeholder='Enter Here' required />
        </div>
        <div className='w-full'>
        <p>Product Description</p>
        <textarea onChange={(e)=>setdescription(e.target.value)} value={description} className='w-full max-w-[500px] border border-gray-300' type="text" placeholder='Enter Here' required />
        </div>
        <div className='flex flex-col sm:flex-row gap-7'>
        <div>
          <div>
            <p>Product Category</p>
            <select onChange={(e)=>setcategory(e.target.value)} value={category} className='w-full'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <p>Product Sub-Category</p>
            <select onChange={(e)=>setsubcategroy(e.target.value)} value={subCategory} className='w-full'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>
        <div>
          <p>Product Price</p>
          <input onChange={(e)=>setprice(e.target.value)} value={price} className=' border border-gray-800 text-gray-950' type="Number" placeholder='25' />
        </div>
        </div>
        <div>
          <p>Product Sizes</p>
          <div className='flex gap-3'>
            <div onClick={()=>setsizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"): [...prev,"S"])}>
              <p  className= {` ${sizes.includes("S")?"bg-pink-200" : "bg-slate-200"} cursor-pointer px-4 py-2 `}>S</p>

            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"): [...prev,"M"])}>
              <p className={` ${sizes.includes("M")?"bg-pink-200" : "bg-slate-200"} cursor-pointer px-4 py-2 `}>M</p>

            </div> 
            <div onClick={()=>setsizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"): [...prev,"L"])}>
              <p className={` ${sizes.includes("L")?"bg-pink-200" : "bg-slate-200"} cursor-pointer px-4 py-2 `}>L</p>

            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"): [...prev,"XL"])}>
              <p className={` ${sizes.includes("XL")?"bg-pink-200" : "bg-slate-200"} cursor-pointer px-4 py-2 `}>XL</p>

            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"): [...prev,"XXL"])}> 
              <p className={` ${sizes.includes("XXL")?"bg-pink-200" : "bg-slate-200"} cursor-pointer px-4 py-2 `}>XXL</p>

            </div>
          </div>
        </div>
        <div className='flex gap-2 mt-2'>
          <input onChange={(e)=>setbestseller(prev=>!prev) } checked={bestseller} type="checkbox" id="bestseller" />
          <label htmlFor="bestseller">best seller</label>
        </div>
        <button  type="submit" className='border border-gray-400 px-29 py-3 mx-40' >ADD</button>
       
      </form>
    </>
  )
}

export default Add
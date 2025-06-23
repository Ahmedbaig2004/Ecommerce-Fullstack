import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders = () => {
  const {products,currency}=useContext(ShopContext);
  return (
   
    <div className='mt-10'>
      <div className='text-2xl'>
      <Title text1={"MY"} text2={"ORDERS"}/>
      </div>
    
    {products.slice(1,5).map((item, index) => (
      <div className="flex flex-col md:flex-row border-t-2 py-10 border-b-2 items-start w-full" key={index}>
        
        {/* Left Section: Image & Details */}
        <div className='flex items-center gap-5 w-full md:w-1/2'>
          <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
          <div className='flex flex-col gap-4'>
            <p className='sm:text-base font-medium'>{item.name}</p>
            <div className='flex flex-row gap-3 mt-2 text-base text-gray-600'>
              <p>{currency}{item.price}</p>
              <p>Quantity: 1</p>
              <p>Size: Medium</p>
            </div>
            <p className='mt-2'>DATE: <span className='text-gray-400'>25th Dec, 2024</span></p>
          </div>
        </div>
  
        {/* Right Section: Shipping & Button */}
        <div className='flex flex-row justify-between items-center w-full md:w-1/2 mt-4 md:mt-0'>
          <div className='flex items-center gap-2'>
            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
            <p className='text-sm md:text-base'>Ready to ship</p>
          </div>
          <button className='border px-4 py-2 text-sm rounded-sm'>Track Order</button>
        </div>
  
      </div>
    ))}
  </div>
  )
}

  

export default Orders

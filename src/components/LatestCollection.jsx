import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';



const LatestCollection = () => {
    const {products}= useContext(ShopContext);
    const [latestProducts,SetLatestProducts]=useState([]);

    useEffect(()=>{
        SetLatestProducts(products.slice(0,10));
    },[])
        
  return (
    <div>
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTION'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Welcome to our latest collections !!!!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, a officiis. Consequatur velit praesentium ipsam consectetur odio alias provident veritatis?</p>
            </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))}
        </div>
        
      
    </div>
  )
}

export default LatestCollection

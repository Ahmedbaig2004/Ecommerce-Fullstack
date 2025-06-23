import React, {useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import assets from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products,search,showsearch} = useContext(ShopContext);
  const [showfilter,setshowfilter]=useState(false);
  const[filterProduct,Setfilterproduct]=useState([]);
  const [category,setCategory]=useState([]);
  const [subcategory,setsubcategory]=useState([]);
  const[sortType,setsorttype]=useState('relevant');
  const toggleCategory =(e)=>{
    if(category.includes(e.target.value))
    {
      setCategory(category.filter(item=>item!==e.target.value))
    }
    else{
      setCategory([...category,e.target.value])
    }
  }
  const togglesubcategory =(e)=>
  {
    if(subcategory.includes(e.target.value)){
      setsubcategory(subcategory.filter((item)=>(item!==e.target.value)))
    }
  else{
    setsubcategory([...subcategory,e.target.value]);
  }
  }

    
    const applyfilter=()=>{
      let productcopy = products.slice()
      if(search && showsearch)
      {
        productcopy=productcopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()));
      }
      if(category.length>0)
      {
        productcopy=productcopy.filter((item)=>category.includes(item.category))
      }
      if(subcategory.length>0)
        {
          productcopy=productcopy.filter((item)=>subcategory.includes(item.subCategory))
        }
      Setfilterproduct(productcopy)
    }
    useEffect(()=>{
      
        applyfilter()
    },[showsearch,search,category,subcategory])

    const sortProduct=()=>{
      let fpCopy=filterProduct.slice()
      switch(sortType){
      case 'low-high':
        Setfilterproduct(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      
      case 'high-low':
        Setfilterproduct(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyfilter()
        break;
      }
    }
  useEffect(()=>{
    sortProduct()

  },[sortType])

   

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t-1 pt-10 '>
      <div className='min-w-60'>
        <p  onClick={()=>setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img   className={`h-3 sm:hidden ${showfilter ? 'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 my-4 ${showfilter ? '' :'hidden'} sm:block `} >
        <p className='mb-3 text-sm font-medium'> CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light'>
          <p className='flex gap-2'>
            <input className='w-3 'type="checkbox" value="Men" onChange={toggleCategory} />Men
          </p>
          <p className='flex gap-2'>
            <input className='w-3 'type="checkbox" value="Women"  onChange={toggleCategory}/>Women
          </p>
          <p className='flex gap-2'>
            <input className='w-3 'type="checkbox" value="Kids" onChange={toggleCategory} />Kids
          </p>
        </div>
        
        

      </div>
      {/* {SUBCOLLECTION} */}
      <div className={`border border-gray-300 pl-5 py-3 my-4 ${showfilter ? '' :'hidden'} sm:block`} >
        <p className='mb-3 text-sm font-medium'> SUBCATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light'>
          <p className='flex gap-2'>
            <input className='w-3 'type="checkbox" value="Topwear" onChange={togglesubcategory} />Topwear
          </p>
          <p className='flex gap-2'>
            <input className='w-3 'type="checkbox" value="Bottomwear" onChange={togglesubcategory} />Bottomwear
          </p>
          <p className='flex gap-2'>
            <input className='w-3 'type="checkbox" value="Winterwear" onChange={togglesubcategory} />Winterwear
          </p>
        </div>
        
        

      </div>
        
      </div>
            {/* {right side} */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1="ALL" text2="COLLECTIONS"/>
            {/* {productsort} */}
            <select onChange={(e)=>setsorttype(e.target.value)}className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low-high</option>
              <option value="high-low">Sort By: High-low</option>
            </select>
        </div>
        {/* {map products} */}
        <div className='grid grid-cols-2 md:grid:cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
          filterProduct.map((item,index)=>(<ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />))
}
        </div>

      </div>
      
      
      
    </div>
  )
}

export default Collection

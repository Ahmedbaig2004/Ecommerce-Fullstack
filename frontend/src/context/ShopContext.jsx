import { createContext, useEffect, useState } from "react";
import {products} from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider =(props)=>{
    const currency ='$'
    const deliveryfee=10
    const[search,setsearch]=useState('');
    const[showsearch,setshowsearch]=useState(false);
    const[cartItems,setCartItems]=useState({});
    const navigate= useNavigate();
    const addtocart = async (itemId,size)=>{
        let cartData = structuredClone(cartItems);
        if(!size)
        {
            toast.error("Select Product Size");
            return
        }
        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size] +=1;
            }
            else{
                cartData[itemId][size]=1;
            }
            setCartItems(cartData);

        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
            setCartItems(cartData);

        }


    }
    useEffect(()=>{
        console.log(cartItems);
        
    }
,[cartItems])

const updatequantity = (item,size,quantity)=>{

    const cartdata=structuredClone(cartItems);
    cartdata[item][size]=quantity;
    setCartItems(cartdata);

}

const getcartsize=()=>{
    let TotalCount = 0;
    for(const items in cartItems)
    {
        for( const item in cartItems[items])
        {
            
                if(cartItems[items][item]>0)
                {
                    TotalCount += cartItems[items][item];
                }
                
            
        }
    }
    return TotalCount;
}

const getcarttotal= ()=>
{let total_price=0
    for(const items in cartItems)
    {   
        let cartdata=products.find((product)=>product._id===items)
        for(const item in cartItems[items])
        {
            if(cartItems[items][item]>0)
            {
                total_price=cartdata.price*cartItems[items][item];
            }
        }
    }
    return total_price
}
    const value={
            currency,deliveryfee,products,search,setsearch,showsearch,setshowsearch,cartItems,addtocart,getcartsize,updatequantity,getcarttotal,navigate
        
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider
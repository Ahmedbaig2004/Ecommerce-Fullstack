const product = require('../models/productData.model');

const cloudinary = require('cloudinary').v2


const addProduct=async(req,res)=>{
    console.log(req.body)
    console.log(req.files);
    try {
        
      
        const {name,description,price,image,category,subCategory,bestseller,sizes}=req.body;
        const image1=req.files.image1&&req.files.image1[0]
        const image2=req.files.image2&&req.files.image2[0]
        const image3=req.files.image3&&req.files.image3[0]
        const image4=req.files.image4&&req.files.image4[0]
        const images = [image1,image2,image3,image4].filter((item)=>item!==undefined);
        let imageURL= await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )
        
     
        const productdata = new product({
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            bestseller,
            sizes:JSON.parse(sizes),
            image:imageURL,
            date:Date.now()
        })
        console.log(productdata);
        await productdata.save();
        res.json({success:true,message:"product added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"product not added"})
    }
}
const listProduct=async(req,res)=>{
    try {
        const products=await product.find({})
        res.json({success:true,products})
        
    } catch (error) {
        res.json({success:false,message:"isSUES"});
        console.log(error);
    }

}
const showsingleProduct=async(req,res)=>{
    try {
         const singleproduct= await product.findById(req.body.id);
         res.json({singleproduct})


        
    } catch (error) {
        res.status(400).json({message:"dk"});
    }
}
const removeProduct=async(req,res)=>{
    try {
        const {id} = req.body
        await product.findByIdAndDelete(id);
        res.json({success:true});
    } catch (error) {
        res.json({success:false,message:"Product didnot remove"});
    }
}

module.exports= {addProduct,listProduct,showsingleProduct,removeProduct}


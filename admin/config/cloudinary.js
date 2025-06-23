const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv'); dotenv.config();



const configurecloudinary = async ()=>{
    
    await cloudinary.config({
        cloud_name:'dgvlpwupu',
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:'Xo3fzhzxq6M1K58jQ5TjAc1vt_E'
    

}

    )
}


module.exports={configurecloudinary}
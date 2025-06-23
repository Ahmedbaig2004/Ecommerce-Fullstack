//Assignment
const express =require("express");
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')


const port = process.env.PORT
const {connectMongo} = require("./connection.js");
const {configurecloudinary} = require("./config/cloudinary.js");
const product=require("./models/productData.model.js");
const userrouter =require("./routers/user.router.js");
const productrouter=require("./routers/product.router.js");
const cartrouter=require("./routers/cart.router.js")

//middlewares
const app = express();

app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true
}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/user",userrouter);
app.use("/api/product",productrouter);
app.use("/api/cart",cartrouter);


//db and cloudinary etc
connectMongo();
configurecloudinary();


//app
app.listen(port,()=>console.log(`App is running at PORT: ${port}`));
/////




const router = express.Router();



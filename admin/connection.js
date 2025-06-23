
const mongoose = require("mongoose");

const connectMongo = async () =>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected!'));
}

module.exports={connectMongo};
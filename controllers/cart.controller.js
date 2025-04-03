const User = require("../models/user.model");

const getusercart = async (req, res) => {  // Added req, res parameters
    try {
        const { userId } = req.body;
        const userdata = await User.findById(userId);  // Corrected method name
        let cartData = userdata.cartData;   
        res.json({ success: true, cartData });  // Return cartData in response

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const addtocart = async (req, res) => {  // Added req, res parameters
    try {
        const { userId, itemId, size } = req.body;

        const userdata = await User.findById(userId);  // Corrected method name
        let cartData = userdata.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        await User.findByIdAndUpdate(userId, { cartData });  // Corrected method name
        res.json({ success: true, message: "Successfully added to cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updatecart = async (req, res) => {  // Added req, res parameters
    try {
        const { userId, item, size, quantity } = req.body;
        const userdata = await User.findById(userId);  // Corrected method name
        let cartData = userdata.cartData;
        
        // Update the cart data with the new quantity
        cartData[item][size] = quantity;
        
        await User.findByIdAndUpdate(userId, { cartData });  // Corrected method name
        res.json({ success: true, message: "Successfully updated the cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { getusercart, addtocart, updatecart };
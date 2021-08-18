const Product = require("../models/Product");

exports.homeGetController = async (req, res, next) => { 

    try {
        console.log("home controller calling");
        let products = await Product.find();
        console.log("products: ", products);

        return res.status(200).json({
            
            message: "Successfully get all data",
            data: products
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({

            message: "Server error occured"
        });
    }
};
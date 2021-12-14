const Product = require("../models/Product");

exports.homeGetController = async (req, res, next) => { 

    try {
        console.log("home controller calling");
        let products = await Product.find()
            /* .select({"status": 0, "createdAt": 0, "updatedAt": 0, "__v": 0}) */;
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
const Product = require("../models/Product");

exports.getProductById = async (req, res, next) => {

    let productId = req.params.productId;
    // console.log("productId: ", productId, "length: ", productId.length);

    try {

        let product = await Product.findOne({
            status: true,
            _id: productId
        }).select({"status": 0, "createdAt": 0, "updatedAt": 0, "__v": 0});

        let message = "Product found.";

        // console.log("producvt: ", product);
        if(!product){

            message = "Product not found."
        }

        return res.status(200).json({
            
            message,
            data: product
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({

            message: "Server error occured"
        });
    }
};

exports.productPostController = async (req, res, next) => { 

    console.log("req.body: ", req.body);
    let {
        name,
        price,
        isStock,
        status,
        brand,
        expiryDate
    } = req.body;

    try {
        
        let product = new Product({
            name,
            price,
            isStock,
            status,
            brand,
            expiryDate  
        });

        let createdProduct = await product.save();

        return res.status(200).json({
            
            message: "Save success",
            data: createdProduct
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({

            message: "Server error occured"
        });
    }
};

exports.productEditController = async (req, res, next) => { 

    let productId = req.params.productId;

    let {
        name,
        price,
        isStock,
        status,
        brand,
        expiryDate
    } = req.body;

    try {
        
        let product = await Product.findOne({
            status: null,
            _id: productId
        });

        if(!product){

            return res.status(404).json({
            
                message: "Product not found."
            });
        }

        let editedProduct = await Product.findOneAndUpdate(
            {
                status: true,
                _id: productId
            },
            {
                $set: {
                    name,
                    price,
                    isStock,
                    status,
                    brand,
                    expiryDate
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            message: "Product edit success.",
            data: editedProduct
        });
        

    } catch (e) {
        console.log(e);
        return res.status(500).json({

            message: "Server error occured"
        });
    }
};

exports.deleteProductController = async (req, res, next) => {

    let productId = req.params.productId;

    try {

        let deletedProduct = await Product.findOneAndDelete( {
            status: true,
            _id: productId
        } );

        let message = "Product deleted.";

        // console.log("producvt: ", product);
        if(!deletedProduct){

            message = "Can't delete product."
        }

        return res.status(200).json({
            
            message,
            data: deletedProduct
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({

            message: "Server error occured"
        });
    }
};

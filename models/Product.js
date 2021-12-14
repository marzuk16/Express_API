// name, price, isStock, status, brand, expiryDate

const { Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    isStock: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    brand: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    expiryDate: Date
}, {
    timestamps: true
});

const Product = model('Product', productSchema);
module.exports = Product;
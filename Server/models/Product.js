const { Schema, model } = require('mongoose')

const productSchema = Schema({

    brand: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },


    price: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = model('Product', productSchema);

module.exports = Product;

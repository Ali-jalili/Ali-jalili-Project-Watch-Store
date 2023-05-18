const { Schema, model } = require('mongoose')

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const cartProducts = model('Product', productSchema);

module.exports = cartProducts;
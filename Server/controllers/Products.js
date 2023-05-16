const productModel = require('../models/Product')


module.exports.getAllproducts = async (req, res) => {

    try {
        const detaProduct = await productModel.find()

        res.status(200).send(detaProduct)
    }
    catch (err) {
        res.status(500).send({ error: err.massage })
    }

}


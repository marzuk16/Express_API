const router = require('express').Router();

const {
    getProductById,
    productPostController,
    productEditController,
    deleteProductController
} = require('../controllers/productController');

router.get('/:productId', getProductById);
router.post('/edit/:productId', productEditController);

router.post('/save', productPostController);

router.delete('/delete/:productId', deleteProductController);


module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/product.controller');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.get('/', productController.getDashboard);
router.get('/add', productController.getAddForm);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/edit/:id', productController.getEditForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);
router.get('/delete/:id', productController.deleteProduct);

module.exports = router;
import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import authentication from '../middleware/authentication.js';
import { checkPermissions } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', authentication, checkPermissions('create', 'product'), createProduct);

router.delete('/:id', authentication, checkPermissions('delete', 'product'), deleteProduct);

router.put('/:id', authentication, checkPermissions('update', 'product'), updateProduct);

export default router;
import express from 'express';
import { createProduct, read, update, remove } from '../controllers/products.controller.js';
const router = express.Router();

router.get('/', read)
router.post('/', createProduct)
router.put('/', update)
router.delete('/', remove)

export default router;
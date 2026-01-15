import express from 'express';
import { createProduct, read, update, remove } from '../controllers/products.controller.js';
import { validateUuidUrlParam } from '../middlewares/parseUuids.middleware.js';
const router = express.Router();

router.get('/', read)
router.post('/', createProduct)
router.patch('/:id', validateUuidUrlParam, update)
router.delete('/:id', validateUuidUrlParam, remove)

export default router;
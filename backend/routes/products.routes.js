import express from 'express';
import { createProduct, read, update, remove } from '../controllers/products.controller.js';
import { validateUuidUrlParam } from '../middlewares/parseUuids.middleware.js';
import validateQueryGetAll from "../middlewares/getAll.middleware.js";
const router = express.Router();

router.get('/', validateQueryGetAll, read)
router.post('/', createProduct)
router.patch('/:id', validateUuidUrlParam, update)
router.delete('/:id', validateUuidUrlParam, remove)

export default router;
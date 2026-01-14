import express from 'express';
import { createNewStore, read, update, remove } from '../controllers/stores.controller.js';
import { validateStoresInput } from '../middlewares/stores.middleware.js';
const router = express.Router();

router.get('/', read)
router.post('/', validateStoresInput, createNewStore)
router.put('/', update)
router.delete('/', remove)

export default router;
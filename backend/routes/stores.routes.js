import express from 'express';
import { createNewStore, read, update, remove } from '../controllers/stores.controller.js';
const router = express.Router();

router.get('/', read)
router.post('/', createNewStore)
router.put('/', update)
router.delete('/', remove)

export default router;
import express from 'express';
import { create, read, update, remove } from '../controllers/sales.controller.js';
const router = express.Router();

router.get('/', read)
router.post('/', create)
router.put('/', update)
router.delete('/', remove)

export default router;
import express from 'express';
import { read } from '../controllers/guide.controller.js';
const router = express.Router();

router.get('/', read)
// router.post('/', create)
// router.put('/', update)
// router.delete('/', remove)

export default router;
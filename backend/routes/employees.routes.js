import express from 'express';
import { create, read, update, remove } from '../controllers/employees.controller.js';
import { validateEmployeesInput } from '../middlewares/employees.middleware.js';
const router = express.Router();

router.get('/', read)
router.post('/', validateEmployeesInput, create)
router.put('/', update)
router.delete('/', remove)

export default router;
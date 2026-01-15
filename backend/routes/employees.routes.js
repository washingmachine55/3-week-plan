import express from 'express';
import { create, read, update, remove } from '../controllers/employees.controller.js';
import { validateEmployeesInput } from '../middlewares/employees.middleware.js';
import { validateUuidUrlParam } from '../middlewares/parseUuids.middleware.js';
const router = express.Router();

router.get('/', read)
router.post('/', validateEmployeesInput, create)
router.patch('/:id', validateUuidUrlParam, update)
router.delete('/:id', validateUuidUrlParam, remove)

export default router;
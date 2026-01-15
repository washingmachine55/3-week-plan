import express from 'express';
import { create, read, update, remove } from '../controllers/inventories.controller.js';
import { validateInventoriesInput } from '../middlewares/inventories.middleware.js';
import { validateUuidUrlParam } from '../middlewares/parseUuids.middleware.js';
const router = express.Router();

router.get('/', read)
router.post('/', validateInventoriesInput, create)
router.patch('/:id', validateUuidUrlParam, update)
router.delete('/:id', validateUuidUrlParam, remove)

export default router;
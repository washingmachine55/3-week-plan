import express from 'express';
import { createNewStore, read, update, remove } from '../controllers/stores.controller.js';
import { validateStoresInput } from '../middlewares/stores.middleware.js';
import { validateUuidUrlParam } from '../middlewares/parseUuids.middleware.js';
import validateQueryGetAll from '../middlewares/getAll.middleware.js';
const router = express.Router();

router.get('/', validateQueryGetAll, read)
router.post('/', validateStoresInput, createNewStore)
router.patch('/:id', validateUuidUrlParam, update)
router.delete('/:id', validateUuidUrlParam, remove)

export default router;
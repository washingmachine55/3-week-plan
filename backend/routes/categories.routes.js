import express from 'express';
import { read, update, remove, createCategoryRelation, createCategory } from '../controllers/categories.controller.js';
import { validateUuidUrlParam } from '../middlewares/parseUuids.middleware.js';
import validateQueryGetAll from '../middlewares/getAll.middleware.js';
const router = express.Router();

router.get('/', validateQueryGetAll, read)
router.post('/', createCategory)
router.post('/set/relations', createCategoryRelation)
router.patch('/:id', validateUuidUrlParam, update)
router.delete('/', remove)

export default router;
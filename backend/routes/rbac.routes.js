import express from 'express';
import { createNewRole, read, update, remove, createNewPermissions } from '../controllers/rbac.controller.js';
const router = express.Router();

router.get('/', read)
router.post('/role', createNewRole)
router.post('/permissions', createNewPermissions)
router.put('/', update)
router.delete('/', remove)

export default router;
import express from 'express';
import { getAllAdmins, deleteAdmin } from '../controllers/admin.controller';
import { authorize } from '../middlewares/authorize';

const router = express.Router();

router.get('/all', authorize(['admin']), getAllAdmins);
router.delete('/:id', authorize(['admin']), deleteAdmin);

export default router;

import express from 'express';

import carreras from './carreras';
import roles from './roles';
import usuarios from './usuarios';
import materias from './materias';

const router = express.Router();

router.use('/carreras', carreras);
router.use('/roles', roles);
router.use('/usuarios', usuarios);
router.use('/materias', materias);

export default router;

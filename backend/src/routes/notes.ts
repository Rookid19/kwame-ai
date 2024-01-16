import { Router } from 'express'
import { getNotes } from '../controllers/notes';


const router = Router();

router.get('/all', getNotes);

export default router;
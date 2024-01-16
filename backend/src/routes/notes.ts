import { Router } from 'express'
import { addNotes, getNotes } from '../controllers/notes';
import { validateAddNotes } from '../middlewares/validate';


const router = Router();

router.get('/all', getNotes);
router.post('/add', validateAddNotes, addNotes);

export default router;
import { Router } from 'express'
import { addNotes, getNotes, updateNotes } from '../controllers/notes';
import { validateAddNotes } from '../middlewares/validate';


const router = Router();

router.get('/all', getNotes);
router.post('/add', validateAddNotes, addNotes);
router.post('/modify', validateAddNotes, updateNotes);

export default router;
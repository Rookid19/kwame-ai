import { Router } from 'express'
import { addNotes, deleteNotes, getNotes, updateNotes } from '../controllers/notes';
import { validateAddNotes } from '../middlewares/validate';


const router = Router();

router.get('/all', getNotes);
router.post('/add', validateAddNotes, addNotes);
router.put('/modify/:id', validateAddNotes, updateNotes);
router.delete('/delete/:id', deleteNotes);

export default router;
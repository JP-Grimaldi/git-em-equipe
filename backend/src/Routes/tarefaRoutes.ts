import { Router } from 'express';
import { getTarefa, createTarefa, updateTarefa, deleteTarefa } from '../Controller/tarefaController';

const router = Router();

router.get('/', getTarefa);
router.post('/', createTarefa);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

export default router;

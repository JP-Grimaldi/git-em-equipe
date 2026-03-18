import Routes from 'express'
import { getTarefa, createTarefa, updateTarefa, deleteTarefa } from '../Controller/tarefaController'

const router = Routes()

router.get('/', getTarefa)
router.post('/', createTarefa)
router.put('/:id', updateTarefa)
router.delete('/:id', deleteTarefa)

export default router
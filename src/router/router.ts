import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.post('/', UserController.createUser)
router.get('/', UserController.getUsers)
router.delete('/:id', UserController.deleteUser)

export default router

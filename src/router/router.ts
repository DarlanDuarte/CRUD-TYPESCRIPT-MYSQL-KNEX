import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.post('/', UserController.createUser)
router.get('/', UserController.getUsers)
router.delete('/:id', UserController.deleteUser)
router.put('/:email', UserController.updateUser)

router.post('/login', UserController.login)

export default router

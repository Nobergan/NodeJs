import { Router } from 'express';
import { userController } from "../controllers/user.controller";

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser )
router.get('/:id', userController.getUserById );
router.patch('/:id', userController.updateUserById );
router.delete('/:id', userController.deleteUserById );

export const userRouter = router;

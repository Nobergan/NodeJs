import { Router } from 'express';
import { userController } from "../controllers/user.controller";

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser )
router.get('/:id', userController.getUserById );

export const userRouter = router;

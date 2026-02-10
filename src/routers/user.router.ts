import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAllUsers);
router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.createUser),
    userController.createUser,
);
router.get(
    "/:id",
    commonMiddleware.isIdValid("id"),
    userController.getUserById,
);
router.patch(
    "/:id",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(UserValidator.updateUser),
    userController.updateUserById,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValid("id"),
    userController.deleteUserById,
);

export const userRouter = router;

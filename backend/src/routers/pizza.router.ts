import { Router } from "express";

import { pizzaController } from "../controllers/pizza.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PizzaValidator } from "../validators/pizza.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.query(PizzaValidator.query),
    pizzaController.getAllPizza,
);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(PizzaValidator.createPizza),
    pizzaController.createPizza,
);

export const pizzaRouter = router;

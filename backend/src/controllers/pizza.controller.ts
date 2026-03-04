import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/status-codes.enum";
import { IPizzaCreateDTO, IPizzaQuery } from "../interfaces/pizza.interface";
import { pizzaService } from "../services/pizza.service";

class PizzaController {
    public async getAllPizza(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IPizzaQuery;
            const data = await pizzaService.getAllPizza(query);

            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createPizza(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as IPizzaCreateDTO;
            const pizza = await pizzaService.createPizza(data);

            res.status(StatusCodes.OK).json(pizza);
        } catch (error) {
            next(error);
        }
    }
}

export const pizzaController = new PizzaController();

import { IPizza, IPizzaCreateDTO } from "../interfaces/pizza.interface";
import { Pizza } from "../models/pizza.model";

class PizzaRepository {
    public getAllPizza(): Promise<IPizza[]> {
        return Pizza.find();
    }

    public createPizza(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return Pizza.create(pizza);
    }
}

export const pizzaRepository = new PizzaRepository();

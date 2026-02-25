import { IPizza, IPizzaCreateDTO } from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repositories/pizza.repository";

class PizzaService {
    public getAllPizza(): Promise<IPizza[]> {
        return pizzaRepository.getAllPizza();
    }

    public async createPizza(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return await pizzaRepository.createPizza(pizza);
    }
}

export const pizzaService = new PizzaService();

import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repositories/pizza.repository";

class PizzaService {
    public async getAllPizza(
        query: IPizzaQuery,
    ): Promise<IPaginatedResponse<IPizza>> {
        const [data, totalItems] = await pizzaRepository.getAllPizza(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public async createPizza(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return await pizzaRepository.createPizza(pizza);
    }
}

export const pizzaService = new PizzaService();

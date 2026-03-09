import { PizzaCreate } from "../components/PizzasContainer /PizzaCreate";
import { Pizzas } from "../components/PizzasContainer /Pizzas";

const PizzasPage = () => {
    return (
        <div>
            <PizzaCreate/>
            <hr/>
            <Pizzas/>
        </div>
    );
};

export {PizzasPage};
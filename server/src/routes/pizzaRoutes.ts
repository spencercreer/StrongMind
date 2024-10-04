import { Router } from "express";
import PizzaController from "../controllers/PizzaController";

const pizzaController = new PizzaController();

const pizzaRoutes = Router();

pizzaRoutes
  .route("/")
  .get(pizzaController.getPizzas)
  .post(pizzaController.createPizza);

pizzaRoutes
  .route("/:pizzaId")
  .get(pizzaController.getPizza)
  .delete(pizzaController.deletePizza);

export default pizzaRoutes;

import { Router } from "express";
import PizzaController from "../controllers/pizzaController";

const pizzaController = new PizzaController();

const pizzaRoutes = Router();

pizzaRoutes
  .route("/")
  .get(pizzaController.getPizzas)
  .post(pizzaController.createPizza);

pizzaRoutes.route("/:pizzaId").get(pizzaController.getPizza);

export default pizzaRoutes;

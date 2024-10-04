import { Request, Response } from "express";
import Pizza from "../models/Pizza";

export default class PizzaController {
  async getPizzas(req: Request, res: Response) {
    try {
      const query = req.query;
      const pizzas = await Pizza.find(query).populate("toppings");
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  async getPizza(req: Request, res: Response) {
    try {
      const pizza = await Pizza.findById(req.params.pizzaId);
      if (!pizza) {
        res.status(404).json({ message: "Pizza not found" });
      } else {
        res.status(200).json(pizza);
      }
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  async createPizza(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        res.status(400).json({ message: "Pizza name is required" });
      } else {
        const newPizza = await Pizza.create(req.body);
        res.status(201).json(newPizza);
      }
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  async deletePizza(req: Request, res: Response) {
    try {
      const deletedPizza = await Pizza.findByIdAndDelete(req.params.pizzaId);
      if (!deletedPizza) {
        res.status(404).json({ message: "Pizza not found" });
      } else {
        res.status(200).json({ message: "Pizza deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

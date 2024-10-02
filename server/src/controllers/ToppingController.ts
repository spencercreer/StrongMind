import { Request, Response } from "express";
import Topping from "../models/Topping";

export default class ToppingController {
  async getToppings(req: Request, res: Response) {
    try {
      const query = req.query;
      const toppings = await Topping.find(query);
      res.status(200).json(toppings);
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  async getTopping(req: Request, res: Response) {
    try {
      const topping = await Topping.findById(req.params.toppingId);
      if (!topping) {
        res.status(404).json({ message: "Topping not found" });
      } else {
        res.status(200).json(topping);
      }
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  async createTopping(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        res.status(400).json({ message: "Topping name is required" });
      } else {
        const newTopping = await Topping.create(req.body);
        res.status(201).json(newTopping);
      }
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

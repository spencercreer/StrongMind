import { Router, Request, Response } from "express";
import pizzaRoutes from "./pizzaRoutes";
import toppingRoutes from "./toppingRoutes";

const routes = Router();

routes.use("/pizza", pizzaRoutes);
routes.use("/topping", toppingRoutes);

routes.route("/health").get((_req: Request, res: Response): void => {
  res.status(200).send({ message: "Healthy", status: "OK" });
});

export default routes;

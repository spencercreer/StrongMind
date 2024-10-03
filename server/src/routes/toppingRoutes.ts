import { Router } from "express";
import ToppingController from "../controllers/ToppingController";

const toppingController = new ToppingController();

const toppingRoutes = Router();

toppingRoutes
  .route("/")
  .get(toppingController.getToppings)
  .post(toppingController.createTopping);

toppingRoutes
  .route("/:toppingId")
  .get(toppingController.getTopping)
  .put(toppingController.updateTopping)
  .delete(toppingController.deleteTopping);

export default toppingRoutes;

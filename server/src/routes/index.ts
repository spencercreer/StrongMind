import { Router, Request, Response } from "express";

const routes = Router();

routes.route("/health").get((_req: Request, res: Response): void => {
  res.status(200).send({ message: "Healthy", status: "OK" });
});

export default routes;

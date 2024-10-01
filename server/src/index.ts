import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  })
);
app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening on PORT:${port}`);
});

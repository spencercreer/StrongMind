import express from "express";
import cors from "cors";
import routes from "./routes";
import connection from "./db/connection";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  })
);

app.use(routes);

if (require.main === module) {
  connection.once("open", () => {
    /* eslint-disable-next-line no-console */
    console.log("Database connection successful");
    app.listen(port, () => {
      /* eslint-disable-next-line no-console */
      console.log(`Server is listening at ${port}`);
    });
  });
}

export default app;

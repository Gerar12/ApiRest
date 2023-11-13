import express from "express";
import { router } from "./routes/movies";
import { corsMiddlewares } from "./middlewares";

console.clear();

const PORT = process.env.PORT ?? 3000;

const app = express();
app.disable("x-powered-by");
app.use(corsMiddlewares());

app.use(express.json());

app.use("/movies", router);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

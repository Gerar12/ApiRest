import { Router } from "express";
import { MovieControllers } from "../controllers";

const router = Router();

router.get("/", MovieControllers.getAll);

router.get("/:id", MovieControllers.selectID);

router.post("/", MovieControllers.createMovie);

router.patch("/:id", MovieControllers.editMovie);

export { router };

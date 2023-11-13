"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", controllers_1.MovieControllers.getAll);
router.get("/:id", controllers_1.MovieControllers.selectID);
router.post("/", controllers_1.MovieControllers.createMovie);
router.patch("/:id", controllers_1.MovieControllers.editMovie);

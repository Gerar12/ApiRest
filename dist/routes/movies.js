"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const movies_json_1 = __importDefault(require("../movies.json"));
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    const { genre } = req.query;
    if (typeof genre === "string") {
        if (genre) {
            const filteredGenre = movies_json_1.default.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
            return filteredGenre.length <= 0
                ? res.status(400).json({ error: "El genero no existe" })
                : res.json(filteredGenre);
        }
    }
    res.json(movies_json_1.default);
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const filter = movies_json_1.default.filter((item) => item.id === id);
    if (filter.length > 0) {
        res.json(filter);
    }
    else {
        res.status(400).json({ error: "Movie not exist" });
    }
});
router.post("/", (req, res) => {
    const result = (0, types_1.validateMovie)(req.body);
    if (!result.success) {
        res.status(404).json({ error: JSON.parse(result.error.message) });
        return;
    }
    const newMovie = Object.assign({ id: crypto_1.default.randomUUID() }, result.data);
    movies_json_1.default.push(newMovie);
    return res.status(201).json(newMovie);
});
router.patch("/:id", (req, res) => {
    const result = (0, types_1.validateParcialMovie)(req.body);
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const movieIndex = movies_json_1.default.findIndex((item) => item.id === id);
    if (movieIndex < 0)
        res.status(404).json({ error: "Movie not exist" });
    const updateMovie = Object.assign(Object.assign({}, movies_json_1.default[movieIndex]), result.data);
    movies_json_1.default[movieIndex] = updateMovie;
    return res.json(updateMovie);
});

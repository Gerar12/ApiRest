"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieControllers = void 0;
const models_1 = require("../models");
const types_1 = require("../types");
class MovieControllers {
}
exports.MovieControllers = MovieControllers;
_a = MovieControllers;
MovieControllers.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre } = req.query;
    const movies = yield models_1.Movies.getAll({ genre });
    res.json(movies);
});
MovieControllers.selectID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const movie = yield models_1.Movies.getById({ id });
    if (movie)
        return res.json(movie);
    res.status(400).json({ error: "Movie not exist" });
});
MovieControllers.createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, types_1.validateMovie)(req.body);
    if (!result.success) {
        res.status(404).json({ error: JSON.parse(result.error.message) });
        return;
    }
    const newMovie = yield models_1.Movies.creatMovie(result.data);
    return res.status(201).json(newMovie);
});
MovieControllers.editMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, types_1.validateParcialMovie)(req.body);
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const updateMovie = yield models_1.Movies.updateMovie({ id, result: result.data });
    return res.json(updateMovie);
});

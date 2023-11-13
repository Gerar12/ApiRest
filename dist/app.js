"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_json_1 = __importDefault(require("./movies.json"));
const crypto_1 = __importDefault(require("crypto"));
const types_1 = require("./types");
console.clear();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json());
//Metodos de la api
//Buscar por generos de peliculas o todas las peliculas
app.get("/movies", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
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
//ver solamente una pelicula en espesifico
app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    const filter = movies_json_1.default.filter((item) => item.id === id);
    if (filter.length > 0) {
        res.json(filter);
    }
    else {
        res.status(400).json({ error: "Movie not exist" });
    }
});
//Agregar una pelicula
app.post("/movies", (req, res) => {
    const result = (0, types_1.validateMovie)(req.body);
    if (!result.success) {
        res.status(404).json({ error: JSON.parse(result.error.message) });
        return;
    }
    const newMovie = Object.assign({ id: crypto_1.default.randomUUID() }, result.data);
    movies_json_1.default.push(newMovie);
    return res.status(201).json(newMovie);
});
//Actualizar una pelicula
app.patch("/movies/:id", (req, res) => {
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
//Fin de los metodos dela api
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});

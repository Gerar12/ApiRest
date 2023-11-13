import express from "express";
import movies from "../movies.json";
import crypto from "crypto";
import { validateMovie, validateParcialMovie } from "./types";

console.clear();

const PORT = process.env.PORT ?? 3000;

const app = express();
app.disable("x-powered-by");

app.use(express.json());

//Metodos de la api

//Buscar por generos de peliculas o todas las peliculas
app.get("/movies", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");

  const { genre } = req.query;
  if (typeof genre === "string") {
    if (genre) {
      const filteredGenre = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return filteredGenre.length <= 0
        ? res.status(400).json({ error: "El genero no existe" })
        : res.json(filteredGenre);
    }
  }

  res.json(movies);
});

//ver solamente una pelicula en espesifico
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const filter = movies.filter((item) => item.id === id);
  if (filter.length > 0) {
    res.json(filter);
  } else {
    res.status(400).json({ error: "Movie not exist" });
  }
});

//Agregar una pelicula
app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    res.status(404).json({ error: JSON.parse(result.error.message) });
    return;
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  return res.status(201).json(newMovie);
});

//Actualizar una pelicula
app.patch("/movies/:id", (req, res) => {
  const result = validateParcialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((item) => item.id === id);
  if (movieIndex < 0) res.status(404).json({ error: "Movie not exist" });

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

//Fin de los metodos dela api

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

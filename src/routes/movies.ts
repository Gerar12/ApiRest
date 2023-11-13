import { Router } from "express";
import { validateMovie, validateParcialMovie } from "../types";
import movies from "../movies.json";
import crypto from "crypto";

const router = Router();

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const filter = movies.filter((item) => item.id === id);
  if (filter.length > 0) {
    res.json(filter);
  } else {
    res.status(400).json({ error: "Movie not exist" });
  }
});

router.post("/", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

export { router };

import { Movies } from "../models";
import { validateMovie, validateParcialMovie } from "../types";
class MovieControllers {
  static getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await Movies.getAll({ genre });
    res.json(movies);
  };

  static selectID = async (req, res) => {
    const { id } = req.params;
    const movie = await Movies.getById({ id });
    if (movie) return res.json(movie);
    res.status(400).json({ error: "Movie not exist" });
  };

  static createMovie = async (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
      res.status(404).json({ error: JSON.parse(result.error.message) });
      return;
    }

    const newMovie = await Movies.creatMovie(result.data);
    return res.status(201).json(newMovie);
  };

  static editMovie = async (req, res) => {
    const result = validateParcialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updateMovie = await Movies.updateMovie({ id, result: result.data });

    return res.json(updateMovie);
  };
}

export { MovieControllers };

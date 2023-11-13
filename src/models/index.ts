import movies from "../movies.json";
import crypto from "crypto";

class Movies {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }

    return movies;
  };

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => {
      movie.id === id;
    });

    if (movie) return movie;
  };

  static creatMovie = async (movie: {}) => {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movie,
    };

    movies.push(newMovie as never);

    return newMovie;
  };

  static updateMovie = async ({ id, result }) => {
    const movieIndex = movies.findIndex((item) => item.id === id);

    const updateMovie = {
      ...movies[movieIndex],
      ...result,
    };

    return (movies[movieIndex] = updateMovie);
  };
}

export { Movies };

import z from "zod";

const movieSchema = z.object({
  title: z.string({
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number(),
  poster: z.string().url(),
  genre: z.array(
    z.enum(["Action", "Comedy", "Drama", "Fantasy", "Horror", "Crime"])
  ),
});

const validateMovie = (movie: {}) => {
  return movieSchema.safeParse(movie);
};

const validateParcialMovie = (movie: {}) => {
  return movieSchema.partial().safeParse(movie);
};

export { validateMovie, validateParcialMovie };

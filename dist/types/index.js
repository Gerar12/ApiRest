"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParcialMovie = exports.validateMovie = void 0;
const zod_1 = __importDefault(require("zod"));
const movieSchema = zod_1.default.object({
    title: zod_1.default.string({
        required_error: "Movie title is required",
    }),
    year: zod_1.default.number().int().min(1900).max(2024),
    director: zod_1.default.string(),
    duration: zod_1.default.number().int().positive(),
    rate: zod_1.default.number(),
    poster: zod_1.default.string().url(),
    genre: zod_1.default.array(zod_1.default.enum(["Action", "Comedy", "Drama", "Fantasy", "Horror", "Crime"])),
});
const validateMovie = (movie) => {
    return movieSchema.safeParse(movie);
};
exports.validateMovie = validateMovie;
const validateParcialMovie = (movie) => {
    return movieSchema.partial().safeParse(movie);
};
exports.validateParcialMovie = validateParcialMovie;

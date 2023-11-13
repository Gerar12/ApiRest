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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movies = void 0;
const movies_json_1 = __importDefault(require("../movies.json"));
const crypto_1 = __importDefault(require("crypto"));
class Movies {
}
exports.Movies = Movies;
_a = Movies;
Movies.getAll = ({ genre }) => __awaiter(void 0, void 0, void 0, function* () {
    if (genre) {
        return movies_json_1.default.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
    }
    return movies_json_1.default;
});
Movies.getById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = movies_json_1.default.find((movie) => {
        movie.id === id;
    });
    if (movie)
        return movie;
});
Movies.creatMovie = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    const newMovie = Object.assign({ id: crypto_1.default.randomUUID() }, movie);
    movies_json_1.default.push(newMovie);
    return newMovie;
});
Movies.updateMovie = ({ id, result }) => __awaiter(void 0, void 0, void 0, function* () {
    const movieIndex = movies_json_1.default.findIndex((item) => item.id === id);
    const updateMovie = Object.assign(Object.assign({}, movies_json_1.default[movieIndex]), result);
    return (movies_json_1.default[movieIndex] = updateMovie);
});

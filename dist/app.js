"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = require("./routes/movies");
const middlewares_1 = require("./middlewares");
console.clear();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, middlewares_1.corsMiddlewares)());
app.use(express_1.default.json());
app.use("/movies", movies_1.router);
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});

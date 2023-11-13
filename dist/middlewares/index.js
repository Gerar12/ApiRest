"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const corsMiddlewares = () => (0, cors_1.default)({
    origin: (origin, callback) => {
        const acceptedOrigins = [
            "gcoder.com",
            "mytesting.cloud",
            "https://mytesting.cloud",
            "https://gcoder.dev",
            "http://localhost:3000",
            "http://localhost:8080",
        ];
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true);
        }
        if (!origin) {
            // Permitir solicitudes sin 'origin' (como mobile apps o curl requests)
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
});
exports.corsMiddlewares = corsMiddlewares;

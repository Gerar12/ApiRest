import cors from "cors";

const corsMiddlewares = () =>
  cors({
    origin: (origin, callback) => {
      const acceptedOrigins = [
        "gcoder.com",
        "mytesting.cloud",
        "https://mytesting.cloud",
        "https://gcoder.dev",
        "http://localhost:3000",
        "http://localhost:8080",
      ];

      if (acceptedOrigins.includes(origin as string)) {
        return callback(null, true);
      }

      if (!origin) {
        // Permitir solicitudes sin 'origin' (como mobile apps o curl requests)
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });

export { corsMiddlewares };

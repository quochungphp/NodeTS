import dotenv from "dotenv";
import { AppEnvironmentInterface } from "./app-env.interface";

export class AppEnv implements AppEnvironmentInterface {
  setup(): void {
    dotenv.config();
  }

  get port(): number {
    return process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3001;
  }

  get pgHost(): string {
    return process.env.PG_HOST || "localhost";
  }

  get pgPort(): number {
    return process.env.PG_PORT ? Number.parseInt(process.env.PG_PORT, 10) : 5432;
  }

  get pgDb(): string {
    return process.env.PG_DB || "moneybag";
  }

  get pgUser(): string {
    return process.env.PG_USER || "postgres";
  }

  get pgPass(): string {
    return process.env.PG_PASS || "password";
  }

  get corsEnabled(): boolean {
    return process.env.CORS_ENABLED === "true";
  }

  get corsAllowedOrigins(): string[] | "all" {
    if (process.env.CORS_ALLOWED_ORIGINS === "all") {
      return "all";
    }

    return process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(",").map((name) => name.trim())
      : ["http://localhost:3030"];
  }

  get xApiKey(): string {
    return process.env.X_API_KEY || "T8YX1AeAU9442sUMLD3RKudFK0TeLGl5VgpthKqvEC6kB5XlD1CW";
  }
}

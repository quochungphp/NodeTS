/* eslint-disable class-methods-use-this */
/* eslint-disable unicorn/prevent-abbreviations */
import dotenv from "dotenv";
import { Service } from "typedi";
import { AppEnvironmentInterface } from "./app-env.interface";

@Service()
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
    return process.env.PG_DB || "database-test";
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

  get jwtSecret(): string {
    return process.env.JWT_SECRET || "supersecret";
  }

  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || "1h";
  }

  get xApiKey(): string {
    return process.env.X_API_KEY || "T8YX1AeAU9442sUMLD3RKudFK0TeLGl5VgpthKqvEC6kB5XlD1CW";
  }
}

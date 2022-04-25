import dotenv from "dotenv";
import { AppEnvInterface } from "./app-env.interface";
export class AppEnv implements AppEnvInterface {

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
        return process.env.PG_DB || "nab";
    }
    get pgUser(): string {
        return process.env.PG_USER || "nab-server";
      }
    
    get pgPass(): string {
        return process.env.PG_PASS || "Password";
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
}
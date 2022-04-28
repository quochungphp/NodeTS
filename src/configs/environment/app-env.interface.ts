export interface AppEnvironmentInterface {
  setup(): void;
  readonly port: number;
  readonly corsEnabled: boolean;
  readonly corsAllowedOrigins: string[] | "all";
  readonly pgHost: string;
  readonly pgPort: number;
  readonly pgDb: string;
  readonly pgUser: string;
  readonly pgPass: string;
  readonly xApiKey: string;
}

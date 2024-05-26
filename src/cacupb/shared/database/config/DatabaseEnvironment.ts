export default class DatabaseEnvironment {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  DATABASE: string;

  constructor() {
    this.HOST = process.env["HOST"] ?? "localhost";
    this.PORT = parseInt(process.env["PORT"] ?? "1802");
    this.USER = process.env["USER"] ?? "";
    this.PASSWORD = process.env["PASSWORD"] ?? "";
    this.DATABASE = process.env["DATABASE"] ?? "";
  }
}

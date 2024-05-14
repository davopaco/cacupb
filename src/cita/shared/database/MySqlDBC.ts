import mysql from "mysql2";
import MySqlConnectionConfig from "./types/ConnectionInterface";

export default class MySqlDBC {
  private mySqlConnectionConfig: MySqlConnectionConfig;
  private connection: mysql.Connection | null = null;

  constructor(mySqlConnectionConfig: MySqlConnectionConfig) {
    this.mySqlConnectionConfig = mySqlConnectionConfig;
  }

  async connect() {
    this.connection = mysql.createConnection(this.mySqlConnectionConfig);
    this.connection.connect((error) => {
      if (error) {
        console.error("Error connecting to database: ", error);
        return;
      }
      console.log("Connected to database");
    });
  }

  async query(sql: string, values?: any[]) {
    if (!this.connection) {
      throw new Error("Connection is not established");
    }
    return new Promise((resolve, reject) => {
      this.connection?.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }

  async close() {
    if (!this.connection) {
      throw new Error("Connection is not established");
    }
    this.connection.end((error) => {
      if (error) {
        console.error("Error closing connection: ", error);
        return;
      }
      console.log("Connection closed");
    });
  }

  public async setQuery(sql: string, values?: any[]) {
    await this.connect();
    const result = await this.query(sql, values);
    await this.close();
    return result;
  }
}

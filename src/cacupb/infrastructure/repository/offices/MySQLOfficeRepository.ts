import { ResultSetHeader } from "mysql2";
import Sedes from "../../../domain/model/database/Sedes";
import NullOffice from "../../../domain/model/office/NullOffice";
import Office from "../../../domain/model/office/Office";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class MySQLOfficesRepository implements OfficeRepositoryPort {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  public async create(office: Office): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "INSERT INTO SEDES (NOMBRE) VALUES (?)",
      [office.getName()]
    );
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  public async delete(id: number): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "DELETE FROM SEDES WHERE ID = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  public async update(office: Office): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "UPDATE SEDES SET NOMBRE = ? WHERE ID = ?",
      [office.getName(), office.getId()]
    );
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  public async getById(id: number): Promise<Office> {
    const [result] = await this.mySqlDBC.query<Sedes>(
      "SELECT * FROM SEDES WHERE ID = ?",
      [id]
    );
    if (result === undefined) {
      return new NullOffice();
    }
    return new Office(result.NOMBRE, result.ID);
  }

  public async getAll(): Promise<Office[]> {
    const result = await this.mySqlDBC.query<Sedes>("SELECT * FROM SEDES", []);
    if (result.length === 0) {
      return [];
    }
    return result.map((sede) => new Office(sede.NOMBRE, sede.ID));
  }
}

import Sedes from "../../../domain/model/database/Sedes";
import NullOffice from "../../../domain/model/office/NullOffice";
import Office from "../../../domain/model/office/Office";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import MySqlDBC from "../../../shared/database/MySqlDBC";

export default class MySQLOfficesRepository implements OfficeRepositoryPort {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  public async create(office: Office): Promise<boolean> {
    const result = await this.mySqlDBC.query<number>(
      "INSERT INTO SEDES (NOMBRE) VALUES (?)",
      [office.getName()]
    );
    if (!result) {
      return false;
    }
    return true;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.mySqlDBC.query("DELETE FROM SEDES WHERE ID = ?", [
      id,
    ]);
    if (!result) {
      return false;
    }
    return true;
  }

  public async update(office: Office): Promise<boolean> {
    const result = await this.mySqlDBC.query<number>(
      "UPDATE SEDES SET NOMBRE = ? WHERE ID = ?",
      [office.getName(), office.getId()]
    );
    if (!result) {
      return false;
    }
    return true;
  }

  public async getById(id: number): Promise<Office> {
    const result = (await this.mySqlDBC.query<Sedes>(
      "SELECT * FROM SEDES WHERE ID = ?",
      [id]
    )) as Sedes[];
    if (!result) {
      return new NullOffice();
    }
    return new Office(result[0].NOMBRE, result[0].ID);
  }

  public async getAll(): Promise<Office[]> {
    const result = (await this.mySqlDBC.query<Sedes>(
      "SELECT * FROM SEDES",
      []
    )) as Sedes[];
    if (result.length === 0) {
      return [];
    }
    return result.map((sede) => new Office(sede.NOMBRE, sede.ID));
  }
}

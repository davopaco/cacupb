import { ResultSetHeader } from "mysql2/promise";
import Admin from "../../../domain/model/admin/Admin";
import AdminRepositoryPort from "../../../domain/port/driven/repository/AdminRepositoryPort";
import MySqlDBC from "../../../util/database/MySqlDBC";
import Usuarios from "../../../domain/model/database/Usuarios";
import NullAdmin from "../../../domain/model/admin/NullAdmin";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";

export default class MySQLAdminRepository implements AdminRepositoryPort {
  constructor(
    private readonly mySqlDBC: MySqlDBC,
    private readonly officeRepository: OfficeRepositoryPort
  ) {}

  async create(admin: Admin): Promise<boolean> {
    try {
      const [result] = await this.mySqlDBC.query<ResultSetHeader>(
        "INSERT INTO USUARIOS VALUES (?, ?, ?, ?, ?)",
        [
          admin.getId(),
          admin.getPassword(),
          admin.getName(),
          admin.getLastName(),
          admin.getType(),
          admin.getOffice(),
        ]
      );

      if (result.affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error saving the admin to the database", error);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "DELETE FROM USUARIOS WHERE ID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      console.error("Error deleting the admin from the database");
      return false;
    }
    return true;
  }

  async getById(id: number): Promise<Admin> {
    const [result] = await this.mySqlDBC.query<Usuarios>(
      "SELECT * FROM USUARIOS WHERE ID = ?",
      [id]
    );

    if (!result) {
      console.error("Error getting the admin from the database");
      return new NullAdmin();
    }

    return new Admin(
      result.ID,
      result.NOMBRES,
      result.APELLIDOS,
      await this.officeRepository.getById(result.SEDES_ID),
      result.HASH,
      result.TIPO,
      result.MODULO
    );
  }

  async getAll(): Promise<Admin[]> {
    const [result] = await this.mySqlDBC.query<Usuarios[]>(
      "SELECT * FROM USUARIOS"
    );

    if (!result) {
      console.error("Error getting the admin from the database");
      return [];
    }

    const admins = result.map(
      async (admin) =>
        new Admin(
          admin.ID,
          admin.NOMBRES,
          admin.APELLIDOS,
          await this.officeRepository.getById(admin.SEDES_ID),
          admin.HASH,
          admin.TIPO,
          admin.MODULO
        )
    );
    return await Promise.all(admins);
  }

  async update(admin: Admin): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "UPDATE USUARIOS SET NOMBRES = ?, APELLIDOS = ?, HASH = ?, TIPO = ?, SEDES_ID = ? WHERE ID = ?",
      [
        admin.getName(),
        admin.getLastName(),
        admin.getPassword(),
        admin.getType(),
        admin.getOffice().getId(),
        admin.getId(),
      ]
    );

    if (result.affectedRows === 0) {
      console.error("Error updating the admin in the database");
      return false;
    }
    return true;
  }
}

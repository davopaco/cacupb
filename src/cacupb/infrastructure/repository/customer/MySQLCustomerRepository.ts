import { ResultSetHeader } from "mysql2";
import Customer from "../../../domain/model/customer/Customer";
import NullCustomer from "../../../domain/model/customer/NullCustomer";
import Clientes from "../../../domain/model/database/Clientes";
import CustomerRepositoryPort from "../../../domain/port/driven/repository/CustomerRepositoryPort";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class MySQLCustomerRepository implements CustomerRepositoryPort {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  public async getById(id: number): Promise<Customer> {
    const [result] = await this.mySqlDBC.query<Clientes>(
      "SELECT * FROM CLIENTES WHERE ID = ?",
      [id]
    );
    if (!result) {
      console.error("Error getting the customer from the database");
      return new NullCustomer();
    }
    return new Customer(
      result.NOMBRES,
      result.APELLIDOS,
      result.ID,
      result.DIRECCION,
      result.FECHA_NAC,
      0
    );
  }
  public async create(customer: Customer): Promise<boolean> {
    try {
      const [result] = await this.mySqlDBC.query<ResultSetHeader>(
        "INSERT INTO CLIENTES (ID, NOMBRES, APELLIDOS, FECHA_NAC, DIRECCION) VALUES (?, ?, ?, ?, ?)",
        [
          customer.getId(),
          customer.getName(),
          customer.getLastName(),
          customer.getBirthDate(),
          customer.getAddress(),
        ]
      );
      if (result.affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error saving the customer to the database", error);
      return false;
    }
  }
  public async delete(id: number): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "DELETE FROM CLIENTES WHERE ID = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      console.error("Error deleting the customer from the database");
      return false;
    }
    return true;
  }
  public async update(customer: Customer): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "UPDATE CLIENTES SET NOMBRES = ?, APELLIDOS = ?, FECHA_NAC = ?, DIRECCION = ? WHERE ID = ?",
      [
        customer.getName(),
        customer.getLastName(),
        customer.getBirthDate(),
        customer.getAddress(),
        customer.getId(),
      ]
    );
    if (result.affectedRows === 0) {
      console.error("Error updating the customer in the database");
      return false;
    }
    return true;
  }
  public async getAll(): Promise<Customer[]> {
    const results = await this.mySqlDBC.query<Clientes>(
      "SELECT * FROM CLIENTES"
    );
    const customers = results.map(async (cliente) => {
      if (!cliente) {
        return new NullCustomer();
      }
      return new Customer(
        cliente.NOMBRES,
        cliente.APELLIDOS,
        cliente.ID,
        cliente.DIRECCION,
        cliente.FECHA_NAC,
        0
      );
    });
    return await Promise.all(customers);
  }
}

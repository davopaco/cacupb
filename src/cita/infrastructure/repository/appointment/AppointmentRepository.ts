import Appointment from "../../../domain/model/mysql/Appointment";
import MySqlDBC from "../../../shared/database/MySqlDBC";

export default class AppointmentRepository {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  public async createAppointment(appointment: Appointment): Promise<any> {
    return await this.mySqlDBC.setQuery(
      "INSERT INTO CITAS (FECHA, DESCRIPCION, LUGAR, TIPO, HORA, CLIENTES_ID, ESTADO) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        appointment.date,
        appointment.description,
        appointment.place,
        appointment.type,
        appointment.time,
        appointment.userId,
        appointment.state,
      ]
    );
  }

  public async deleteAppointment(id: number): Promise<any> {
    return await this.mySqlDBC.setQuery("DELETE FROM CITAS WHERE ID = ?", [id]);
  }

  public async updateAppointment(appointment: Appointment): Promise<any> {
    if (appointment.id !== undefined) {
      return await this.mySqlDBC.setQuery(
        "UPDATE CITAS SET FECHA = ?, DESCRIPCION = ?, LUGAR = ?, TIPO = ?, HORA = ?, CLIENTES_ID = ?, ESTADO = ? WHERE ID = ?",
        [
          appointment.date,
          appointment.description,
          appointment.place,
          appointment.type,
          appointment.time,
          appointment.userId,
          appointment.state,
          appointment.id,
        ]
      );
    }
  }

  public async getAppointments(): Promise<any> {
    return await this.mySqlDBC.setQuery("SELECT * FROM CITAS");
  }

  public async getAppointmentById(id: number): Promise<any> {
    return await this.mySqlDBC.setQuery("SELECT * FROM CITAS WHERE ID = ?", [
      id,
    ]);
  }
}

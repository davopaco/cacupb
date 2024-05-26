import Appointment from "../../../domain/model/appointment/Appointment";
import NullAppointment from "../../../domain/model/appointment/NullAppointment";
import { TypeService } from "../../../domain/model/appointment/types/TypeService";
import Citas from "../../../domain/model/database/Citas";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../../domain/port/driven/repository/CustomerRepositoryPort";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import Time from "../../../domain/model/time/Time";
import MySqlDBC from "../../../shared/database/MySqlDBC";
import { ResultSetHeader } from "mysql2";

export default class AppointmentRepository
  implements AppointmentRepositoryPort
{
  constructor(
    private readonly mySqlDBC: MySqlDBC,
    private readonly mySQLCustomerRepository: CustomerRepositoryPort,
    private readonly mySQLOfficesRepository: OfficeRepositoryPort
  ) {}

  public async create(appointment: Appointment): Promise<boolean> {
    const officeId = appointment.getOffice().getId();
    const customerId = appointment.getCustomer().getId();
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "INSERT INTO CITAS (FECHA, DESCRIPCION, SEDES_ID, TIPO, HORA, CLIENTES_ID, ESTADO) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        appointment.getDate(),
        appointment.getDescription(),
        officeId,
        appointment.getTypeService(),
        appointment.getTime().toString(),
        customerId,
        appointment.getStatus(),
      ]
    );
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  public async delete(id: number): Promise<boolean> {
    const [result] = await this.mySqlDBC.query<ResultSetHeader>(
      "DELETE FROM CITAS WHERE ID = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      console.error("Error deleting the appointment from the database");
      return false;
    }
    return true;
  }

  public async update(appointment: Appointment): Promise<boolean> {
    if (appointment.getId() !== undefined) {
      const officeId = appointment.getOffice().getId();
      const customerId = appointment.getCustomer().getId();
      const [result] = await this.mySqlDBC.query<ResultSetHeader>(
        "UPDATE CITAS SET FECHA = ?, DESCRIPCION = ?, SEDES_ID = ?, TIPO = ?, HORA = ?, CLIENTES_ID = ?, ESTADO = ? WHERE ID = ?",
        [
          appointment.getDate(),
          appointment.getDescription(),
          officeId,
          appointment.getTypeService(),
          appointment.getTime(),
          customerId,
          appointment.getStatus(),
          appointment.getId(),
        ]
      );
      if (result.affectedRows === 0) {
        console.error("Error updating the appointment from the database");
        return false;
      }
      return true;
    }
    return false;
  }

  public async getAll(): Promise<Appointment[]> {
    const citas = await this.mySqlDBC.query<Citas>("SELECT * FROM CITAS");
    const clientes = await this.mySQLCustomerRepository.getAll();
    const sedes = await this.mySQLOfficesRepository.getAll();
    const appointments: Appointment[] = [];
    citas.forEach((cita) => {
      const customer = clientes.find(
        (cliente) => cliente.getId() === cita.CLIENTES_ID
      );
      const office = sedes.find((sede) => sede.getId() === cita.SEDES_ID);
      const time = new Time(cita.HORA as string);
      const typeService: TypeService =
        TypeService[cita.TIPO as keyof typeof TypeService];
      if (customer && office) {
        appointments.push(
          new Appointment(
            customer,
            cita.FECHA,
            time,
            typeService,
            cita.ID,
            cita.DESCRIPCION,
            cita.ESTADO,
            office
          )
        );
      } else {
        appointments.push(new NullAppointment());
      }
    });
    return appointments;
  }

  public async getById(id: number): Promise<Appointment> {
    const [citas] = await this.mySqlDBC.query<Citas>(
      "SELECT * FROM CITAS WHERE ID = ?",
      [id]
    );
    if (citas === undefined) {
      return new NullAppointment();
    }
    const customer = await this.mySQLCustomerRepository.getById(
      citas.CLIENTES_ID
    );
    const office = await this.mySQLOfficesRepository.getById(citas.SEDES_ID);
    const time = new Time(citas.HORA as string);
    const typeService: TypeService =
      TypeService[citas.TIPO as keyof typeof TypeService];
    if (customer) {
      return new Appointment(
        customer,
        citas.FECHA,
        time,
        typeService,
        citas.ID,
        citas.DESCRIPCION,
        citas.ESTADO,
        office
      );
    }
    return new NullAppointment();
  }
}

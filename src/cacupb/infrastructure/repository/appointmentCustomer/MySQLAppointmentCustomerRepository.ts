import AppointmentCustomerRepositoryPort from "../../../domain/port/driven/repository/AppointmentCustomerRepositoryPort";
import MySqlDBC from "../../../util/database/MySqlDBC";

interface ClienteCita {
  customer_id: number;
  appointment_id: number;
}

export default class MySQLAppointmentCustomerRepository
  implements AppointmentCustomerRepositoryPort
{
  constructor(private readonly mySqlDB: MySqlDBC) {}

  public async getByIds(
    customerId: number,
    appointmentId: number
  ): Promise<boolean> {
    const [appointmentCustomer] = await this.mySqlDB.query<ClienteCita>(
      "SELECT CI.ID, CL.ID FROM CITAS CI, CLIENTES CL WHERE CI.CLIENTES_ID = CL.ID AND CI.ID = ? AND CL.ID = ?",
      [appointmentId, customerId]
    );

    if (appointmentCustomer === undefined) {
      return false;
    }
    return true;
  }
}

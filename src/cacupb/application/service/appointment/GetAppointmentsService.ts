import Appointment from "../../../domain/model/appointment/Appointment";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import GetAppointmentsServicePort from "../../../domain/port/driver/service/GetAppointmentsServicePort";

export default class GetAppointmentsService
  implements GetAppointmentsServicePort
{
  constructor(
    private readonly appointmentRepositoryPort: AppointmentRepositoryPort
  ) {}

  public async getAppointmentByNonAttended(
    status: string
  ): Promise<Appointment[]> {
    return await this.appointmentRepositoryPort.getByStatus(parseInt(status));
  }

  public async getAppointmentById(appointmentId: string): Promise<Appointment> {
    return await this.appointmentRepositoryPort.getById(
      parseInt(appointmentId)
    );
  }
}

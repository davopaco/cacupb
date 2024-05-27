import Appointment from "../../../domain/model/appointment/Appointment";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import GetAllAppointmentsUseCasePort from "../../../domain/port/driver/usecase/appointment/GetAllAppointmentsUseCasePort";

export default class GetAllAppointmentsUseCase
  implements GetAllAppointmentsUseCasePort
{
  constructor(private readonly appointmentService: AppointmentServicePort) {}

  public async execute(): Promise<Appointment[]> {
    return await this.appointmentService.getAllAppointments();
  }
}

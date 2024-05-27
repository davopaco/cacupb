import ValidateServicePort from "../../../domain/port/driver/service/ValidateServicePort";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import CancelAppointmentUseCasePort from "../../../domain/port/driver/usecase/appointment/CancelAppointmentUseCasePort";

export default class CancelAppointmentUseCase
  implements CancelAppointmentUseCasePort
{
  constructor(
    private readonly validateService: ValidateServicePort,
    private readonly appointmentService: AppointmentServicePort
  ) {}

  public async execute(
    customerId: string,
    appointmentId: string
  ): Promise<boolean> {
    if (
      await this.validateService.validateAppointmentForCustomer(
        customerId,
        appointmentId
      )
    ) {
      return await this.appointmentService.cancelAppointmentForCustomer(
        parseInt(appointmentId)
      );
    }
    return false;
  }
}

import ValidateServicePort from "../../../domain/port/driven/service/ValidateServicePort";
import ChangeAppointmentServicePort from "../../../domain/port/driver/service/appointment/ChangeAppointmentServicePort";
import CancelAppointmentUseCasePort from "../../../domain/port/driver/usecase/appointment/CancelAppointmentUseCasePort";

export default class CancelAppointmentUseCase
  implements CancelAppointmentUseCasePort
{
  constructor(
    private readonly validateService: ValidateServicePort,
    private readonly changeAppointmentService: ChangeAppointmentServicePort
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
      return await this.changeAppointmentService.cancelAppointmentForCustomer(
        parseInt(appointmentId)
      );
    }
    return false;
  }
}

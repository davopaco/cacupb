import ValidateServicePort from "../../../domain/port/driver/service/ValidateServicePort";
import ValidateIdsChangeAppointmentUseCasePort from "../../../domain/port/driver/usecase/appointment/ValidateIdsChangeUseCasePort";

export default class ValidateIdsChangeAppointmentUseCase
  implements ValidateIdsChangeAppointmentUseCasePort
{
  constructor(private readonly validateService: ValidateServicePort) {}

  async execute(customerId: string, appointmentId: string): Promise<boolean> {
    return await this.validateService.validateAppointmentForCustomer(
      customerId,
      appointmentId
    );
  }
}

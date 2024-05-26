import ValidateServicePort from "../../domain/port/driven/service/ValidateServicePort";
import ValidateIdsChangeAppointmentUseCasePort from "../../domain/port/driver/usecase/ValidateIdsChangeUseCasePort";

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

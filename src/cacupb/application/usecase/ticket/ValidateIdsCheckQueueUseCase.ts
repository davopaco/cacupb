import ValidateServicePort from "../../../domain/port/driven/service/ValidateServicePort";

export default class ValidateIdsCheckQueueUseCase
  implements ValidateIdsCheckQueueUseCasePort
{
  constructor(private readonly validateService: ValidateServicePort) {}
  async execute(customerId: string, appointmentId: string): Promise<boolean> {
    return await this.validateService.validateAppointmentForCustomer(
      customerId,
      appointmentId
    );
  }
}

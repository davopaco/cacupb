import ValidateServicePort from "../../../domain/port/driver/service/ValidateServicePort";
import ValidateIdsCheckQueueUseCasePort from "../../../domain/port/driver/usecase/ticket/ValidateIdsCheckQueueUseCasePort";

export default class ValidateIdsCheckQueueUseCase
  implements ValidateIdsCheckQueueUseCasePort
{
  constructor(private readonly validateService: ValidateServicePort) {}
  async execute(customerId: string, ticketId: string): Promise<boolean> {
    return await this.validateService.validateAppointmentForCustomer(
      customerId,
      ticketId
    );
  }
}

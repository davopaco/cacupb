import CustomerAppointmentId from "../../domain/model/web/CustomerAppointmentId";
import ValidateServicePort from "../../domain/port/driven/service/ValidateServicePort";
import ChangeAppointmentServicePort from "../../domain/port/driver/service/ChangeAppointmentServicePort";
import ChangeAppointmentUseCasePort from "../../domain/port/driver/usecase/ChangeAppointmentUseCasePort";

export default class ChangeAppointmentUseCase
  implements ChangeAppointmentUseCasePort
{
  constructor(
    private readonly changeAppointmentService: ChangeAppointmentServicePort,
    private readonly validateService: ValidateServicePort
  ) {}

  public async execute(
    customerAppointmentId: CustomerAppointmentId
  ): Promise<boolean> {
    if (
      await this.validateService.validateAppointmentForCustomer(
        customerAppointmentId.customerId,
        customerAppointmentId.id
      )
    ) {
      return await this.changeAppointmentService.changeAppointmentForCustomer(
        customerAppointmentId
      );
    }
    return false;
  }
}

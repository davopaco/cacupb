import CustomerAppointmentId from "../../domain/model/web/CustomerAppointmentId";
import ChangeAppointmentServicePort from "../../domain/port/driver/service/ChangeAppointmentServicePort";
import ChangeAppointmentUseCasePort from "../../domain/port/driver/usecase/ChangeAppointmentUseCasePort";

export default class ChangeAppointmentUseCase
  implements ChangeAppointmentUseCasePort
{
  constructor(
    private readonly changeAppointmentService: ChangeAppointmentServicePort
  ) {}

  public async execute(
    customerAppointmentId: CustomerAppointmentId
  ): Promise<boolean> {
    return await this.changeAppointmentService.changeAppointmentForCustomer(
      customerAppointmentId
    );
  }
}

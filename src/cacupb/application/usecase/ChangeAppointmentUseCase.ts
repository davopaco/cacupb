import CustomerAppointment from "../../domain/model/web/CustomerAppointment";
import ChangeAppointmentServicePort from "../../domain/port/driver/service/ChangeAppointmentServicePort";
import ChangeAppointmentUseCasePort from "../../domain/port/driver/usecase/ChangeAppointmentUseCasePort";

export default class ChangeAppointmentUseCase
  implements ChangeAppointmentUseCasePort
{
  constructor(
    private readonly changeAppointmentService: ChangeAppointmentServicePort
  ) {}

  public async execute(
    customerAppointment: CustomerAppointment
  ): Promise<boolean> {
    return await this.changeAppointmentService.changeAppointmentForCustomer(
      customerAppointment
    );
  }
}

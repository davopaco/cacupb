import AppointmentCustomerRepositoryPort from "../../domain/port/driven/repository/AppointmentCustomerRepositoryPort";
import ValidateServicePort from "../../domain/port/driven/service/ValidateServicePort";

export default class ValidateService implements ValidateServicePort {
  constructor(
    private readonly appointmentCustomerRepository: AppointmentCustomerRepositoryPort
  ) {}

  async validateAppointmentForCustomer(
    customerId: string,
    appointmentId: string
  ): Promise<boolean> {
    return await this.appointmentCustomerRepository.getByIds(
      parseInt(customerId),
      parseInt(appointmentId)
    );
  }
}

import Customer from "../../../domain/model/customer/Customer";
import NullCustomer from "../../../domain/model/customer/NullCustomer";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../../domain/port/driven/repository/CustomerRepositoryPort";
import CustomerServicePort from "../../../domain/port/driven/service/CustomerServicePort";

export default class CustomerService implements CustomerServicePort {
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly customerRepository: CustomerRepositoryPort
  ) {}

  async setAttendance(customer: Customer): Promise<boolean> {
    try {
      const customerAppointments =
        await this.appointmentRepository.getAppointmentsAttendedByCustomer(
          customer.getId()
        );

      customer.setAttendance(customerAppointments);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getAttendanceFromAppointments(
    customerId: number
  ): Promise<number> {
    return await this.appointmentRepository.getAppointmentsAttendedByCustomer(
      customerId
    );
  }

  public async getCustomerById(customerId: number): Promise<Customer> {
    const customer = await this.customerRepository.getById(customerId);
    if (customer instanceof Customer) {
      if (await this.setAttendance(customer)) {
        return customer;
      }
    }
    return new NullCustomer();
  }

  public async getAllCustomers(): Promise<Customer[]> {
    const customers = await this.customerRepository.getAll();
    const customersWithAttendance = await Promise.all(
      customers.map(async (customer) => {
        if (customer instanceof Customer) {
          if (await this.setAttendance(customer)) {
            return customer;
          }
        }
        return new NullCustomer();
      })
    );
    return customersWithAttendance;
  }
}

import CustomerAppointment from "../../../../model/web/CustomerAppointment";

export default interface CreateAppointmentServicePort {
  createAppointmentForCustomer(
    customerAppointment: CustomerAppointment
  ): Promise<boolean>;
  validateCustomer(customerId: string): Promise<boolean>;
}

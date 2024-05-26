import CustomerAppointment from "../../../model/web/CustomerAppointment";

export default interface CreateAppointmentUseCasePort {
  execute(customerAppointment: CustomerAppointment): Promise<boolean>;
}

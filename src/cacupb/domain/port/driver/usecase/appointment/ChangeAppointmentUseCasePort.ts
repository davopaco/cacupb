import CustomerAppointment from "../../../../model/web/CustomerAppointment";

export default interface ChangeAppointmentUseCasePort {
  execute(customerAppointment: CustomerAppointment): Promise<boolean>;
}

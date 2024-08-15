import CustomerAppointmentId from "../../../../model/web/CustomerAppointmentId";

export default interface ChangeAppointmentUseCasePort {
  execute(customerAppointmentId: CustomerAppointmentId): Promise<boolean>;
}

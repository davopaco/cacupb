import CustomerAppointment from "../../../model/web/CustomerAppointment";

export default interface ChangeAppointmentServicePort {
  changeAppointmentForCustomer(
    customerAppointment: CustomerAppointment
  ): Promise<boolean>;
}

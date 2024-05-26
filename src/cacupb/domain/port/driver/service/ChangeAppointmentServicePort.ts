import CustomerAppointmentId from "../../../model/web/CustomerAppointmentId";

export default interface ChangeAppointmentServicePort {
  changeAppointmentForCustomer(
    customerAppointmentId: CustomerAppointmentId
  ): Promise<boolean>;
  cancelAppointmentForCustomer(id: number): Promise<boolean>;
}

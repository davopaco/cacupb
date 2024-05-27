import Appointment from "../../../../model/appointment/Appointment";
import CustomerAppointment from "../../../../model/web/CustomerAppointment";
import CustomerAppointmentId from "../../../../model/web/CustomerAppointmentId";

export default interface AppointmentServicePort {
  getAppointmentByNonAttended(status: string): Promise<Appointment[]>;
  getAppointmentById(appointmentId: string): Promise<Appointment>;
  changeAppointmentForCustomer(
    customerAppointmentId: CustomerAppointmentId
  ): Promise<boolean>;
  cancelAppointmentForCustomer(id: number): Promise<boolean>;
  createAppointmentForCustomer(
    customerAppointment: CustomerAppointment
  ): Promise<boolean>;
  getAllAppointments(): Promise<Appointment[]>;
}

import Appointment from "../../../model/appointment/Appointment";

export default interface GetAppointmentsServicePort {
  getAppointmentByNonAttended(status: string): Promise<Appointment[]>;
}
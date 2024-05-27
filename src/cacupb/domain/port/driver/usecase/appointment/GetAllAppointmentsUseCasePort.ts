import Appointment from "../../../../model/appointment/Appointment";

export default interface GetAllAppointmentsUseCasePort {
  execute(): Promise<Appointment[]>;
}

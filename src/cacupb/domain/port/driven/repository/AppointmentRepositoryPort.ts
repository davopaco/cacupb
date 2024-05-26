import Appointment from "../../../model/appointment/Appointment";
import RepositoryPort from "./RepositoryPort";

export default interface AppointmentRepositoryPort
  extends RepositoryPort<number, Appointment> {
  getByStatus(status: number): Promise<Appointment[]>;
}

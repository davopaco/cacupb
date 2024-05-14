import AppointmentUserData from "../../../types/AppointmentUserData";

export default interface CreateAppointmentPort {
  createAppointment(
    userData: AppointmentUserData
  ): Promise<AppointmentUserData>;
}

export default interface GetNonAttendedAppointmentsUseCasePort {
  execute(): Promise<Buffer>;
}

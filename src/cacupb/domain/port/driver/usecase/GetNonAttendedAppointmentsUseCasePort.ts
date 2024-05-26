export default interface GetNonAttendedAppointmentsUseCasePort {
  execute(status: string): Promise<Buffer>;
}

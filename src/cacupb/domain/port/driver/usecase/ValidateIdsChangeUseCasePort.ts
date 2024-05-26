export default interface ValidateIdsChangeAppointmentUseCasePort {
  execute(customerId: string, appointmentId: string): Promise<boolean>;
}

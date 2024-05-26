export default interface CancelAppointmentUseCasePort {
  execute(customerId: string, appointmentId: string): Promise<boolean>;
}

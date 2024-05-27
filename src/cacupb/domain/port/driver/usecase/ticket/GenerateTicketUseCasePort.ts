export default interface GenerateTicketUseCasePort {
  execute(customerId: string, appointmentId: string): Promise<boolean>;
}

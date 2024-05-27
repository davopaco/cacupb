export default interface ValidateIdsCheckQueueUseCasePort {
  execute(customerId: string, appointmentId: string): Promise<boolean>;
}

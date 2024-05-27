export default interface RegisterTicketUseCasePort {
  execute(ticketId: string, adminId: string): Promise<boolean>;
}

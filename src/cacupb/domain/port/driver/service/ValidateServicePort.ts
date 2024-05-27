export default interface ValidateServicePort {
  validateAppointmentForCustomer(
    customerId: string,
    appointmentId: string
  ): Promise<boolean>;
  validateAppointmentForOffice(
    officeId: string,
    appointmentId: string
  ): Promise<boolean>;
  validateTicketForAppointment(
    appointmentId: string,
    ticketId: string
  ): Promise<boolean>;
}

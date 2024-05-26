export default interface ValidateServicePort {
  validateAppointmentForCustomer(
    customerId: string,
    appointmentId: string
  ): Promise<boolean>;
}

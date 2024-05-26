export default interface AppointmentCustomerRepositoryPort {
  getByIds(customerId: number, appointmentId: number): Promise<boolean>;
}

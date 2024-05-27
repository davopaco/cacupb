import Customer from "../../../model/customer/Customer";

export default interface CustomerServicePort {
  setAttendance(customer: Customer): Promise<boolean>;
  getAttendanceFromAppointments(customerId: number): Promise<number>;
  getCustomerById(customerId: number): Promise<Customer>;
  getAllCustomers(): Promise<Customer[]>;
  validateCustomer(customerId: string): Promise<boolean>;
}

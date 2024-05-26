import Customer from "../../../model/customer/Customer";

export default interface GetCustomerUseCasePort {
  getCustomerById(id: number): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer>;
  getCustomerByPhone(phone: string): Promise<Customer>;
  getAllCustomers(): Promise<Customer[]>;
}

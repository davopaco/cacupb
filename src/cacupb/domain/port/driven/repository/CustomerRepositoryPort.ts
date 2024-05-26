import Customer from "../../../model/customer/Customer";
import RepositoryPort from "./RepositoryPort";

export default interface CustomerRepositoryPort
  extends RepositoryPort<number, Customer> {}

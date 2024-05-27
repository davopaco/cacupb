import AbstractCustomer from "./AbstractCustomer";

export default class Customer extends AbstractCustomer {
  constructor(
    name: string,
    lastName: string,
    id: number,
    address: string,
    birthDate: Date,
    attendance: number
  ) {
    super(name, lastName, id, address, birthDate, attendance);
  }

  public isNull(): boolean {
    return false;
  }
}

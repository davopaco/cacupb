import AbstractCustomer from "./AbstractCustomer";

export default class Customer extends AbstractCustomer {
  constructor(
    name: string,
    lastName: string,
    id: number,
    address: string,
    birthDate: Date
  ) {
    super(name, lastName, id, address, birthDate);
  }

  public isNull(): boolean {
    return false;
  }
}

import AbstractUser from "../user/AbstractUser";

export default abstract class AbstractCustomer extends AbstractUser {
  protected address: string;
  protected birthDate: Date;

  constructor(
    name: string,
    lastName: string,
    id: number,
    address: string,
    birthDate: Date
  ) {
    super(id, name, lastName);
    this.address = address;
    this.birthDate = birthDate;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getBirthDate(): Date {
    return this.birthDate;
  }

  public setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }
}

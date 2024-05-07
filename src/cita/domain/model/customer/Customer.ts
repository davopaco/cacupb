import AbstractUser from "../user/AbstractUser";

export default class Customer extends AbstractUser {
  private address: string;

  constructor(name: string, lastName: string, id: number, address: string) {
    super(id, name, lastName);
    this.address = address;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public isNull(): boolean {
    return false;
  }
}

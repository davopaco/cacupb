import AbstractUser from "../user/AbstractUser";

export default class NullCustomer extends AbstractUser {
  constructor() {
    super(0, "Name not found in database", "Lastname not found in database");
  }

  public isNull(): boolean {
    return true;
  }

  public setNames(): void {
    return;
  }

  public setLastNames(): void {
    return;
  }

  public setId(): void {
    return;
  }

  public setAddress(): void {
    return;
  }
}

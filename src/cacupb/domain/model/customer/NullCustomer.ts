import AbstractCustomer from "./AbstractCustomer";

export default class NullCustomer extends AbstractCustomer {
  constructor() {
    super(
      "Name not found in database",
      "Lastname not found in database",
      -1,
      "Address not found in database",
      new Date(),
      0
    );
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

  public setBirthDate(): void {
    return;
  }

  public setAttendance(): void {
    return;
  }
}

import NullCustomer from "../customer/NullCustomer";
import AbstractAppointment from "./AbstractAppointment";

export default class NullAppointment extends AbstractAppointment {
  constructor() {
    super(
      new NullCustomer(),
      new Date(),
      0,
      0,
      0,
      "Description not found in database",
      -1
    );
  }

  public isNull(): boolean {
    return true;
  }

  public setCustomerId(): void {
    return;
  }

  public setDate(): void {
    return;
  }

  public setHour(): void {
    return;
  }

  public setTypeService(): void {
    return;
  }

  public setId(): void {
    return;
  }

  public setDescription(): void {
    return;
  }
}

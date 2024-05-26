import Time from "../time/Time";
import NullCustomer from "../customer/NullCustomer";
import NullOffice from "../office/NullOffice";
import AbstractAppointment from "./AbstractAppointment";
import { TypeService } from "./types/TypeService";

export default class NullAppointment extends AbstractAppointment {
  constructor() {
    super(
      new NullCustomer(),
      new Date(),
      new Time("00:00:00"),
      "NULL" as TypeService,
      0,
      "Description not found in database",
      -1,
      new NullOffice()
    );
  }

  public isNull(): boolean {
    return true;
  }

  public setCustomer(): void {
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

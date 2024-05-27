import NullOffice from "../office/NullOffice";
import AbstractAdmin from "./AbstractAdmin";
import { AdminType } from "./types/AdminType";

export default class NullAdmin extends AbstractAdmin {
  constructor() {
    super(
      0,
      "Name not found in database",
      "Lastname not found in database",
      new NullOffice(),
      "Password not found in database",
      AdminType.NULL,
      -1
    );
  }

  public isNull(): boolean {
    return true;
  }

  public setOffice(): void {
    return;
  }

  public setPassword(): void {
    return;
  }

  public setType(): void {
    return;
  }

  public setModule(): void {
    return;
  }
}

import NullOffice from "../office/NullOffice";
import AbstractAdmin from "./AbstractAdmin";

export default class NullAdmin extends AbstractAdmin {
  constructor() {
    super(
      0,
      "Name not found in database",
      "Lastname not found in database",
      new NullOffice()
    );
  }

  public isNull(): boolean {
    return true;
  }

  public setOffice(): void {
    return;
  }
}

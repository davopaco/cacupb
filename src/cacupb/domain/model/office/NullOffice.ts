import AbstractOffice from "./AbstractOffice";

export default class NullOffice extends AbstractOffice {
  constructor() {
    super("Name not found in database", -1);
  }

  public isNull(): boolean {
    return true;
  }

  public setName(): void {
    return;
  }

  public setId(): void {
    return;
  }
}

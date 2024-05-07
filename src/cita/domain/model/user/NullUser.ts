import AbstractUser from "./AbstractUser";

export default class NullUser extends AbstractUser {
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
}

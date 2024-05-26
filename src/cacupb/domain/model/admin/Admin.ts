import AbstractUser from "../user/AbstractUser";

export default class Admin extends AbstractUser {
  constructor(id: number, name: string, lastName: string) {
    super(id, name, lastName);
  }

  public isNull(): boolean {
    return false;
  }
}

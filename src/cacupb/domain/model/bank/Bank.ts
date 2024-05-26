import AbstractUser from "../user/AbstractUser";

export default class Bank extends AbstractUser {
  constructor(name: string, lastName: string, id: number) {
    super(id, name, lastName);
  }

  public isNull(): boolean {
    return false;
  }
}

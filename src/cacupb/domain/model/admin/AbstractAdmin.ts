import Office from "../office/Office";
import AbstractUser from "../user/AbstractUser";

export default abstract class AbstractAdmin extends AbstractUser {
  protected office: Office;

  constructor(id: number, name: string, lastName: string, office: Office) {
    super(id, name, lastName);
    this.office = office;
  }

  public getOffice(): Office {
    return this.office;
  }

  public setOffice(office: Office): void {
    this.office = office;
  }
}

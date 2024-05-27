import Office from "../office/Office";
import AbstractAdmin from "./AbstractAdmin";

export default class Admin extends AbstractAdmin {
  constructor(id: number, name: string, lastName: string, office: Office) {
    super(id, name, lastName, office);
  }

  public isNull(): boolean {
    return false;
  }
}

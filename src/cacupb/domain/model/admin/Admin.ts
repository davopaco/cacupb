import Office from "../office/Office";
import AbstractAdmin from "./AbstractAdmin";
import { AdminType } from "./types/AdminType";

export default class Admin extends AbstractAdmin {
  constructor(
    id: number,
    name: string,
    lastName: string,
    office: Office,
    password: string,
    type: AdminType,
    module: number
  ) {
    super(id, name, lastName, office, password, type, module);
  }

  public isNull(): boolean {
    return false;
  }
}

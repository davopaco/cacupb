import AbstractOffice from "./AbstractOffice";

export default class Office extends AbstractOffice {
  constructor(name: string, id: number) {
    super(name, id);
  }

  public isNull(): boolean {
    return false;
  }
}

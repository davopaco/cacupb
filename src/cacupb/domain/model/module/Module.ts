import AbstractModule from "./AbstractModule";

export default class Module extends AbstractModule {
  constructor(id: number) {
    super(id);
  }

  public isNull(): boolean {
    return false;
  }
}

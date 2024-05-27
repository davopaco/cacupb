import AbstractModule from "./AbstractModule";

export default class NullModule extends AbstractModule {
  constructor() {
    super(0);
  }

  public isNull(): boolean {
    return true;
  }

  public setId(): void {
    return;
  }
}

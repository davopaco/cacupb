export default abstract class AbstractModule {
  protected id: number;

  constructor(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public abstract isNull(): boolean;
}

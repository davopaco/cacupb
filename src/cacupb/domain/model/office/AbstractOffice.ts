export default abstract class AbstractOffice {
  protected name: string;
  protected id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public abstract isNull(): boolean;
}

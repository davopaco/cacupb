export default abstract class AbstractUser {
  protected id: number;
  protected name: string;
  protected lastName: string;

  constructor(id: number, name: string, lastName: string) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public abstract isNull(): boolean;
}

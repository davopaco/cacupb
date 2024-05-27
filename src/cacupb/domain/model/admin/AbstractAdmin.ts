import Office from "../office/Office";
import AbstractUser from "../user/AbstractUser";
import { AdminType } from "./types/AdminType";

export default abstract class AbstractAdmin extends AbstractUser {
  protected office: Office;
  protected password: string;
  protected type: AdminType;
  protected module: number;

  constructor(
    id: number,
    name: string,
    lastName: string,
    office: Office,
    password: string,
    type: AdminType,
    module: number
  ) {
    super(id, name, lastName);
    this.office = office;
    this.password = password;
    this.type = type;
    this.module = module;
  }

  public getOffice(): Office {
    return this.office;
  }

  public setOffice(office: Office): void {
    this.office = office;
  }

  public getPassword(): string {
    return this.password;
  }

  public getType(): AdminType {
    return this.type;
  }

  public setType(type: AdminType): void {
    this.type = type;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getModule(): number {
    return this.module;
  }

  public setModule(module: number): void {
    this.module = module;
  }
}

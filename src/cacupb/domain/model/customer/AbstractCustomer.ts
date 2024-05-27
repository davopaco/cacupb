import AbstractUser from "../user/AbstractUser";

export default abstract class AbstractCustomer extends AbstractUser {
  protected address: string;
  protected birthDate: Date;
  protected isVip: boolean;
  protected isOldPerson: boolean;
  protected attendace: number;

  constructor(
    name: string,
    lastName: string,
    id: number,
    address: string,
    birthDate: Date,
    attendance: number
  ) {
    super(id, name, lastName);
    this.address = address;
    this.birthDate = birthDate;
    this.attendace = attendance;
    this.isVip = this.checkVipPerson();
    this.isOldPerson = this.checkOldPerson();
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getBirthDate(): Date {
    return this.birthDate;
  }

  public setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  public isVipCustomer(): boolean {
    return this.isVip;
  }

  public isOldPersonCustomer(): boolean {
    return this.isOldPerson;
  }

  public getAttendance(): number {
    return this.attendace;
  }

  public setAttendance(attendance: number): void {
    this.attendace = attendance;
  }

  checkVipPerson(): boolean {
    return this.attendace >= 5;
  }

  checkOldPerson(): boolean {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - this.birthDate.getFullYear();
    return age >= 60;
  }
}

import { TypeService } from "./types/TypeService";
import { AppointmentStatus } from "./types/AppointmentStatus";
import Customer from "../customer/Customer";
import Time from "../time/Time";
import Office from "../office/Office";

export default abstract class AbstractAppointment {
  protected customer: Customer;
  protected date: Date;
  protected time: Time;
  protected typeService: TypeService;
  protected id: number;
  protected description: string;
  protected status: AppointmentStatus;
  protected office: Office;

  constructor(
    customer: Customer,
    date: Date,
    time: Time,
    typeService: TypeService,
    id: number,
    description: string,
    status: AppointmentStatus,
    office: Office
  ) {
    this.customer = customer;
    this.date = date;
    this.time = time;
    this.typeService = typeService;
    this.id = id;
    this.description = description;
    this.status = status;
    this.office = office;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getTime(): Time {
    return this.time;
  }

  public setTime(time: Time): void {
    this.time = time;
  }

  public getTypeService(): TypeService {
    return this.typeService;
  }

  public setTypeService(typeService: TypeService): void {
    this.typeService = typeService;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getStatus(): AppointmentStatus {
    return this.status;
  }

  public setStatus(status: AppointmentStatus): void {
    this.status = status;
  }

  public getOffice(): Office {
    return this.office;
  }

  public setPlace(office: Office): void {
    this.office = office;
  }

  public abstract isNull(): boolean;
}

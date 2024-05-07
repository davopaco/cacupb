import { TypeService } from "./types/TypeService";
import { AppointmentStatus } from "./types/AppointmentStatus";
import Customer from "../customer/Customer";

export default abstract class AbstractAppointment {
  protected customer: Customer;
  protected date: Date;
  protected hour: number;
  protected typeService: TypeService;
  protected id: number;
  protected description: string;
  protected status: AppointmentStatus;

  constructor(
    customer: Customer,
    date: Date,
    hour: number,
    typeService: TypeService,
    id: number,
    description: string,
    status: AppointmentStatus
  ) {
    this.customer = customer;
    this.date = date;
    this.hour = hour;
    this.typeService = typeService;
    this.id = id;
    this.description = description;
    this.status = status;
  }

  public getCustomerId(): Customer {
    return this.customer;
  }

  public setCustomerId(customer: Customer): void {
    this.customer = customer;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getHour(): number {
    return this.hour;
  }

  public setHour(hour: number): void {
    this.hour = hour;
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

  public abstract isNull(): boolean;
}

import Appointment from "../appointment/Appointment";
import { TicketStatus } from "./types/TicketStatus";

export default abstract class AbstractTicket {
  protected id: number;
  protected appointment: Appointment;
  protected status: TicketStatus;

  constructor(id: number, appointment: Appointment, status: TicketStatus) {
    this.id = id;
    this.appointment = appointment;
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getAppointment(): Appointment {
    return this.appointment;
  }

  public setAppointment(appointment: Appointment): void {
    this.appointment = appointment;
  }

  public getStatus(): TicketStatus {
    return this.status;
  }

  public setStatus(status: TicketStatus): void {
    this.status = status;
  }

  public abstract isNull(): boolean;
}

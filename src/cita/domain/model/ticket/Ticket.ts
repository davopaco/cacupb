import Appointment from "../appointment/Appointment";
import AbstractTicket from "./AbstractTicket";
import { TicketStatus } from "./types/TicketStatus";

export default class Ticket extends AbstractTicket {
  constructor(id: number, appointment: Appointment, status: TicketStatus) {
    super(id, appointment, status);
  }

  public isNull(): boolean {
    return false;
  }
}

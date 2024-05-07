import NullAppointment from "../appointment/NullAppointment";
import AbstractTicket from "./AbstractTicket";

export default class NullTicket extends AbstractTicket {
  constructor() {
    super(0, new NullAppointment(), -1);
  }

  public isNull(): boolean {
    return true;
  }
}

import Customer from "../customer/Customer";
import AbstractAppointment from "./AbstractAppointment";
import { AppointmentStatus } from "./types/AppointmentStatus";
import { TypeService } from "./types/TypeService";

export default class Appointment extends AbstractAppointment {
  constructor(
    customer: Customer,
    date: Date,
    hour: number,
    typeService: TypeService,
    id: number,
    description: string,
    status: AppointmentStatus
  ) {
    super(customer, date, hour, typeService, id, description, status);
  }

  public isNull(): boolean {
    return false;
  }
}

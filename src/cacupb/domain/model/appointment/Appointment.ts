import Time from "../time/Time";
import Customer from "../customer/Customer";
import Office from "../office/Office";
import AbstractAppointment from "./AbstractAppointment";
import { AppointmentStatus } from "./types/AppointmentStatus";
import { TypeService } from "./types/TypeService";

export default class Appointment extends AbstractAppointment {
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
    super(customer, date, time, typeService, id, description, status, office);
  }

  public isNull(): boolean {
    return false;
  }
}

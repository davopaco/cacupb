import Time from "../../helper/Time";

export default interface AppointmentUserData {
  date: Date;
  userId: number;
  names: string;
  lastNames: string;
  address: string;
  description: string;
  type: string;
  time: Time;
}

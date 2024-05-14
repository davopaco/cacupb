export default interface Appointment {
  id: number | undefined;
  date: Date;
  description: string;
  place: string;
  type: string;
  time: string;
  userId: number;
  state: string;
}

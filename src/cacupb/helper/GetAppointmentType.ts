import { TypeService } from "../domain/model/appointment/types/TypeService";

export function getAppointmentType(value: string): TypeService {
  return TypeService[value as keyof typeof TypeService];
}

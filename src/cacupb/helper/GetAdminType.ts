import { AdminType } from "../domain/model/admin/types/AdminType";

export function getAdminType(value: string): AdminType {
  return AdminType[value as keyof typeof AdminType];
}

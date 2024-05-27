import { TicketStatus } from "../domain/model/ticket/types/TicketStatus";

export function getTicketStatus(value: string): TicketStatus {
  return TicketStatus[value as keyof typeof TicketStatus];
}

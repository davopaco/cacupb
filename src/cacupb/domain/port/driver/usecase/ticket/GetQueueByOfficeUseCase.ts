import Ticket from "../../../../model/ticket/Ticket";

export default interface GetQueueByOfficeUseCasePort {
  execute(officeId: string): Promise<Ticket[]>;
}

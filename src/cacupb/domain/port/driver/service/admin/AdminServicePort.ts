import Ticket from "../../../../model/ticket/Ticket";

export default interface AdminServicePort {
  createAdmin(
    adminId: number,
    password: string,
    name: string,
    lastName: string,
    type: string,
    officeId: number,
    module: number
  ): Promise<boolean>;
  validatePassword(adminId: number, password: string): Promise<boolean>;
  getAllCustomerTickets(): Promise<Ticket[]>;
}

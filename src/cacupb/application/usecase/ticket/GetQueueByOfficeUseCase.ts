import Ticket from "../../../domain/model/ticket/Ticket";
import AdminServicePort from "../../../domain/port/driver/service/admin/AdminServicePort";
import GetQueueByOfficeUseCasePort from "../../../domain/port/driver/usecase/ticket/GetQueueByOfficeUseCase";

export default class GetQueueByOfficeUseCase
  implements GetQueueByOfficeUseCasePort
{
  constructor(private readonly adminService: AdminServicePort) {}

  public async execute(): Promise<Ticket[]> {
    return await this.adminService.getAllCustomerTickets();
  }
}

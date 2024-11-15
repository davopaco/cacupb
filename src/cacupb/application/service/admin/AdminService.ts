import Admin from "../../../domain/model/admin/Admin";
import Ticket from "../../../domain/model/ticket/Ticket";
import AdminRepositoryPort from "../../../domain/port/driven/repository/AdminRepositoryPort";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import AdminServicePort from "../../../domain/port/driver/service/admin/AdminServicePort";
import BCrypt from "../../../helper/BCrypt";
import { getAdminType } from "../../../helper/GetAdminType";

export default class AdminService implements AdminServicePort {
  constructor(
    private readonly adminRepository: AdminRepositoryPort,
    private readonly officeRepository: OfficeRepositoryPort,
    private readonly bCrypt: BCrypt
  ) {}

  public async createAdmin(
    adminId: number,
    password: string,
    name: string,
    lastName: string,
    type: string,
    officeId: number,
    module: number
  ): Promise<boolean> {
    const office = await this.officeRepository.getById(officeId);
    const hashedPassword = await this.bCrypt.hashPassword(password);
    const admin = new Admin(
      adminId,
      name,
      lastName,
      office,
      hashedPassword,
      getAdminType(type),
      module
    );
    return await this.adminRepository.create(admin);
  }

  public async validatePassword(
    adminId: number,
    password: string
  ): Promise<boolean> {
    const admin = await this.adminRepository.getById(adminId);
    return await this.bCrypt.comparePassword(password, admin.getPassword());
  }

  public async getAllCustomerTickets(): Promise<Ticket[]> {
    const admin = await this.adminRepository.getAll();
    const customerTickets: Ticket[] = [];
    admin.forEach((admin) => {
      const tickets = admin.getCustomerTicket();
      if (!tickets.isNull()) {
        customerTickets.push(tickets);
      }
    });
    return customerTickets;
  }
}

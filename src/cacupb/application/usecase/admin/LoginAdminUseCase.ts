import AdminServicePort from "../../../domain/port/driver/service/admin/AdminServicePort";
import LoginAdminUseCasePort from "../../../domain/port/driver/usecase/admin/LoginAdminUseCasePort";

export default class LoginAdminUseCase implements LoginAdminUseCasePort {
  constructor(private readonly adminService: AdminServicePort) {}

  public async execute(adminId: number, password: string): Promise<boolean> {
    return await this.adminService.validatePassword(adminId, password);
  }
}

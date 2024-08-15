import { Request, Response } from "express";
import LoginAdminUseCasePort from "../../../domain/port/driver/usecase/admin/LoginAdminUseCasePort";

export default class AppointmentController {
  constructor(private readonly loginAdminUseCase: LoginAdminUseCasePort) {}

  public async loginAdmin(req: Request, res: Response): Promise<void> {
    const { adminId, password } = req.body;
    const admin = await this.loginAdminUseCase.execute(adminId, password);
    if (admin === false) {
      res.status(400).json({ message: "Error logging in" });
      return;
    }
    res.status(200).json({ message: "Login succesful" });
  }
}

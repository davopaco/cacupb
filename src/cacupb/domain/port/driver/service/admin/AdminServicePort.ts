export default interface AdminServicePort {
  createAdmin(
    adminId: number,
    password: string,
    name: string,
    lastName: string,
    type: string,
    officeId: number
  ): Promise<boolean>;
  validatePassword(adminId: number, password: string): Promise<boolean>;
}

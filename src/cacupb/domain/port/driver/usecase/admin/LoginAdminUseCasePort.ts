export default interface LoginAdminUseCasePort {
  execute(adminId: number, password: string): Promise<boolean>;
}

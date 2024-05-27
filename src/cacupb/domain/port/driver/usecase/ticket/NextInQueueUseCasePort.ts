export default interface NextInQueueUseCasePort {
  execute(adminId: string): Promise<boolean>;
}

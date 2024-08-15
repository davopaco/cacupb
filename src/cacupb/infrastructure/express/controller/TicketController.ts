import { Request, Response } from "express";
import GenerateTicketUseCasePort from "../../../domain/port/driver/usecase/ticket/GenerateTicketUseCasePort";
import GetQueueByOfficeForCustomerUseCasePort from "../../../domain/port/driver/usecase/ticket/GetQueueByOfficeForCustomerUseCasePort";
import GetQueueByOfficeUseCasePort from "../../../domain/port/driver/usecase/ticket/GetQueueByOfficeUseCase";
import GetTicketByIdUseCasePort from "../../../domain/port/driver/usecase/ticket/GetTicketByIdUseCasePort";
import NextInQueueUseCasePort from "../../../domain/port/driver/usecase/ticket/NextInQueueUseCasePort";
import RegisterTicketUseCasePort from "../../../domain/port/driver/usecase/ticket/RegisterTicketUseCasePort";
import ValidateIdsCheckQueueUseCasePort from "../../../domain/port/driver/usecase/ticket/ValidateIdsCheckQueueUseCasePort";

export default class TicketController {
  constructor(
    private readonly generateTicketUseCase: GenerateTicketUseCasePort,
    private getQueueByOfficeForCustomerUseCase: GetQueueByOfficeForCustomerUseCasePort,
    private readonly getQueueByOfficeUseCase: GetQueueByOfficeUseCasePort,
    private readonly getTicketByIdUseCase: GetTicketByIdUseCasePort,
    private readonly nextInQueueUseCase: NextInQueueUseCasePort,
    private readonly registerTicketUseCase: RegisterTicketUseCasePort,
    private readonly validateIdsCheckQueueUseCase: ValidateIdsCheckQueueUseCasePort
  ) {}

  public async generateTicket(req: Request, res: Response): Promise<void> {
    const { customerId, appointmentId } = req.body;
    const ticket = await this.generateTicketUseCase.execute(
      customerId,
      appointmentId
    );
    if (ticket.isNull()) {
      res.status(400).json({ message: "Error generating ticket" });
      return;
    }
    res.status(200).json({ message: "Ticket generated", ticket });
  }

  public async getQueueForCustomer(req: Request, res: Response): Promise<void> {
    const { ticketId, appointmentId } = req.query as { [key: string]: string };
    const queue = await this.getQueueByOfficeForCustomerUseCase.execute(
      ticketId,
      appointmentId
    );
    if (queue.customerTicket.isNull()) {
      res.status(400).json({ message: "Error getting the queue" });
      return;
    }
    res.status(200).json({ message: "Queue retrieved", queue });
  }

  public async getQueueForAdmin(req: Request, res: Response): Promise<void> {
    const { officeId } = req.body;
    const queue = await this.getQueueByOfficeUseCase.execute(officeId);
    if (queue.length === 0) {
      res.status(400).json({ message: "Error getting the queue" });
      return;
    }
    res.status(200).json({ message: "Queue retrieved", queue });
  }

  public async getTicketById(req: Request, res: Response): Promise<void> {
    const { ticketId, officeId } = req.body;
    const ticket = await this.getTicketByIdUseCase.execute(ticketId, officeId);
    if (ticket.isNull()) {
      res.status(400).json({ message: "Error getting the ticket" });
      return;
    }
    res.status(200).json({ message: "Ticket retrieved", ticket });
  }

  public async nextInQueue(req: Request, res: Response): Promise<void> {
    const { adminId } = req.body;
    const ticket = await this.nextInQueueUseCase.execute(adminId);
    if (ticket === false) {
      res.status(400).json({ message: "Error getting the ticket" });
      return;
    }
    res.status(200).json({ message: "Ticket retrieved", ticket });
  }

  public async registerTicket(req: Request, res: Response): Promise<void> {
    const { ticketId, adminId } = req.body;
    const ticket = await this.registerTicketUseCase.execute(ticketId, adminId);
    if (ticket === false) {
      res.status(400).json({ message: "Error registering ticket" });
      return;
    }
    res.status(200).json({ message: "Ticket registered", ticket });
  }

  public async validateIdsCheckQueue(
    req: Request,
    res: Response
  ): Promise<void> {
    const { customerId, appointmentId } = req.body;
    const isValid = await this.validateIdsCheckQueueUseCase.execute(
      customerId,
      appointmentId
    );
    if (isValid === false) {
      res.status(400).json({ message: "The ticket does not exist" });
      return;
    }
    res.status(200).json(isValid);
  }
}

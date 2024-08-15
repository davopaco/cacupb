import { Router } from "express";
import ExpressRouter from "../../../../express/route/ExpressRouter";
import TicketController from "../controller/TicketController";

export default class TicketRouter implements ExpressRouter {
  router: Router;
  path: string;
  version: string;

  constructor(private readonly ticketController: TicketController) {
    this.router = Router();
    this.path = "/cacupb";
    this.version = "/v1.0";
    this.path = `${this.version}${this.path}`;
    this.routes();
  }

  routes = (): void => {
    this.router.post(
      "/tickets/generate",
      this.ticketController.generateTicket.bind(this.ticketController)
    );
    this.router.get(
      "/tickets/queue/customer",
      this.ticketController.getQueueForCustomer.bind(this.ticketController)
    );
    this.router.get(
      "/tickets/queue/admin",
      this.ticketController.getQueueForAdmin.bind(this.ticketController)
    );
    this.router.get(
      "/tickets/get",
      this.ticketController.getTicketById.bind(this.ticketController)
    );
    this.router.post(
      "/tickets/next",
      this.ticketController.nextInQueue.bind(this.ticketController)
    );
    this.router.post(
      "/tickets/register",
      this.ticketController.registerTicket.bind(this.ticketController)
    );
    this.router.post(
      "/tickets/validate",
      this.ticketController.validateIdsCheckQueue.bind(this.ticketController)
    );
  };
}

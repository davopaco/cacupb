import { Router } from "express";
import ExpressRouter from "../../../../express/route/ExpressRouter";
import AppointmentController from "../controller/AppointmentController";

export default class AppointmentRouter implements ExpressRouter {
  router: Router;
  path: string;
  version: string;

  constructor(private readonly appointmentController: AppointmentController) {
    this.router = Router();
    this.path = "/cacupb";
    this.version = "/v1.0";
    this.path = `${this.version}${this.path}`;
    this.routes();
  }

  routes = (): void => {
    this.router.get(
      "/appointments/non-attended",
      this.appointmentController.getNonAttendedAppointments.bind(
        this.appointmentController
      )
    );
  };
}

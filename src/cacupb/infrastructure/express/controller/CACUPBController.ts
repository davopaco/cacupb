import { Request, Response } from "express";
import CancelAppointmentUseCasePort from "../../../domain/port/driver/usecase/CancelAppointmentUseCasePort";
import CreateAppointmentUseCasePort from "../../../domain/port/driver/usecase/CreateAppointmentUseCasePort";
import GetNonAttendedAppointmentsUseCasePort from "../../../domain/port/driver/usecase/GetNonAttendedAppointmentsUseCasePort";
import ValidateIdsChangeAppointmentUseCasePort from "../../../domain/port/driver/usecase/ValidateIdsChangeUseCasePort";
import CustomerAppointment from "../../../domain/model/web/CustomerAppointment";

export default class CACUPBController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCasePort,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCasePort,
    private readonly getNonAttendedAppointmentsUseCase: GetNonAttendedAppointmentsUseCasePort,
    private readonly validateIdsChangeAppointmentUseCase: ValidateIdsChangeAppointmentUseCasePort
  ) {}

  public async createAppointment(req: Request, res: Response): Promise<void> {
    const appointment = await this.createAppointmentUseCase.execute(
      req.body as CustomerAppointment
    );
    if (appointment === false) {
      res.status(400).json({ message: "Error creating the appointment" });
      return;
    }
    res.status(200).json({ message: "Appointment created" });
  }

  public async cancelAppointment(req: Request, res: Response): Promise<void> {
    const { appointmentId, customerId } = req.body;
    const appointmentCanceled = await this.cancelAppointmentUseCase.execute(
      customerId,
      appointmentId
    );
    if (appointmentCanceled === false) {
      res.status(400).json({ message: "Error canceling the appointment" });
      return;
    }
    res.status(200).json({ message: "Appointment canceled" });
  }

  public async getNonAttendedAppointments(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const appointments = await this.getNonAttendedAppointmentsUseCase.execute(
        req.params.status
      );
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
      res.status(200).send(appointments);
    } catch (error) {
      res.status(500).send({ message: "Error generating the report" });
    }
  }

  public async validateIdsChangeAppointment(
    req: Request,
    res: Response
  ): Promise<void> {
    const isValid = await this.validateIdsChangeAppointmentUseCase.execute(
      req.params.customerId,
      req.params.appointmentId
    );
    if (isValid === false) {
      res.status(400).json({ message: "The appointment does not exist" });
      return;
    }
    res.status(200).json(isValid);
  }
}

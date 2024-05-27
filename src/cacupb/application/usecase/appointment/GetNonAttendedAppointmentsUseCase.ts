import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import GetNonAttendedAppointmentsUseCasePort from "../../../domain/port/driver/usecase/appointment/GetNonAttendedAppointmentsUseCasePort";
import PDFCreator from "../../../helper/PDFCreator";

export default class GetNonAttendedAppointmentsUseCase
  implements GetNonAttendedAppointmentsUseCasePort
{
  constructor(
    private readonly appointmentService: AppointmentServicePort,
    private readonly pdfCreator: PDFCreator
  ) {}
  public async execute(): Promise<Buffer> {
    const appointments =
      await this.appointmentService.getAppointmentByNonAttended("3");
    const pdf = await this.pdfCreator.createPDF(appointments);
    return Buffer.from(pdf);
  }
}

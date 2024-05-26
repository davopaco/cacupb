import GetAppointmentsServicePort from "../../domain/port/driver/service/GetAppointmentsServicePort";
import PDFCreator from "../../helper/PDFCreator";

export default class GetNonAttendedAppointmentsUseCase {
  constructor(
    private readonly getAppointmentsService: GetAppointmentsServicePort,
    private readonly pdfCreator: PDFCreator
  ) {}
  public async execute(status: string): Promise<Buffer> {
    const appointments =
      await this.getAppointmentsService.getAppointmentByNonAttended(status);
    const pdf = this.pdfCreator.createPDF(appointments);
    return Buffer.from(JSON.stringify(pdf));
  }
}

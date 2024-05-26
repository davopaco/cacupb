import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Appointment from "../domain/model/appointment/Appointment";

export default class PDFCreator {
  public async createPDF(appointments: Appointment[]): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 900]);
    const { height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const titleFontSize = 24;
    const textFontSize = 12;
    const yOffsetStart = height - 50;
    const lineSpacing = 20;
    let yOffset = yOffsetStart;

    page.drawText("Reporte de citas no asistidas CACUPB", {
      x: 50,
      y: yOffset,
      size: titleFontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= titleFontSize + 10;

    const drawAppointment = (appointment: Appointment, yOffset: number) => {
      const fields = [
        { label: "ID Cita", value: appointment.getId() },
        { label: "ID Usuario", value: appointment.getCustomer().getId() },
        { label: "Nombres", value: appointment.getCustomer().getName() },
        { label: "Apellidos", value: appointment.getCustomer().getLastName() },
        { label: "Dirección", value: appointment.getCustomer().getAddress() },
        { label: "Descripción", value: appointment.getDescription() },
        { label: "Tipo de Cita", value: appointment.getTypeService() },
        { label: "Fecha", value: appointment.getDate().toDateString() },
        { label: "Hora", value: appointment.getTime().toString() },
        { label: "Lugar", value: appointment.getOffice().getName() },
      ];

      fields.forEach((field, index) => {
        page.drawText(`${field.label}:`, {
          x: 50,
          y: yOffset - index * lineSpacing,
          size: textFontSize,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
        page.drawText(`${field.value}`, {
          x: 150,
          y: yOffset - index * lineSpacing,
          size: textFontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      });

      return yOffset - fields.length * lineSpacing - 20;
    };

    appointments.forEach((appointment) => {
      yOffset = drawAppointment(appointment, yOffset);
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }
}

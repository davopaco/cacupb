import ExpressRouter from "../../../express/route/ExpressRouter";
import ValidateService from "../../application/service/ValidateService";
import AppointmentService from "../../application/service/appointment/AppointmentService";
import CustomerService from "../../application/service/customer/CustomerService";
import TicketService from "../../application/service/ticket/TicketService";
import CancelAppointmentUseCase from "../../application/usecase/appointment/CancelAppointmentUseCase";
import ChangeAppointmentUseCase from "../../application/usecase/appointment/ChangeAppointmentUseCase";
import CreateAppointmentUseCase from "../../application/usecase/appointment/CreateAppointmentUseCase";
import GetAllAppointmentsUseCase from "../../application/usecase/appointment/GetAllAppointmentsUseCase";
import GetNonAttendedAppointmentsUseCase from "../../application/usecase/appointment/GetNonAttendedAppointmentsUseCase";
import ValidateIdsChangeAppointmentUseCase from "../../application/usecase/appointment/ValidateIdsChangeAppointmentUseCase";
import PDFCreator from "../../helper/PDFCreator";
import MySqlDBC from "../../util/database/MySqlDBC";
import AppointmentController from "../express/controller/AppointmentController";
import AppointmentRouter from "../express/routes/AppointmentRouter";
import MySQLAppointmentRepository from "../repository/appointment/MySQLAppointmentRepository";
import MySQLCustomerRepository from "../repository/customer/MySQLCustomerRepository";
import MySQLOfficesRepository from "../repository/offices/MySQLOfficeRepository";
import InMemoryTicketRepository from "../repository/ticket/InMemoryTicketRepository";
import PriorityQueue from "../repository/ticket/PriorityQueue";

export default class CACUPBFactory {
  public createRouter(): ExpressRouter {
    //MySQL Connection
    const mySqlConnectionConfig = {
      host: "localhost",
      user: "root",
      password: "River12titopare.",
      database: "CACUPB",
      port: 3306,
    };
    const mySqlDBC = new MySqlDBC(mySqlConnectionConfig);

    //Repositories
    const mySQLCustomerRepository = new MySQLCustomerRepository(mySqlDBC);
    const mySQLOfficesRepository = new MySQLOfficesRepository(mySqlDBC);
    const mySQLAppointmentRepository = new MySQLAppointmentRepository(
      mySqlDBC,
      mySQLCustomerRepository,
      mySQLOfficesRepository
    );
    const priorityQueue = new PriorityQueue();
    const inMemoryTicketRepository = new InMemoryTicketRepository(
      priorityQueue
    );

    //Helpers
    const pdfCreator = new PDFCreator();

    //Services
    const customerService = new CustomerService(
      mySQLAppointmentRepository,
      mySQLCustomerRepository
    );
    const appointmentService = new AppointmentService(
      mySQLAppointmentRepository,
      mySQLCustomerRepository,
      mySQLOfficesRepository,
      customerService
    );
    const ticketService = new TicketService(
      inMemoryTicketRepository,
      appointmentService
    );
    const validateService = new ValidateService(
      mySQLCustomerRepository,
      mySQLOfficesRepository,
      inMemoryTicketRepository,
      mySQLAppointmentRepository
    );

    //UseCases for Appointments
    const cancelAppointmentUseCase = new CancelAppointmentUseCase(
      validateService,
      appointmentService
    );
    const changeAppointmentUseCase = new ChangeAppointmentUseCase(
      appointmentService,
      validateService
    );
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentService
    );
    const getNonAttendedAppointmentsUseCase =
      new GetNonAttendedAppointmentsUseCase(appointmentService, pdfCreator);
    const validateIdsChangeAppointmentUseCase =
      new ValidateIdsChangeAppointmentUseCase(validateService);
    const getAllAppointmentsUseCase = new GetAllAppointmentsUseCase(
      appointmentService
    );

    //UseCases for Tickets
    const 

    //Controllers
    const appointmentController = new AppointmentController(
      createAppointmentUseCase,
      cancelAppointmentUseCase,
      getNonAttendedAppointmentsUseCase,
      validateIdsChangeAppointmentUseCase,
      changeAppointmentUseCase
    );

    return new AppointmentRouter(appointmentController);
  }
}

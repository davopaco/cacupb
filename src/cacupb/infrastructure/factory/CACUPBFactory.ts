import ExpressRouter from "../../../express/route/ExpressRouter";
import ValidateService from "../../application/service/ValidateService";
import AdminService from "../../application/service/admin/AdminService";
import AppointmentService from "../../application/service/appointment/AppointmentService";
import CustomerService from "../../application/service/customer/CustomerService";
import TicketService from "../../application/service/ticket/TicketService";
import LoginAdminUseCase from "../../application/usecase/admin/LoginAdminUseCase";
import CancelAppointmentUseCase from "../../application/usecase/appointment/CancelAppointmentUseCase";
import ChangeAppointmentUseCase from "../../application/usecase/appointment/ChangeAppointmentUseCase";
import CreateAppointmentUseCase from "../../application/usecase/appointment/CreateAppointmentUseCase";
import GetAllAppointmentsUseCase from "../../application/usecase/appointment/GetAllAppointmentsUseCase";
import GetNonAttendedAppointmentsUseCase from "../../application/usecase/appointment/GetNonAttendedAppointmentsUseCase";
import ValidateIdsChangeAppointmentUseCase from "../../application/usecase/appointment/ValidateIdsChangeAppointmentUseCase";
import GenerateTicketUseCase from "../../application/usecase/ticket/GenerateTicketUseCase";
import GetQueueByOfficeForCustomerUseCase from "../../application/usecase/ticket/GetQueueByOfficeForCustomerUseCase";
import GetQueueByOfficeUseCase from "../../application/usecase/ticket/GetQueueByOfficeUseCase";
import GetTicketByIdUseCase from "../../application/usecase/ticket/GetTicketByIdUseCase";
import NextInQueueUseCase from "../../application/usecase/ticket/NextInQueueUseCase";
import RegisterTicketUseCase from "../../application/usecase/ticket/RegisterTicketUseCase";
import ValidateIdsCheckQueueUseCase from "../../application/usecase/ticket/ValidateIdsCheckQueueUseCase";
import BCrypt from "../../helper/BCrypt";
import PDFCreator from "../../helper/PDFCreator";
import MySqlDBC from "../../util/database/MySqlDBC";
import AdminController from "../express/controller/AdminController";
import AppointmentController from "../express/controller/AppointmentController";
import TicketController from "../express/controller/TicketController";
import AdminRouter from "../express/routes/AdminRouter";
import AppointmentRouter from "../express/routes/AppointmentRouter";
import TicketRouter from "../express/routes/TicketRouter";
import MySQLAdminRepository from "../repository/admin/MySQLAdminRepository";
import MySQLAppointmentRepository from "../repository/appointment/MySQLAppointmentRepository";
import MySQLCustomerRepository from "../repository/customer/MySQLCustomerRepository";
import MySQLOfficesRepository from "../repository/offices/MySQLOfficeRepository";
import InMemoryTicketRepository from "../repository/ticket/InMemoryTicketRepository";
import PriorityQueue from "../repository/ticket/PriorityQueue";

export default class CACUPBFactory {
  public createRouters(): ExpressRouter[] {
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
    const mySQLAdminRepository = new MySQLAdminRepository(
      mySqlDBC,
      mySQLOfficesRepository
    );

    //Helpers
    const pdfCreator = new PDFCreator();
    const bCrypt = new BCrypt();

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
      mySQLAppointmentRepository,
      mySQLAdminRepository,
      appointmentService
    );
    const validateService = new ValidateService(
      mySQLCustomerRepository,
      mySQLOfficesRepository,
      inMemoryTicketRepository,
      mySQLAppointmentRepository
    );
    const adminService = new AdminService(
      mySQLAdminRepository,
      mySQLOfficesRepository,
      bCrypt
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
    const generateTicketUseCase = new GenerateTicketUseCase(
      ticketService,
      validateService
    );
    const getQueueByOfficeUseCase = new GetQueueByOfficeUseCase(adminService);
    const getQueueByOfficeForCustomerUseCase =
      new GetQueueByOfficeForCustomerUseCase(ticketService, appointmentService);
    const getTicketByIdUseCase = new GetTicketByIdUseCase(
      ticketService,
      validateService
    );
    const nextInQueueUseCase = new NextInQueueUseCase(ticketService);
    const registerTicketUseCase = new RegisterTicketUseCase(ticketService);
    const validateIdsCheckQueueUseCase = new ValidateIdsCheckQueueUseCase(
      validateService
    );

    //Use Case for Admin
    const loginAdminUseCase = new LoginAdminUseCase(adminService);

    //Controller for Appointments
    const appointmentController = new AppointmentController(
      createAppointmentUseCase,
      cancelAppointmentUseCase,
      getNonAttendedAppointmentsUseCase,
      validateIdsChangeAppointmentUseCase,
      changeAppointmentUseCase,
      getAllAppointmentsUseCase
    );

    //Controller for Tickets
    const ticketController = new TicketController(
      generateTicketUseCase,
      getQueueByOfficeForCustomerUseCase,
      getQueueByOfficeUseCase,
      getTicketByIdUseCase,
      nextInQueueUseCase,
      registerTicketUseCase,
      validateIdsCheckQueueUseCase
    );

    //Controller for Admin
    const adminController = new AdminController(loginAdminUseCase);

    //Routers
    const appointmentRouter = new AppointmentRouter(appointmentController);
    const ticketRouter = new TicketRouter(ticketController);
    const adminRouter = new AdminRouter(adminController);

    return [appointmentRouter, ticketRouter, adminRouter];
  }
}

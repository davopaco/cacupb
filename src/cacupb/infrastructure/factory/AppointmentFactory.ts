import ExpressRouter from "../../../express/route/ExpressRouter";
import ChangeAppointmentService from "../../application/service/ChangeAppointmentService";
import CreateAppointmentService from "../../application/service/CreateAppointmentService";
import GetAppointmentsService from "../../application/service/GetAppointmentsService";
import ValidateService from "../../application/service/ValidateService";
import CancelAppointmentUseCase from "../../application/usecase/CancelAppointmentUseCase";
import ChangeAppointmentUseCase from "../../application/usecase/ChangeAppointmentUseCase";
import CreateAppointmentUseCase from "../../application/usecase/CreateAppointmentUseCase";
import GetNonAttendedAppointmentsUseCase from "../../application/usecase/GetNonAttendedAppointmentsUseCase";
import ValidateIdsChangeAppointmentUseCase from "../../application/usecase/ValidateIdsChangeAppointmentUseCase";
import PDFCreator from "../../helper/PDFCreator";
import MySqlDBC from "../../util/database/MySqlDBC";
import AppointmentController from "../express/controller/AppointmentController";
import AppointmentRouter from "../express/routes/AppointmentRouter";
import MySQLAppointmentRepository from "../repository/appointment/MySQLAppointmentRepository";
import MySQLAppointmentCustomerRepository from "../repository/appointmentCustomer/MySQLAppointmentCustomerRepository";
import MySQLCustomerRepository from "../repository/customer/MySQLCustomerRepository";
import MySQLOfficesRepository from "../repository/offices/MySQLOfficeRepository";

export default class AppointmentFactory {
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
    const mySQLAppointmentCustomerRepository =
      new MySQLAppointmentCustomerRepository(mySqlDBC);

    //Helpers
    const pdfCreator = new PDFCreator();

    //Services
    const createAppointmentService = new CreateAppointmentService(
      mySQLAppointmentRepository,
      mySQLCustomerRepository,
      mySQLOfficesRepository
    );
    const changeAppointmentService = new ChangeAppointmentService(
      mySQLAppointmentRepository,
      mySQLCustomerRepository,
      mySQLOfficesRepository
    );
    const getAppointmentService = new GetAppointmentsService(
      mySQLAppointmentRepository
    );
    const validateService = new ValidateService(
      mySQLAppointmentCustomerRepository
    );

    //UseCases
    const cancelAppointmentUseCase = new CancelAppointmentUseCase(
      validateService,
      changeAppointmentService
    );
    const changeAppointmentUseCase = new ChangeAppointmentUseCase(
      changeAppointmentService,
      validateService
    );
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      createAppointmentService
    );
    const getNonAttendedAppointmentsUseCase =
      new GetNonAttendedAppointmentsUseCase(getAppointmentService, pdfCreator);
    const validateIdsChangeAppointmentUseCase =
      new ValidateIdsChangeAppointmentUseCase(validateService);

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

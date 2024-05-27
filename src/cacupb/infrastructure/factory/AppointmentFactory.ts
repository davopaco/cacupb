import ExpressRouter from "../../../express/route/ExpressRouter";
import ChangeAppointmentService from "../../application/service/appointment/ChangeAppointmentService";
import CreateAppointmentService from "../../application/service/appointment/CreateAppointmentService";
import GetAppointmentsService from "../../application/service/appointment/GetAppointmentsService";
import ValidateService from "../../application/service/appointment/ValidateService";
import CancelAppointmentUseCase from "../../application/usecase/appointment/CancelAppointmentUseCase";
import ChangeAppointmentUseCase from "../../application/usecase/appointment/ChangeAppointmentUseCase";
import CreateAppointmentUseCase from "../../application/usecase/appointment/CreateAppointmentUseCase";
import GetNonAttendedAppointmentsUseCase from "../../application/usecase/appointment/GetNonAttendedAppointmentsUseCase";
import ValidateIdsChangeAppointmentUseCase from "../../application/usecase/appointment/ValidateIdsChangeAppointmentUseCase";
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

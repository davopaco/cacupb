import CreateAppointmentService from "../../../../src/cacupb/application/service/CreateAppointmentService";
import CustomerAppointment from "../../../../src/cacupb/domain/model/web/CustomerAppointment";
import MySQLAppointmentRepository from "../../../../src/cacupb/infrastructure/repository/appointment/MySQLAppointmentRepository";
import MySQLCustomerRepository from "../../../../src/cacupb/infrastructure/repository/customer/MySQLCustomerRepository";
import MySQLOfficesRepository from "../../../../src/cacupb/infrastructure/repository/offices/MySQLOfficeRepository";
import MySqlDBC from "../../../../src/cacupb/util/database/MySqlDBC";
import MySqlConnectionConfig from "../../../../src/cacupb/util/database/types/ConnectionInterface";

describe("CreateAppointmentService", () => {
  let mySqlConnectionConfig: MySqlConnectionConfig;
  let mySQLDBC: MySqlDBC;
  let customerRepository: MySQLCustomerRepository;
  let appointmentRepository: MySQLAppointmentRepository;
  let officeRepository: MySQLOfficesRepository;
  let createAppointmentService: CreateAppointmentService;

  beforeAll(async () => {
    mySqlConnectionConfig = {
      host: "localhost",
      user: "root",
      password: "River12titopare.",
      database: "CACUPB",
      port: 3306,
    };
    mySQLDBC = new MySqlDBC(mySqlConnectionConfig);
    officeRepository = new MySQLOfficesRepository(mySQLDBC);
    customerRepository = new MySQLCustomerRepository(mySQLDBC);
    appointmentRepository = new MySQLAppointmentRepository(
      mySQLDBC,
      customerRepository,
      officeRepository
    );
    createAppointmentService = new CreateAppointmentService(
      appointmentRepository,
      customerRepository,
      officeRepository
    );
  });
  describe("createAppointmentForCustomer", () => {
    it("should create an appointment for a customer", async () => {
      const customerAppointment: CustomerAppointment = {
        name: "John",
        lastName: "Doe",
        customerId: "9739",
        address: "Fake Street 123",
        birthDate: new Date("1990-01-01"),
        place: 1,
        date: new Date("2021-12-12"),
        time: "09:00",
        type: "Devolucion",
        description: "Description",
      };

      const result =
        await createAppointmentService.createAppointmentForCustomer(
          customerAppointment
        );

      expect(result).toBe(true);
    });
  });
});

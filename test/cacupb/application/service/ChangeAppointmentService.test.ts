import ChangeAppointmentService from "../../../../src/cacupb/application/service/ChangeAppointmentService";
import CustomerAppointmentId from "../../../../src/cacupb/domain/model/web/CustomerAppointmentId";
import MySQLAppointmentRepository from "../../../../src/cacupb/infrastructure/repository/appointment/MySQLAppointmentRepository";
import MySQLCustomerRepository from "../../../../src/cacupb/infrastructure/repository/customer/MySQLCustomerRepository";
import MySQLOfficesRepository from "../../../../src/cacupb/infrastructure/repository/offices/MySQLOfficeRepository";
import MySqlDBC from "../../../../src/cacupb/shared/database/MySqlDBC";
import MySqlConnectionConfig from "../../../../src/cacupb/shared/database/types/ConnectionInterface";

describe("ChangeAppointmentService", () => {
  let mySqlConnectionConfig: MySqlConnectionConfig;
  let mySQLDBC: MySqlDBC;
  let customerRepository: MySQLCustomerRepository;
  let appointmentRepository: MySQLAppointmentRepository;
  let officeRepository: MySQLOfficesRepository;
  let changeAppointmentService: ChangeAppointmentService;

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
    changeAppointmentService = new ChangeAppointmentService(
      appointmentRepository,
      customerRepository,
      officeRepository
    );
  });
  describe("createAppointmentForCustomer", () => {
    it("should change an appointment for a customer", async () => {
      const customerAppointment: CustomerAppointmentId = {
        id: "39",
        name: "John",
        lastName: "Doveeee",
        customerId: "9739",
        address: "Fake Street 1234",
        birthDate: new Date("1990-01-01"),
        place: 1,
        date: new Date("2021-12-24"),
        time: "09:00",
        type: "Devolucion",
        description: "Description",
      };

      const result =
        await changeAppointmentService.changeAppointmentForCustomer(
          customerAppointment
        );

      expect(result).toBe(true);
    });
  });
});

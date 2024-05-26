import AbstractAppointment from "../../../../src/cacupb/domain/model/appointment/AbstractAppointment";
import Appointment from "../../../../src/cacupb/domain/model/appointment/Appointment";
import { TypeService } from "../../../../src/cacupb/domain/model/appointment/types/TypeService";
import Customer from "../../../../src/cacupb/domain/model/customer/Customer";
import Office from "../../../../src/cacupb/domain/model/office/Office";
import Time from "../../../../src/cacupb/domain/model/time/Time";
import MySQLAppointmentRepository from "../../../../src/cacupb/infrastructure/repository/appointment/MySQLAppointmentRepository";
import MySQLCustomerRepository from "../../../../src/cacupb/infrastructure/repository/customer/MySQLCustomerRepository";
import MySQLOfficesRepository from "../../../../src/cacupb/infrastructure/repository/offices/MySQLOfficeRepository";
import MySqlDBC from "../../../../src/cacupb/shared/database/MySqlDBC";
import MySqlConnectionConfig from "../../../../src/cacupb/shared/database/types/ConnectionInterface";

describe("MySQLAppointmentRepository", () => {
  let customer: Customer;
  let office: Office;
  let appointment: Appointment;
  let mySqlConnectionConfig: MySqlConnectionConfig;
  let mySQLDBC: MySqlDBC;
  let customerRepository: MySQLCustomerRepository;
  let appointmentRepository: MySQLAppointmentRepository;
  let officeRepository: MySQLOfficesRepository;

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
    customer = await customerRepository.getById(1);
    office = await officeRepository.getById(1);
    appointment = new Appointment(
      customer,
      new Date(),
      new Time("10:00"),
      "DEV" as TypeService,
      1,
      "description",
      1,
      office
    );
  });
  describe("create", () => {
    it("should create an appointment", async () => {
      const creation = await appointmentRepository.create(appointment);
      expect(creation).toBe(true);
    });
  });
  describe("getAll", () => {
    it("should get all appointments", async () => {
      const appointments = await appointmentRepository.getAll();
      expect(appointments).toBeInstanceOf(Array);
    });
  });
  describe("getById", () => {
    it("should get an appointment by id", async () => {
      const appointment = await appointmentRepository.getById(1);
      expect(appointment).toBeInstanceOf(AbstractAppointment);
    });
  });
});

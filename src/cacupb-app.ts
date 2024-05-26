import Express from "./express/Express";
import AppointmentFactory from "./cacupb/infrastructure/factory/AppointmentFactory";

const appointmentFactory = new AppointmentFactory();
const appointmentRouter = appointmentFactory.createRouter();
const cacupbApp = new Express([appointmentRouter]);
cacupbApp.start();

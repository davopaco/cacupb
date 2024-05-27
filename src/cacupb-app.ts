import Express from "./express/Express";
import CACUPBFactory from "./cacupb/infrastructure/factory/CACUPBFactory";

const appointmentFactory = new CACUPBFactory();
const appointmentRouter = appointmentFactory.createRouter();
const cacupbApp = new Express([appointmentRouter]);
cacupbApp.start();

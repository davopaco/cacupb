import Express from "./express/Express";
import CACUPBFactory from "./cacupb/infrastructure/factory/CACUPBFactory";

const appointmentFactory = new CACUPBFactory();
const [appointmentRouter, ticketRouter, adminRouter] =
  appointmentFactory.createRouters();
const cacupbApp = new Express([appointmentRouter, ticketRouter, adminRouter]);
cacupbApp.start();

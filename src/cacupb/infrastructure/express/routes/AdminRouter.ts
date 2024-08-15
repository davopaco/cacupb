import { Router } from "express";
import ExpressRouter from "../../../../express/route/ExpressRouter";
import AdminController from "../controller/AdminController";

export default class AdminRouter implements ExpressRouter {
  router: Router;
  path: string;
  version: string;

  constructor(private readonly adminController: AdminController) {
    this.router = Router();
    this.path = "/cacupb";
    this.version = "/v1.0";
    this.path = `${this.version}${this.path}`;
    this.routes();
  }

  routes = (): void => {
    this.router.post(
      "/admin/login",
      this.adminController.loginAdmin.bind(this.adminController)
    );
  };
}

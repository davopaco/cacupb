import { Router } from "express";

export default class CACUPBFactory {
  public createRouter(): Router {
    return Router();
  }
}

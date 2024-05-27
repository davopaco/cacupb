import Admin from "../../../model/admin/Admin";
import RepositoryPort from "./RepositoryPort";

export default interface AdminRepositoryPort
  extends RepositoryPort<number, Admin> {}

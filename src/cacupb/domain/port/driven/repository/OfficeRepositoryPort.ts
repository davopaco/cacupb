import Office from "../../../model/office/Office";
import RepositoryPort from "./RepositoryPort";

export default interface OfficeRepositoryPort
  extends RepositoryPort<number, Office> {}

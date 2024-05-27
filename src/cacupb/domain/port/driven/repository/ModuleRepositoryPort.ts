import Module from "../../../model/module/Module";

export default interface ModuleRepositoryPort {
  create(module: Module): void;
  delete(id: number): void;
  getById(id: number): Module;
  update(module: Module): void;
  getAll(): Module[];
}

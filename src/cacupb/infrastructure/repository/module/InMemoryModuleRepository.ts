import Module from "../../../domain/model/module/Module";
import NullModule from "../../../domain/model/module/NullModule";
import ModuleRepositoryPort from "../../../domain/port/driven/repository/ModuleRepositoryPort";

export default class InMemoryModuleRepository implements ModuleRepositoryPort {
  private modules: Module[];

  constructor() {
    this.modules = [];
  }

  public create(module: Module): void {
    this.modules.push(module);
  }

  public delete(id: number): void {
    this.modules = this.modules.filter((module) => module.getId() !== id);
  }

  public getById(id: number): Module {
    const module = this.modules.find((module) => module.getId() === id);
    if (!module) {
      return new NullModule();
    }
    return module;
  }

  public update(module: Module): void {
    this.modules = this.modules.map((m) =>
      m.getId() === module.getId() ? module : m
    );
  }

  public getAll(): Module[] {
    return this.modules;
  }
}

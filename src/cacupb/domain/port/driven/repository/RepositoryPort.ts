export default interface RepositoryPort<T, E> {
  create(E: E): Promise<boolean>;
  delete(id: T): Promise<boolean>;
  update(E: E): Promise<boolean>;
  getAll(): Promise<E[]>;
  getById(id: T): Promise<E>;
}

export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: {}): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

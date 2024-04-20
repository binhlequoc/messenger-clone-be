export abstract class Service {
  constructor() {}

  abstract find(filter: Record<string, any>): Promise<any>;
  abstract findOne(filter: Record<string, any>): Promise<any>;
  abstract create(data: Record<string, any>): Promise<any>;
  abstract update(data: Record<string, any>): Promise<any>;
  abstract delete(id: string): Promise<any>;
}

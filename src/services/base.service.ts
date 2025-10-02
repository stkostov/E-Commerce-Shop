import { DataSource, EntityManager, EntityTarget, Repository } from "typeorm";

export abstract class BaseService {
  constructor(private ds: DataSource) {}

  protected rep<T>(entity: EntityTarget<T>, m?: EntityManager): Repository<T> {
    const em = m ?? this.ds.manager
    return em.getRepository<T>(entity)
  }
}
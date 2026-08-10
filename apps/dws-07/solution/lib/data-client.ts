// ── Typed PS.DATA client — SOLUTION-OWNED ────────────────────────────────────
// Thin, typed wrappers over @dbp/ps-data/client so solution pages get
// entity-typed list/get/create/update without restating the entity type string
// at every call site. Add one typed helper per entity as the solution grows.
//
// The platform client is the source of truth; this file only narrows generics.
import {
  listEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  type EntityData,
  type EntityRecord,
  type EntityRef,
  type ListEntitiesOptions,
  type EntityListResult,
} from "@dbp/ps-data/client";

/** List entities of a given type, typed to T. */
export function listEntitiesTyped<T extends EntityData>(
  type: EntityRef,
  options?: ListEntitiesOptions,
): Promise<EntityListResult<T>> {
  return listEntities<T>(type, options ?? {});
}

/** Fetch a single entity by id, typed to T. */
export function getEntityTyped<T extends EntityData>(
  type: EntityRef,
  id: string,
): Promise<EntityRecord<T>> {
  return getEntity<T>(type, id);
}

/** Create an entity, typed to T. */
export function createEntityTyped<T extends EntityData>(
  type: EntityRef,
  data: T,
): Promise<EntityRecord<T>> {
  return createEntity<T>(type, data);
}

/** Patch an entity (PS.DATA update is a PATCH), typed to T. */
export function updateEntityTyped<T extends EntityData>(
  type: EntityRef,
  id: string,
  patch: Partial<T>,
): Promise<EntityRecord<T>> {
  return updateEntity<T>(type, id, patch);
}

/** Delete an entity by id. */
export function deleteEntityTyped(type: EntityRef, id: string): Promise<void> {
  return deleteEntity(type, id);
}

// Per-entity convenience example (uncomment + define your entity data type):
//   export interface TaskData extends EntityData { title: string; status: string; }
//   export const listTasks = (o?: ListEntitiesOptions) => listEntitiesTyped<TaskData>("task", o);

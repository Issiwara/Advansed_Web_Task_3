import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type EntityType = 'vehicle';

export interface BaseEntity {
  id: string;
  type: EntityType;
}

export interface VehicleEntity extends BaseEntity {
  type: 'vehicle';
  make: string;
  model: string;
  year: number;
  tyreSizes: string[]; // e.g. ['205/55R16', '225/45R17']
}

export type Entity = VehicleEntity;

@Injectable({ providedIn: 'root' })
export class EntitiesService {
  private _entities$ = new BehaviorSubject<Entity[]>([
    { id: 'v-1', type: 'vehicle', make: 'Toyota', model: 'Corolla', year: 2018, tyreSizes: ['195/65R15'] },
    { id: 'v-2', type: 'vehicle', make: 'Ford', model: 'F-150', year: 2021, tyreSizes: ['275/65R18'] },
    { id: 'v-3', type: 'vehicle', make: 'Honda', model: 'Civic', year: 2020, tyreSizes: ['205/55R16'] },
    { id: 'v-4', type: 'vehicle', make: 'BMW', model: 'X5', year: 2019, tyreSizes: ['255/50R19'] },
  ]);

  readonly entities$ = this._entities$.asObservable();

  getEntities(): Observable<Entity[]> {
    return this.entities$;
  }

  add(entity: Entity) {
    const current = this._entities$.value;
    this._entities$.next([...current, entity]);
  }

  update(updated: Entity) {
    const current = this._entities$.value.map(e => e.id === updated.id ? updated : e);
    this._entities$.next(current);
  }

  remove(id: string) {
    const current = this._entities$.value.filter(e => e.id !== id);
    this._entities$.next(current);
  }
}

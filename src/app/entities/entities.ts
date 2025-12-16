import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { EntitiesService, Entity } from '../services/entities.service';
import { EntityItem } from './entity-item';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule, EntityItem],
  template: `
    <section class="entities-section">
      <h2>Vehicles</h2>
      <p>List of vehicles (from a service). Click a vehicle to show tyre sizes.</p>

      <div class="entities-grid">
        <app-entity-item *ngFor="let e of entities" [entity]="e" (select)="onSelect($event)"></app-entity-item>
      </div>

      <div *ngIf="selected" class="selected-panel">
        <h3>Selected</h3>
        <pre>{{ selected | json }}</pre>
      </div>
    </section>
  `,
  styles: [
    `.entities-section { padding: 1rem; }`,
    `.entities-section h2 { margin: 0 0 0.25rem 0; color: #33006b; }`,
    `.entities-section p { margin: 0 0 0.75rem 0; color: #444; }`,
    `.entities-grid { display:grid; gap:0.75rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-top:1rem; }`,
    `.selected-panel { margin-top:1rem; padding:0.75rem; border:1px dashed #ccc; background: linear-gradient(90deg,#fff,#fbfbff); border-radius:8px; }`,
    `.selected-panel pre { margin:0; font-size:0.9rem; color:#222; }`,
  ]
})
export class Entities implements OnInit, OnDestroy {
  entities: Entity[] = [];
  selected: Entity | null = null;
  private sub?: Subscription;

  constructor(private svc: EntitiesService) {}

  ngOnInit() {
    this.sub = this.svc.getEntities().subscribe(list => this.entities = list);
  }

  onSelect(e: Entity) {
    this.selected = e;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

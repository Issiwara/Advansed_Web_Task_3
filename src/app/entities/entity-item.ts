import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entity } from '../services/entities.service';

@Component({
  selector: 'app-entity-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="entity" (click)="onClick()" role="button" tabindex="0">
      <div class="vehicle">
        <div class="vehicle-head">
          <strong>{{ raw.make }} {{ raw.model }}</strong>
          <span class="year">{{ raw.year }}</span>
        </div>
        <div class="meta">Tyre sizes:</div>
        <ul class="tyre-list">
          <li *ngFor="let t of raw.tyreSizes">{{ t }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `.entity { padding: 0.75rem; border-radius: 8px; background: linear-gradient(135deg,#fff,#f7f0ff); border:1px solid rgba(0,0,0,0.06); cursor: pointer; box-shadow: 0 2px 6px rgba(34,34,34,0.04); }`,
    `.vehicle-head { display:flex; justify-content:space-between; align-items:center; gap:0.5rem; }`,
    `.year { font-size:0.9rem; color:#666; }`,
    `.meta { color: #666; font-size: 0.9rem; margin-top:0.35rem; }`,
    `.tyre-list { margin:0.5rem 0 0 0; padding:0; list-style:none; }`,
    `.tyre-list li { display:inline-block; margin-right:0.5rem; background: linear-gradient(90deg,#FF8A00,#FF0060); color:#fff; padding:0.25rem 0.5rem; border-radius:4px; font-weight:600; font-size:0.85rem; }`
  ]
})
export class EntityItem {
  @Input() entity!: Entity;
  @Output() select = new EventEmitter<Entity>();
  get raw() { return this.entity as any; }

  onClick() {
    this.select.emit(this.entity);
  }
}

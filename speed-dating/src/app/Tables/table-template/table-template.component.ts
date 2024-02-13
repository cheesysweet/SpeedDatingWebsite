import { Component } from '@angular/core';
import { Tables } from '../Tables';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent {
  public tables: Tables = {
    tableList: [
      { x: 0, y: 0},
      { x: 70, y: 50},
      { x: 20, y: 40},
      { x: 100, y: 50}
    ],
    width: 300,
    height: 150,
    size: 20,
  };

  constructor() {
  }

  public updateTables(event: Tables) {
    this.tables = event;
  }
}

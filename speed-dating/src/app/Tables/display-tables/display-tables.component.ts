import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Table } from '../Table';
import { Tables } from '../Tables';

@Component({
  selector: 'app-display-tables',
  templateUrl: './display-tables.component.html',
  styleUrls: ['./display-tables.component.css'],
})
/**
 * Component to handle displaying a set table-map
 * @input tables - a {@link Tables}
 * @input chosenIndex - a number
 */
export class DisplayTablesComponent implements OnInit, OnChanges {
  @ViewChild('myCanvas') canvasEl: ElementRef | undefined;
  @Output('tableIndex') tableIndex = new EventEmitter<Number>();
  private context: CanvasRenderingContext2D | undefined;
  @Input() tables: Tables | undefined;
  @Input() chosenIndex: number = -1;

  private scaleWidth = 0.0;
  private scaleHeight = 0.0;

  private size: number = 0;

  constructor() {}

  /**
   * Happens when things change
   */
  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.context) return;

    this.canvasEl!!.nativeElement.width = this.tables?.width;
    this.canvasEl!!.nativeElement.height = this.tables?.height;

    this.scaleWidth =
      this.canvasEl!!.nativeElement.clientWidth / this.tables!!.width;
    this.scaleHeight =
      this.canvasEl!!.nativeElement.clientHeight / this.tables!!.height;

    this.size = this.tables!!.size;
    this.clearScreen();
    this.draw();
  }

  ngOnInit(): void {}

  /**
   * Displays the list of gotten tables, and set the one that the user is to be seated at
   */
  ngAfterViewInit() {
    this.context = (
      this.canvasEl!!.nativeElement as HTMLCanvasElement
    ).getContext('2d')!!;

    this.canvasEl!!.nativeElement.width = this.tables?.width;
    this.canvasEl!!.nativeElement.height = this.tables?.height;

    this.scaleWidth =
      this.canvasEl!!.nativeElement.clientWidth / this.tables!!.width;
    this.scaleHeight =
      this.canvasEl!!.nativeElement.clientHeight / this.tables!!.height;

    this.size = this.tables!!.size;

    this.clearScreen();
    this.draw();
  }

  /**
   * Used to accurately get the position of the mouse
   * @param event is the mouseevent
   * @return a Table with x and y set
   */
  private getMousePos(event: any): Table {
    const rect = this.canvasEl!!.nativeElement.getBoundingClientRect();
    return {
      x: event.x - rect.x - this.size / 2,
      y: event.y - rect.y - this.size / 2,
    };
  }

  /**
   * Press a point on the map to get the index of that table
   * @param event is the mouseevent
   */
  public pressTable(event: any): void {
    let newEvent = this.getMousePos(event);
    const newTable = this.isInside(newEvent);
    if (newTable == undefined) return;
    const index = this.tables?.tableList.findIndex((a) => a.x == newTable.x && a.y == newTable.y);
    this.tableIndex.emit(index);
  }

  /**
   * Used to check and get a table that is pointed at by the mouse
   * @param event is the table to get
   * @return a table if there is one, or undefined if not
   */
  private isInside(event: Table): Table | undefined {
    const tab = this.tables?.tableList
      .filter(
        (a: Table) =>
          event.x >= a.x * this.scaleWidth && event.y >= a.y * this.scaleHeight
      )
      .filter(
        (a: Table) =>
          event.x <= a.x * this.scaleWidth + this.size * this.scaleWidth &&
          event.y <= a.y * this.scaleHeight + this.size * this.scaleHeight
      )
      .pop();
    if (tab == undefined) return;
    return tab;
  }

  public updateTables(event: Tables) {
    this.clearScreen();
    this.draw();
  }

  /**
   * Draws all the tables in the tableList to the canvas
   */
  private draw() {
    if (this.tables == undefined || this.context == undefined) return;
    var i = 0;
    this.context.font = "20px Arial"
    for (let each of this.tables.tableList) {
      if (each == undefined) continue;
      let color = !(
        this.tables.tableList.findIndex((a) => a === each) == this.chosenIndex
      )
        ? '#FF0000'
        : '#00FF00';
      this.context.fillStyle = color;
      this.context.fillRect(each.x, each.y, this.size, this.size);
      this.context.fillStyle = '#000000';
      this.context.fillText(i.toString(), each.x + this.size / 2, each.y + this.size / 2);
      i++;
    }
  }

  /**
   * Used to clear the canvas
   */
  private clearScreen() {
    let rect = this.canvasEl?.nativeElement.getBoundingClientRect();
    this.context!!.clearRect(0, 0, rect.width, rect.height);
  }
}

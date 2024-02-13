import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Table } from '../Table';
import { Tables } from '../Tables';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
/**
 * Component to handle creating a map of tables
 * @output tables - a {@link Tables}
 */
export class TableListComponent implements OnInit {
  @Output('tables') getTables: EventEmitter<Tables> =
    new EventEmitter<Tables>();
  @Input() tables: Tables | undefined;
  private tableList: Array<Table> = [];
  /** Template reference to the canvas element */
  public size = 20;

  private temp: Table | undefined;

  /** Canvas 2d context */

  // Canvassize
  public canvaswidth: number = 0;
  public canvasheight: number = 0;
  @ViewChild('myCanvas') canvasEl: ElementRef | undefined;
  private context: CanvasRenderingContext2D | undefined;

  public numTable: number = 3;

  /**
   * Creating all the tables for the tablelist
   */
  constructor(
    private cdref: ChangeDetectorRef,
  ) {
    for (let i = 0; i < this.numTable; i++) {
      this.tableList.push({ x: i, y: i })
    }
    this.numTable = this.tableList.length;
    this.tables = {
      tableList: this.tableList,
      size: this.size,
      width: this.canvaswidth,
      height: this.canvasheight,
    };
  }

  ngOnInit(): void { }

  private test: boolean = false;
  private obs: Observable<any> | undefined = undefined;

  /**
   * After the screen is ready, display the map,
   * also:
   *  sets up the observable for the mouse
   *  sets the this.tables
   */
  ngAfterViewInit() {
    if (this.canvasEl == undefined) return;
    this.context = (
      this.canvasEl.nativeElement as HTMLCanvasElement
    ).getContext('2d')!!;

    if (this.tables == undefined) {
      for (let i = 0; i < this.numTable; i++) {
        this.tableList.push({ x: i, y: i });
      }
      this.canvaswidth = this.canvasEl.nativeElement.clientWidth;
      this.canvasheight = this.canvasEl.nativeElement.clientHeight;
      this.size = 20;
      this.tables = {
        tableList: this.tableList,
        size: this.size,
        width: this.canvaswidth,
        height: this.canvasheight,
      };
    } else {
      this.tableList = this.tables.tableList;
      this.size = this.tables.size;
      this.canvaswidth = this.tables.width;
      this.canvasheight = this.tables.height;
    }
    this.canvasEl.nativeElement.width = this.canvaswidth;
    this.canvasEl.nativeElement.height = this.canvasheight;
    this.numTable = this.tableList.length;

    this.cdref.detectChanges();
    // Redraw the screen
    this.draw();

    this.obs = fromEvent(this.canvasEl?.nativeElement, 'mousemove');
    this.obs.subscribe((event) => {
      if (this.test && this.temp != undefined) {
        const newTable = this.clampTable(this.getMousePos(event));
        if (newTable != undefined) {
          this.temp.x = newTable.x;
          this.temp.y = newTable.y;
          // Clear and redraw the screen
          this.clearScreen();
          this.drawBox(newTable);
          // Redraw the screen
          this.draw();
        }
      }
    });
  }

  /**
   * CLamp the table to inside the square, and to a multiple of 5
   * @param table is the table to clamp
   * @return the table with it's values clamped
   */
  private clampTable(table: Table): Table {
    if (table.y + this.size > this.canvasheight)
      table.y = this.canvasheight - this.size;
    if (table.x + this.size > this.canvaswidth)
      table.x = this.canvaswidth - this.size;
    if (table.y < 0) {
      table.y = 0;
    }
    if (table.x < 0) {
      table.x = 0;
    }
    if (table.x % 5 != 0) {
      table.x -= table.x % 5;
    }
    if (table.y % 5 != 0) {
      table.y -= table.y % 5;
    }
    return table;
  }

  /**
   * Used to change the width of the canvas
   * @param value is the incoming width
   */
  public changeWidth(value: string): void {
    this.canvaswidth = +value;
    this.canvasEl!!.nativeElement.width = this.canvaswidth;
    this.tableList.forEach((a) => {
      if (a.x + this.size > this.canvaswidth) {
        a.x = this.canvaswidth - this.size;
      }
    });
    // Redraw the screen
    this.draw();
    this.tables!!.width = this.canvaswidth;
    this.getTables.emit(this.tables);
  }

  /**
   * Used to change the height of the canvas
   * @param value is the new witdth
   */
  public changeHeight(value: string): void {
    this.canvasheight = +value;
    this.canvasEl!!.nativeElement.height = this.canvasheight;
    this.tableList.forEach((a) => {
      if (a.y + this.size > this.canvasheight) {
        a.y = this.canvasheight - this.size;
      }
    });
    // Redraw the screen
    this.draw();
    this.tables!!.height = this.canvasheight;
    this.getTables.emit(this.tables);
  }

  /**
   * Used to change the number of tables in the tableList
   * @param value is the number of new tables to use
   */
  public changeTableList(value: string): void {
    const num: number = +value;
    this.numTable = num;
    this.cdref.detectChanges();
    if (num > this.tableList.length) {
      this.tableList.push({ x: 0, y: 0 });
    } else {
      this.tableList.pop();
    }

    // Clear and redraw the screen
    this.clearScreen();
    this.draw();
    this.tables!!.tableList = this.tableList;
    this.getTables.emit(this.tables);
  }

  /**
   * Used to change the size of the tables
   * @param value is the new size of the tables
   */
  public changeTableSize(value: string): void {
    const num: number = +value;
    this.size = num;
    this.tableList.forEach((a) => {
      this.clampTable(a);
    });
    // Clear and redraw the screen
    this.clearScreen();
    this.draw();
    this.tables!!.size = this.size;
    this.getTables.emit(this.tables);
  }

  /**
   * Used to start the movement of a table
   * @param event is the mouseevent
   */
  public move(event: any): void {
    this.test = true;
    let newEvent = this.getMousePos(event);
    const newTable = this.isInside(newEvent);
    if (newTable != undefined) {
      this.temp = newTable;
    }
  }

  /**
   * Used to finish moving a table
   */
  public finishMove(): void {
    if (this.temp == undefined) return;
    this.tableList.push(this.temp!!);
    this.temp = undefined;
    this.test = false;
    // Add the new tableList and send it upwards
    this.tables!!.tableList = this.tableList;
    this.getTables.emit(this.tables);

    // Clear and redraw the screen
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
   * Used to check and get a table that is pointed at by the mouse
   * @param event is the table to get
   * @return a table if there is one, or undefined if not
   */
  private isInside(event: Table): Table | undefined {
    const tab = this.tableList
      .filter((a: Table) => event.x >= a.x && event.y >= a.y)
      .filter(
        (a: Table) => event.x <= a.x + this.size && event.y <= a.y + this.size
      )
      .pop();
    if (tab == undefined) return;
    this.tableList.splice(this.tableList.indexOf(tab!!), 1);
    return tab;
  }

  /**
   * Paint a single given table
   * @param event is the table to draw
   */
  private drawBox(event: Table) {
    let rect = this.canvasEl?.nativeElement.getBoundingClientRect();
    this.context!!.clearRect(0, 0, rect.width, rect.height);
    let color = '#FF0000';
    this.context!!.fillStyle = color;
    this.context!!.fillRect(event.x, event.y, this.size, this.size);
  }

  /**
   * Draws all the tables in the tableList to the canvas
   */
  private draw(): void {
    for (let each of this.tableList) {
      if (each == undefined) continue;
      let color = '#FF0000';
      this.context!!.fillStyle = color;
      this.context!!.fillRect(each.x, each.y, this.size, this.size);
    }
  }

  /**
   * Used to clear the canvas
   */
  private clearScreen(): void {
    let rect = this.canvasEl?.nativeElement.getBoundingClientRect();
    this.context!!.clearRect(0, 0, rect.width, rect.height);
  }
}

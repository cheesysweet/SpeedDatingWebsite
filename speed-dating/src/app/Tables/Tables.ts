import { Table } from "./Table";

/**
 * Interface to hold all the tables of a specified location
 */
export interface Tables {
  tableList: Array<Table>,
  size: number,
  width: number,
  height: number,
}

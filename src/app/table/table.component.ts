import {Component, OnInit, ViewChild, Input, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ColDef, RowDef } from './table.interface';
import { BaseRowDef } from '@angular/cdk/table';
import { stringify } from 'querystring';
import {TooltipPosition} from '@angular/material/tooltip';
import { UserData } from '../main/main.component';



@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class TableComponent implements OnInit {

  @Input()
  columnDef: ColDef[];

  @Input()
  rows: any[];

  @Input()
  complexView : boolean;

  displayedColumns: string[]; 
  dataSource: MatTableDataSource<UserData>; 
  selectedColumn: string;
  selectedRows: RowDef[] = [];
 // complexView$ : boolean;

 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {  }

  ngOnInit() {
    this.dataSource= new MatTableDataSource(this.rows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columnDef.reduce((acc,key)=>acc.concat(key.name),[]);
  //  this.complexView$ = this.complexView;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  columnName(column:ColDef) {
     return column.name;
  }

  FilledCell(column: string, id: any): boolean{  //окрашивание все ячеек
    if ( this.columnDef.find(c=>c.name == column).isSelectable)
    {
      if (this.selectedRows.some(c=>c.idRow==id) && this.selectedColumn==column)   return false;
      else  if(this.selectedColumn==null || this.selectedRows.length==0)   return true;
            else  if (this.selectedRows.some(c=>c.idRow==id) || this.selectedColumn==column) return true;
                  else return false
    }     
    else return false;
  }

  FilledSelectedCell(column:string, id: any){ //окрашивание выбранной чейки
    if (this.columnDef.find(c=>c.name == column).isSelectable && this.selectedRows.some(c=>c.idRow==id) && this.selectedColumn==column)
      return true;
    else return false;
  }

  SelectedCell(id:any,column: string) {  //выбор ячейки
    if (this.columnDef.find(c=>c.name == column).isSelectable){
      if (this.selectedColumn!=column || this.selectedColumn==null){
          this.selectedColumn = column;
          this.selectedRows = [];
          this.selectedRows.push({idRow:id, color:this.generateColor()}); 
        }
      else 
      if (!this.selectedRows.some(c=>c.idRow==id)) this.selectedRows.push({idRow:id, color:this.generateColor()});
      else { this.selectedRows.splice(this.selectedRows.findIndex(c=>c.idRow==id),1);}
    }   
  }   

   generateColor() { //генерирует цвета
    let color:string = "#9ACD32";    
    while(this.selectedRows.some(c=>c.color==color))
    color = '#' + Math.floor(Math.random()*16777215).toString(16);
    return color;
  }

  SelectedRow(id:any):boolean{ //проверяет выбрана ли строка 
    if(this.selectedRows.some(c=>c.idRow==id)) return true;
    else return false;
  }

  getColorRow(id:any):string{
    return this.selectedRows.find(c=>c.idRow==id).color;
  }


}



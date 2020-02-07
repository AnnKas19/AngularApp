import { Component } from '@angular/core';
import { ColDef } from './table/table.interface';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  complexValue: string;
}

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  readonly users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
  check : boolean = false;

  columnDef: ColDef[] = [
    {
      name: 'id',
      label: 'ID',
      isSelectable: false
    },
    {
      name: 'name',
      label: 'Name',
      isSelectable: true
    },
    {
      name: 'progress',
      label: 'Progress',
      isSelectable: true
    },
    {
      name: 'color',
      label: 'Color',
      isSelectable: true
    }
  ]

  private createNewUser(id: number): UserData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
      complexValue : "t"+Math.round(Math.random() * 100).toString()+"%"
    };
  }
}

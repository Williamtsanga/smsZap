import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  contact: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Thomas', contact: 933499493},
  {name: 'Brain', contact: 65456789},
  {name: 'Lacose', contact: 876545678},
  {name: 'Aerly', contact: 3455437657},
  {name: 'Thomas', contact: 933499493},
  {name: 'Brain', contact: 65456789},
  {name: 'Lacose', contact: 876545678},
  {name: 'Aerly', contact: 3455437657},
  {name: 'Thomas', contact: 933499493},
  {name: 'Brain', contact: 65456789},
  {name: 'Lacose', contact: 876545678},
  {name: 'Aerly', contact: 3455437657},
  {name: 'Thomas', contact: 933499493},
  {name: 'Brain', contact: 65456789},
  {name: 'Lacose', contact: 876545678},
  {name: 'Aerly', contact: 3455437657},
];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'contact'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
  }

  filtercontacts(filterData: string){
    this.dataSource.filter = filterData.trim().toLowerCase();
  }

}

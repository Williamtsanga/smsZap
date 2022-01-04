import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';

export interface SmsMessages {
  to: number;
  content: string;
  date: string;
}

const ELEMENT_DATA: SmsMessages[] = [
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '12-04-2021'},
  {to: 67898765678, content: ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit inorum.', date: '13-08-2022'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},
  {to: 67898765678, content: 'Lorem ipsum dolor sit amet, consectetur ansequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt iest laborum.', date: '04-04-2019'},

];

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  displayedColumns: string[] = ['to', 'content', 'date'];
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

  filtermessages(filterData: string){
    this.dataSource.filter = filterData.trim().toLowerCase();
  }
}

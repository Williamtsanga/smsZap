import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import { MessageService } from '../../services/message.service'
import {MessageInterface} from '../../message-interface'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: MessageInterface[] = [];
  displayedColumns: string[] = ['to', 'content', 'date'];
  dataSource = new MatTableDataSource(this.messages);

  constructor(private _liveAnnouncer: LiveAnnouncer, private MessageService: MessageService) {}

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
    this.MessageService.getMessages().subscribe((data) => {console.log(data)})
    this.dataSource = new MatTableDataSource(this.messages);
  }

  filtermessages(filterData: string){
    this.dataSource.filter = filterData.trim().toLowerCase();
  }
}

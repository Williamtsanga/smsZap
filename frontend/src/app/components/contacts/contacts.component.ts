import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import { ContactService } from '../../services/contact.service'
import { ContactInterface } from '../../contact-interface'


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  contacts: ContactInterface[] = [];

  displayedColumns: string[] = ['name', 'phone_number'];
  dataSource = new MatTableDataSource(this.contacts);


  constructor(private _liveAnnouncer: LiveAnnouncer, private contactService: ContactService) {}

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
    this.contactService.getContacts().subscribe((contacts) => {this.contacts = contacts})
    this.dataSource = new MatTableDataSource(this.contacts);
  }

  filtercontacts(filterData: string){
    this.dataSource.filter = filterData.trim().toLowerCase();
  }

  deleteContact(phone_number: string, name: string){
    const contact: ContactInterface = {
      name: name,
      phone_number: Number(phone_number)
    }
    this.contactService.deleteContact(contact).subscribe((contact) => {console.log(contact)})
    }

}

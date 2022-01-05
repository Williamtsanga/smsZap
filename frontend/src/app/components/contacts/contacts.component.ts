import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import { ContactService } from '../../services/contact.service'
import { ContactInterface } from '../../contact-interface'

export interface Cinterface {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  contacts: Cinterface[] = [];

  displayedColumns: string[] = ['name', 'phone'];
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
    this.contactService.getContacts().subscribe((data: any) => {
      let i = 0;
      for(let item of data){
        let x = {
          name: item.name,
          phone: item.phone
        };
        this.contacts[i] = {name: item.name, phone: item.phone};
        i = i + 1;
      }
    console.log(this.contacts)
    this.dataSource = new MatTableDataSource(this.contacts);
  }
    );
  }

  filtercontacts(filterData: string){
    this.dataSource.filter = filterData.trim().toLowerCase();
  }

  deleteContact(phone: string, name: string){
    // const contact: any = {
    //   name: name,
    //   phone_number: Number(phone_number)
    // }
    // this.contactService.deleteContact(contact).subscribe((data) => {console.log(data)})
    }

}

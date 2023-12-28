import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../index';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserdetailsService } from 'src/app/userdetails.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  elementData: PeriodicElement[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['index', 'firstname', 'lastname', 'email', 'phonenumber', 'action'];
  dataSource: any;

  constructor(private router: Router,
    private userDetailsService: UserdetailsService) {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.getUserDetails();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return (
        data.firstname.toLowerCase().includes(filter) ||
        data.lastname.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter)
      );
    };
  }

  getUserDetails() {
    this.userDetailsService.data$.subscribe(data => {
      this.elementData = data;
    });
  }

  addUser(value: string) {
    this.router.navigate(['user/add-user'], { queryParams: { status: value } })
  }

  onEdit(element: PeriodicElement, index: any) {
    const jsonString = JSON.stringify(element);
    localStorage.setItem('user', jsonString);
    this.router.navigate(['user/edit-user'], { queryParams: { id: index } })
  }

  onDelete(index: any) {
    this.router.navigate(['user/delete-user'], { queryParams: { id: index } })
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdetailsService } from 'src/app/userdetails.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  userId: number;
  constructor(private activatedRoute: ActivatedRoute,
    private userDetailsService: UserdetailsService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
  }

  deleteUser() {
    this.userDetailsService.deleteRow(this.userId);
    this.router.navigate(['dashboard']);
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }
}

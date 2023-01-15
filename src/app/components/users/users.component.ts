import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading: boolean = false;

  users: any[] = [];
  scores: any[] = [1, 2, 3, 4, 5];

  total: number = 0;
  page: number = 1;
  per_page: number = 10;

  order: 'desc' | 'asc' = 'desc';
  sort: 'followers' | 'repositories' | 'joined' = 'followers';
  search = '';

  constructor(private _userService: UsersService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.loading = true;
    this._userService.listUsers(this.per_page, this.page, this.order, this.sort, this.search ? this.search : undefined).subscribe((response: any) => {
      this.users = response.items;
      this.total = response.total_count;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  pageChanged(page: number) {
    this.page = page;
    this.listUsers();
  }

}

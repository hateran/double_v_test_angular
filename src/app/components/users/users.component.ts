import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Toast } from 'bootstrap';

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
  final_page: number = 1;

  order: 'desc' | 'asc' = 'desc';
  sort: 'followers' | 'repositories' | 'joined' = 'followers';
  search = '';

  constructor(
    private _router: Router,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.loading = true;
    this._userService.listUsers(this.per_page, this.page, this.order, this.sort, this.search ? this.search : undefined).subscribe((response: any) => {
      this.users = response.items;
      this.total = response.total_count;
      this.final_page = Math.ceil(this.total / this.per_page);
      this.loading = false;
    }, error => {
      if (error.error.message.includes("API rate limit")) {
        this.showToastr();
      }
      this.loading = false;
    });
  }

  showToastr() {
    const toastLiveExample = document.getElementById('liveToast');

    if (toastLiveExample) {
      const toast = new Toast(toastLiveExample);
      toast.show();
    }
  }

  pageChanged(page: number) {
    this.page = page;
    this.listUsers();
  }

  sortChanged(option: 'followers' | 'repositories' | 'joined') {
    this.sort = option;
    this.listUsers();
  }

  orderChanged(option: 'desc' | 'asc') {
    this.order = option;
    this.listUsers();
  }

  navigateProfile(id: number) {
    this._router.navigate([`users/${id}`]);
  }

}

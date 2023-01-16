import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  @Input() login: string = '';
  loading: boolean = false;

  repos: any[] = [];

  page: number = 1;
  per_page: number = 10;

  direction: 'asc' | 'desc' = 'desc';
  sort: 'created' | 'updated' | 'pushed' | 'full_name' = 'created';
  type: 'all' | 'owner' | 'member' = 'all';

  constructor(private _userService: UsersService) { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];

      if (propName == 'login') {
        this.login = chng.currentValue;
      }
    }
  }

  ngOnInit(): void {
    this.listRepos();
  }

  listRepos() {
    this.loading = true;
    this._userService.listRepos(this.login, this.per_page, this.page, this.direction, this.sort, this.type).subscribe((response: any) => {
      this.repos = response;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}

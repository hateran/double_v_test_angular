import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  @Input() login: string = '';
  loading: boolean = false;

  followers: any[] = [];

  page: number = 1;
  per_page: number = 10;

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
    this.listFollowers();
  }

  listFollowers() {
    this.loading = true;
    this._userService.listFollowers(this.login, this.per_page, this.page).subscribe((response: any) => {
      this.followers = response;
      console.log(this.followers)
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  @Input() login: string = '';
  loading: boolean = false;

  organizations: any[] = [];

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
    this.listOrgs();
  }

  listOrgs() {
    this.loading = true;
    this._userService.listOrgs(this.login, this.per_page).subscribe((response: any) => {
      this.organizations = response;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}

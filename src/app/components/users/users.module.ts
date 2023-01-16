import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FollowersComponent } from './profile/followers/followers.component';
import { OrganizationsComponent } from './profile/organizations/organizations.component';
import { ReposComponent } from './profile/repos/repos.component';


@NgModule({
  declarations: [UsersComponent, ProfileComponent, FollowersComponent, OrganizationsComponent, ReposComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }

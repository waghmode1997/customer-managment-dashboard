import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import {MaterialModule} from '../material.module';
import {UserComponent} from './user/user.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  declarations: [UserComponent, UserDeleteComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule,
  ]
})
export class PageModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import {UserDeleteComponent } from './user-delete/user-delete.component';

const routes: Routes = [{path:'add-user',component:UserComponent},
{path:'edit-user',component:UserComponent},
{path:'delete-user',component:UserDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

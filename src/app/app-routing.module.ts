import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  {
    path: 'users',
    title: 'Giva hiring assignment | Users',
    component:UserManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

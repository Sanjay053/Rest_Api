import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:'userlist', component:UserlistComponent},
  { path: 'add', component: AddUserComponent },
  { path: 'update/:userId', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

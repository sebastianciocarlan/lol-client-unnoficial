import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { InitComponent } from './init/init.component';
import { ClientComponent } from './client/client.component';



const routes: Routes = [
  {
    path: '',
    component:InitComponent,
    pathMatch: 'full'
  },
  {
    path: 'init',
    component:InitComponent,
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

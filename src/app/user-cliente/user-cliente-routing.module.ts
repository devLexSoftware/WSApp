import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserClientePage } from './user-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: UserClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserClientePageRoutingModule {}

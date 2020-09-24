import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoInfoPage } from './empleado-info.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoInfoPageRoutingModule {}

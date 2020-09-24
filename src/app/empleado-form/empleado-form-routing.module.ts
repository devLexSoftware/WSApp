import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoFormPage } from './empleado-form.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoFormPageRoutingModule {}

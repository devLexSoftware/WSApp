import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvanceFormPage } from './avance-form.page';

const routes: Routes = [
  {
    path: '',
    component: AvanceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvanceFormPageRoutingModule {}

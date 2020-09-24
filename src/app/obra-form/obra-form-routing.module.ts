import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObraFormPage } from './obra-form.page';

const routes: Routes = [
  {
    path: '',
    component: ObraFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObraFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvanceInfoPage } from './avance-info.page';

const routes: Routes = [
  {
    path: '',
    component: AvanceInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvanceInfoPageRoutingModule {}

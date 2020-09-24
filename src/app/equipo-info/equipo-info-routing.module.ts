import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoInfoPage } from './equipo-info.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoInfoPageRoutingModule {}

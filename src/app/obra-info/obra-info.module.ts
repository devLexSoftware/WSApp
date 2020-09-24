import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObraInfoPageRoutingModule } from './obra-info-routing.module';

import { ObraInfoPage } from './obra-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObraInfoPageRoutingModule
  ],
  declarations: [ObraInfoPage]
})
export class ObraInfoPageModule {}

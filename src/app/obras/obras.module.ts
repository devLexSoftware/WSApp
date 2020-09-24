import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObrasPageRoutingModule } from './obras-routing.module';

import { ObrasPage } from './obras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObrasPageRoutingModule
  ],
  declarations: [ObrasPage]
})
export class ObrasPageModule {}

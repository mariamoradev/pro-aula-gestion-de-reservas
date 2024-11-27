import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortadminPageRoutingModule } from './portadmin-routing.module';

import { PortadminPage } from './portadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortadminPageRoutingModule
  ],
  declarations: [PortadminPage]
})
export class PortadminPageModule {}

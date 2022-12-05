import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { ApprovedPage } from './approved.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedPageRoutingModule {}

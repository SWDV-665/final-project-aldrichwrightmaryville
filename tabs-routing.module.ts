import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageModule } from '../about/about.module';
import { ContactPageModule } from '../contact/contact.module';
import { HomePageModule } from '../home/home.module';
import { ApprovedPageModule } from '../approved/approved.module';
import { DetailPageModule } from '../detail/detail.module'; 
import { RejectedPageModule } from '../rejected/rejected.module';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'About',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'Contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'Approved',
        loadChildren: () => import('../approved/approved.module').then(m => m.ApprovedPageModule)
      },
      {
        path: 'Rejected',
        loadChildren: () => import('../rejected/rejected.module').then(m => m.RejectedPageModule)
      },
      /*,
      {
        path: 'Detail',
        loadChildren: () => import('../detail/detail.module').then(m => m.DetailPageModule)
      },*/
     {
        path: '',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

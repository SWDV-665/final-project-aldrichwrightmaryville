import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TimesheetServiceService } from '../../Providers/timesheet-service-service/timesheet-service.service';
import { InputDialogServiceService } from '../../Providers/input-dialog-service/input-dialog-service.service';
import { ApprovedPage} from '../approved/approved.page'
import { DetailPage } from '../detail/detail.page'; 
import { RejectedPage} from '../rejected/rejected.page';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

/*import { SocialShareComponent } from '../components/social-share/social-share.component';*/

interface Timesheet {
  timeSheetId: number;
  status: string;
  FirstName: string;
  LastName: string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  

/*constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: TimesheetServiceService, public inputService: InputDialogServiceService, public pageReject: RejectedPage, public pageApprove: ApprovedPage )  { }*/
constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: TimesheetServiceService, public inputService: InputDialogServiceService, public router: Router, public http: HttpClient )  { }

  ngOnInit() {
  }
  loadItem()
  { 
    return this.dataService.getItems();
  }

  

  loadRejectedItem()
  {
    return this.dataService.getRejectedItems();
  }
  /*async removeItem(grocery: any, index: number) {
      const toast = await  this.toastCtrl.create({
      message: 'Removing Grocery Item - ' + grocery.Item + " with Quantity " + grocery.Quantity + " at  index " + index + " ...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
   
  }*/

  
  approveItem(item: Timesheet, index: number)
  {
    console.log('Approving Item, item, index');
    this.dataService.ApproveItem(index);
    this.router.navigateByUrl('/tabs/Approved');
    /*this.navCtrl.navigateForward('/ApprovedPage')*/
  }
  rejectItem(item: Timesheet, index: number)
  {
    this.dataService.RejectItem(index);
    console.log('Reject Item, item, index')
    /*this.router.navigateByUrl('/tabs/Rejected');*/
    /*this.navCtrl.navigateForward('/RejectPage')*/
  }
 
 

}

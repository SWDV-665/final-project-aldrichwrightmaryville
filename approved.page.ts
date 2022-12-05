import { Component, OnInit } from '@angular/core';
import { TimesheetServiceService } from '../../Providers/timesheet-service-service/timesheet-service.service';
import { InputDialogServiceService } from '../../Providers/input-dialog-service/input-dialog-service.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 

interface Timesheet {
  timeSheetId: number;
  status: string;
  FirstName: string;
  LastName: string
};

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: TimesheetServiceService, public inputService: InputDialogServiceService, public router:Router ) { }

  ngOnInit() {
  }

  UndoApproveItem(item: Timesheet, index: number)
  {
    console.log('Undoing Approval for  Item, item, index');
    this.dataService.undoApproveItem(index);
    this.router.navigateByUrl('/tabs/Home');
    /*this.navCtrl.navigateForward('/ApprovedPage')*/
  }
  loadApprovedItem()
  {
    return this.dataService.getApprovedItems();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
/*import {XMLHttpRequest} from 'xmlhttprequest';*/
/*import { InputDialogServiceService } from './input-dialog-service.service';*/


export class timesheetClass {
  status: string;
  timeSheetId: number;
  FirstName: string;
  LastName: string;
  constructor(status: string,timeSheetId: number, FirstName: string, LastName: string )
  {
    this.status = status;
    this.timeSheetId = timeSheetId;
    this.FirstName = FirstName;
    this.LastName = LastName;

  }
}

let apiURL = 'http://localhost:5000';
 let timesheet: Timesheet[] =  []
 /*let Approvedtimesheet: Timesheet[] =  [{"timeSheetId": 3, "status": "Approved", "FirstName": "Jim", "LastName": "Smith"}]*/
 let Approvedtimesheet: Timesheet[] =  []
 let Rejectedtimesheet: Timesheet[] =  []


 let stop: boolean = false;
let stopApproved: boolean = false;
let stopRejected: boolean = false;

 interface Timesheet { 
  status: string;
  timeSheetId: number;
  FirstName: string;
  LastName: string
}; 

 @Injectable({
  providedIn: 'root'
})


export class TimesheetServiceService {
 
  
  
      
  
  
   
  constructor(public http: HttpClient) { 
    

    
     
  }
 
  loadRejectedItem()
  {
    { console.log("Loaditems")
        stopRejected = false;
        return this.getRejectedItems();      
 


    }
  } 
  
  RejectItem(index: number)
  {
    {
      let timesheetNo =  timesheet[index].timeSheetId;
     { 
       var xhr = new XMLHttpRequest();
       var url:string = "http://localhost:5000/TimeSheet/Reject/"+timesheetNo;
       try{
         xhr.open("PUT",url,false);
         xhr.send( null );                 
       }
       catch(error)
             { 
               console.log("Error");         
               return Rejectedtimesheet;
             }
  
       Rejectedtimesheet = [];
       timesheet = [];
       stopRejected = false;
       stop=false;
       Rejectedtimesheet = this.loadRejectedItem();      
       timesheet = this.loadItems();
 
       return Rejectedtimesheet;
   }
  
   }  

  } 
 undoRejectItem(index: number)
 {
  // let length =Approvedtimesheet.push(timesheet[index]);
 //  Approvedtimesheet[length-1].status="Approved";
   
  let timesheetNo =  Rejectedtimesheet[index].timeSheetId;

   { 
     console.log("Rejected Item no")
     console.log(timesheetNo)
     var xhr = new XMLHttpRequest();
     var url:string = "http://localhost:5000/TimeSheet/Reset/"+timesheetNo;
     try{
       xhr.open("PUT",url,false);
       xhr.send( null );                 
     }
     catch(error)
           {  
             console.log("Error")        
             return Rejectedtimesheet;
           }
   
     Rejectedtimesheet = [];
     timesheet = [];
     stopRejected = false;
     stop=false;
     Rejectedtimesheet = this.loadRejectedItem();
     console.log
     timesheet = this.loadItems();
     return Rejectedtimesheet; 
 
 }
 }
  



getDetailItems()
{

}

undoApproveItem(index: number)
{
 // let length =Approvedtimesheet.push(timesheet[index]);
//  Approvedtimesheet[length-1].status="Approved";
  
 let timesheetNo =  Approvedtimesheet[index].timeSheetId;
 console.log(timesheetNo)
  { 
    var xhr = new XMLHttpRequest();
    var url:string = "http://localhost:5000/TimeSheet/Reset/"+timesheetNo;
 
    try{
      xhr.open("PUT",url,false);
      xhr.send( null );                 
    }
    catch(error)
          {          
            return Approvedtimesheet;
          }
    Approvedtimesheet = [];
    timesheet = [];
    stopApproved = false;
    stop=false;
    Approvedtimesheet = this.loadApprovedItems();
    timesheet = this.loadItems();
    return Approvedtimesheet; 

}
}

 ApproveItem(index: number)
  {
     let timesheetNo =  timesheet[index].timeSheetId;
    { 
      var xhr = new XMLHttpRequest();
      var url:string = "http://localhost:5000/TimeSheet/Approve/"+timesheetNo;
      try{
        xhr.open("PUT",url,false);
        xhr.send( null );                 
      }
      catch(error)
            { 
              console.log("Error");         
              return Approvedtimesheet;
            }
      Approvedtimesheet = [];
      timesheet = [];
      stopApproved = false;
      stop=false;
      Approvedtimesheet = this.loadApprovedItems();      
      timesheet = this.loadItems();

      return Approvedtimesheet;
  }
 
  } 

 

  loadItems()
  {    
      stop === false;      
      return this.getItems();    
  }


  
  loadApprovedItems()
    { stopApproved = false;
      return this.getApprovedItems();}

getItems()
{ 
//  console.log("stop:")
//  console.log(stop);
  var xhr = new XMLHttpRequest();
  var url:string = "http://localhost:5000/TimeSheetUser";
  if (stop === false)
  {
  try{
    xhr.open("GET",url,false);
    xhr.send( null );
    var timesheetinfoString:any = xhr.responseText;  
    var timesheetinfo = JSON.parse(timesheetinfoString);

  

    //for (const [index, element] of timesheetinfo.entries()) {
    //  console.log(element)
    //}
   
    for (const key in timesheetinfo)
    {
     
      length = timesheet.push(timesheetinfo[key]);      
    }   
       
    stop = true;
 
        
  }
  catch(error)
        {    
              
          return timesheet;
        }
  }

  
  return timesheet;

}
/*
}
*/
/*private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}*/


getApprovedItems()
{ 
  console.log("stopApproved:")
  console.log(stopApproved);
  var xhr = new XMLHttpRequest();
  var url:string = "http://localhost:5000/TimeSheetUserApproved";
  if (stopApproved === false)
  {
  try{
    xhr.open("GET",url,false);
    xhr.send( null );
    var timesheetinfoString:any = xhr.responseText;  
    var timesheetinfo = JSON.parse(timesheetinfoString);

  

    //for (const [index, element] of timesheetinfo.entries()) {
    //  console.log(element)
    //}
   
    for (const key in timesheetinfo)
    {
     
      length = Approvedtimesheet.push(timesheetinfo[key]);      
    }   
       
    stopApproved = true;
 
        
  }
  catch(error)
        {    
              
          return Approvedtimesheet;
        }
  }

 
  return Approvedtimesheet;

}




getRejectedItems()
{ 
  console.log("stopRejected:")
  console.log(stopRejected);
  var xhr = new XMLHttpRequest();
  var url:string = "http://localhost:5000/TimeSheetUserRejected";
  if (stopRejected === false)
  {
    try{
      xhr.open("GET",url,false);
      xhr.send( null );
      var timesheetinfoString:any = xhr.responseText;  
      var timesheetinfo = JSON.parse(timesheetinfoString);
   
      for (const key in timesheetinfo)
      {     
        length = Rejectedtimesheet.push(timesheetinfo[key]);      
      }          
      stopRejected = true;
      return Rejectedtimesheet;
         
    }
  catch(error)
        {    
              
          return Rejectedtimesheet;
        }
  }

  
  return Rejectedtimesheet;

}
}

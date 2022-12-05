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
from urllib import response
from flask import Flask, Response
from flask import abort, jsonify, render_template, url_for
from flask.views import View
from werkzeug.routing import Rule
from pymongo import MongoClient,ReturnDocument
from flask_cors import CORS

import json
import smtplib, ssl


app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

# Register our blueprint and it's endpoints on our app

# Endpoint which makes uses `requests`

@app.route('/TimeSheetUser', methods=["GET"])
def timeSheetUserList():
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    timeSheets= timeSheet.find({"status" : { "$in" : [ "Entered"]  }},{"timeSheetId": 1,"status": 1,"FirstName": 1,"LastName": 1,"_id": 0})
    timeSheetDict = dict()
    for timeSheet in timeSheets:
        timeSheetDict[timeSheet["timeSheetId"]]= timeSheet
    return json.dumps(timeSheetDict) 

@app.route('/TimeSheetUserApproved', methods=["GET"])
def timeSheetUserApprovedList():
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    timeSheets= timeSheet.find({"status" : { "$in" : [ "Approved"]  }} ,{"timeSheetId": 1,"status": 1,"FirstName": 1,"LastName": 1,"_id": 0})
    timeSheetDict = dict()
    for timeSheet in timeSheets:
        timeSheetDict[timeSheet["timeSheetId"]]= timeSheet
    print(timeSheetDict)    
    return json.dumps(timeSheetDict)       

@app.route('/TimeSheetUserRejected', methods=["GET"])
def timeSheetUserRejectedList():
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    timeSheets= timeSheet.find({"status" : { "$in" : [ "Rejected"]  }} ,{"timeSheetId": 1,"status": 1,"FirstName": 1,"LastName": 1,"_id": 0})
    timeSheetDict = dict()
    for timeSheet in timeSheets:
        timeSheetDict[timeSheet["timeSheetId"]]= timeSheet
    return json.dumps(timeSheetDict)   


@app.route('/TimeSheetUser/<int:timeSheetId>', methods=["GET"])
def timeSheetUser(timeSheetId):
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    timeSheetFind= timeSheet.find_one({"timeSheetId": timeSheetId}, {"_id": 0, "timeCodes": 0 }  )
    return json.dumps(timeSheetFind)


@app.route('/TimeSheet/Approve/<int:timeSheetId>', methods=["PUT"])
def timeSheetPutApproved(timeSheetId):
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    timeSheetFind= timeSheet.update_one({"timeSheetId": timeSheetId}, {"$set": {"status": "Approved"}})
    timeSheetFind= timeSheet.find_one({"timeSheetId": timeSheetId}, {"_id": 0}  )
    sendEmail('Approved', timeSheetId)
    return json.dumps(timeSheetFind)

@app.route('/TimeSheet/Reject/<int:timeSheetId>', methods=["PUT"])
def timeSheetPutRejected(timeSheetId):
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    timeSheetFind= timeSheet.update_one({"timeSheetId": timeSheetId}, {"$set": {"status": "Rejected"}})
    timeSheetFind= timeSheet.find_one({"timeSheetId": timeSheetId}, {"_id": 0}  )
    sendEmail('Rejected', timeSheetId)
    return json.dumps(timeSheetFind) 

def sendEmail(Action, timesheetId):
    port = 587  # For starttls
    outlook = "smtp-mail.outlook.com"
    sender_email = "aldrichwright@hotmail.com"
    receiver_email = "aldrichwright@hotmail.com"
    file = open('password.txt','r');
    password = file.readline();

    message = "Subject:"+ "Timesheet"+" " + Action + '\n\n'+"TimeSheet Id "+str(timesheetId)+ " "+ Action

    context = ssl.create_default_context();

    outlook = smtplib.SMTP(host='smtp-mail.outlook.com', port=587);
    outlook.ehlo()  # Can be omitted
    outlook.starttls(context=context)
    outlook.ehlo()  # Can be omitted
    outlook.login(sender_email, password)
    outlook.sendmail(sender_email, receiver_email, message)
    outlook.quit()

     
  
@app.route('/TimeSheet/Reset/<int:timeSheetId>', methods=["PUT"])
def timeSheetResetOne(timeSheetId):
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    #timeSheet.update_many({}, {"$set": {"status": "Entered"}} )
    timeSheet.update_one(
    {"timeSheetId": timeSheetId },
        {
            "$set": { "status" : "Entered" }
        }
    )
    sendEmail('Reset back to Entered', timeSheetId)
    return "Reset"

@app.route('/TimeSheet/Reset', methods=["PUT"])
def timeSheetReset():
    client = MongoClient('localhost', 27017)
    db = client['timesheet']
    timeSheet=db['timesheet']
    #timeSheet.update_many({}, {"$set": {"status": "Entered"}} )
    timeSheet.update_many(
    { },
        {
            "$set": { "status" : "Entered" }
        }
    )
    return "Reset"   




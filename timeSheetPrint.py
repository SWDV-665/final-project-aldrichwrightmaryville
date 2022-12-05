from datetime import date
import requests
import sys
import json


def timeSheet():
    print("Print One")
    api_url = "http://localhost:5000//TimeSheetUser/1"
    response = requests.get(api_url)
    timeSheetDict = response.json()
    headerTxt = "Timesheet Id: {:2} First Name: {:15}  Last Name: {:15} Status: {:10}".format(timeSheetDict['timeSheetId'],timeSheetDict['FirstName'], timeSheetDict['LastName'], timeSheetDict['status'])
    print(headerTxt)    


def timeSheetList():
    print("List")
    api_url = "http://localhost:5000//TimeSheetUser"
    response = requests.get(api_url)
    timeSheetDict = response.json()
    for key in timeSheetDict.keys():
        timeSheetDict2 = timeSheetDict[key]
        headerTxt = "Timesheet Id: {:2} First Name: {:15}  Last Name: {:15} Status: {:10}".format(timeSheetDict2['timeSheetId'],timeSheetDict2['FirstName'], timeSheetDict2['LastName'], timeSheetDict2['status'])        
        print(headerTxt)
    print("")
    

def timeSheetApprovedList():
    print("Approved List")
    api_url = "http://localhost:5000//TimeSheetUserApproved"
    response = requests.get(api_url)
    timeSheetDict = response.json()
    for key in timeSheetDict.keys():
        timeSheetDict2 = timeSheetDict[key]
        headerTxt = "Timesheet Id: {:2} First Name: {:15}  Last Name: {:15} Status: {:10}".format(timeSheetDict2['timeSheetId'],timeSheetDict2['FirstName'], timeSheetDict2['LastName'], timeSheetDict2['status'])        
        print(headerTxt)
    print("")

def timeSheetRejectedList():
    print("Rejected List")
    api_url = "http://localhost:5000//TimeSheetUserRejected"
    response = requests.get(api_url)
    timeSheetDict = response.json()
    for key in timeSheetDict.keys():
        timeSheetDict2 = timeSheetDict[key]
        headerTxt = "Timesheet Id: {:2} First Name: {:15}  Last Name: {:15} Status: {:10}".format(timeSheetDict2['timeSheetId'],timeSheetDict2['FirstName'], timeSheetDict2['LastName'], timeSheetDict2['status'])        
        print(headerTxt)
    print("")

def main():
    timeSheetList()
    timeSheetApprovedList()
    timeSheetRejectedList()
    timeSheet()
    
main()
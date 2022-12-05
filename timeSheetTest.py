from datetime import date
import requests
import sys
import json


def testTimeSheetJones():
    api_url = "http://localhost:5000//TimeSheetUser//1"
    response = requests.get(api_url)

    timeSheetDict = response.json()
    assert timeSheetDict['FirstName']== 'Jim'
    assert timeSheetDict['LastName']== 'Jones'
    assert timeSheetDict['status']== 'Entered'
    assert timeSheetDict['timeSheetId']== 1

def testTimeSheetSmith():
    api_url = "http://localhost:5000//TimeSheetUser//2"
    response = requests.get(api_url)

    timeSheetDict = response.json()
    assert timeSheetDict['FirstName']== 'Thomas'
    assert timeSheetDict['LastName']== 'Smith'
    assert timeSheetDict['status']== 'Rejected'
    assert timeSheetDict['timeSheetId']== 2



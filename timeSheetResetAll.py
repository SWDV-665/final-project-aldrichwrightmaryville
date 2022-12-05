from datetime import date
import requests
import sys
import json


def TimeSheetReset():
    api_url = "http://localhost:5000//TimeSheet//Reset"
    response = requests.put(api_url)


def main():
    TimeSheetReset()

main()    
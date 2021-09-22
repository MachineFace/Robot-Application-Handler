# Robot-Application-Handler
This code handles applications for our robot program.

## Author
* Cody Glen

## Table of contents
* [Authors](#authors)
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General Info
This project helps manage student project submissions to the lab, creates email notifications when the status of their project changes. 
	
## Technologies
Project is created with:
* Google Apps-Script
* CLASP version: 2.3.0
	
## Setup
Create Google Forms, Create Google sheets, and paste code into script editor. You'll need to create triggers and point them at the submit and edit functions, and customize the code to get it to do what you want. Make sure to authorize google to be able to have it send emails.

```
$ npm install clasp gulp gulp-cli -G
$ clasp login
$ clasp clone
```

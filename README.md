# ElectronTimeTrackerForTempo
An Electron Based App as a Time Tracker for Tempo/JIRA


This Application is heavily inspired by 

Interface and API by
https://github.com/ArcBees/Tempora

Layout and Usability by
https://github.com/gistia/tempo

Additionally it uses the Oracle JET Framework for the Layout.
http://www.oracle.com/webfolder/technetwork/jet/index.html


I started this project due to the fact that the gistia project is not supporting the reworked API from JIRA. Also I was not satisfied with the other available solutions. I wanted to have something that is easy to use, convenient and fast.

The App is built in Javascript and HTML. It uses the electron framework to provide it as a desktop app. I did not find to many examples, so feel free to use this project as a reference on how to integrate Oracle JET and Electron.

To use the application click on the top right and navigate to settings. Enter your Server URL, Username and password. Now you can select a project, create a JQL Filter and select one or multiple tasks to run a timer on them. You can cancel the timer, stop it, change the time and confirm it. Then the times will be transferred to JIRA.




# Future Improvements
Better Error Management and User Help.
The Timer is shown only in decimals.

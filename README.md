# 3DPrintingApp

This readme will be updated in the future

Bug [@davidli3100]( https://github.com/davidli3100 ) or [@jhthenerd]( https://github.com/jhthenerd ) 
if you see this incomplete / outdated

## Features

- Displays past print requests in descending chronological order
- Timeline based progress indicators on each print so users can quickly track print progress
- Print dialog with file verification and direct access to Firebase Storage
- Everything is hosted on the cloud, and uses custom index queries from Cloud Firestore to structure data
- Implements Google OAuth functionality to allow users to easily log in and save data or create a new user account in our databases

## Implementation
We started our project by designing the main user interface. We used Material UI for the interface, creating a tabbed interface for the desktop, and user icons. We also worked on the backend, which we initially considered implementing by ourselves through another app, but decided that using Firebase for our backend would be simpler and easier to get off the ground. Jason was responsible for implementing the backend hooks, such as pulling and pushing data to and from the server and server configuration. David started with working on the user interface, but also helped out with file uploading, creating the user print feed featureset, and deployment (CI + Heroku Pipeline).

## Technologies
This app was built using React, a JavaScript-based framework, for our front-end.
We used Firebase for our backend, which includes Google OAuth, database hosting, and storage hosting. 
Various other technologies we used include Filepond for uploading and caching files, Material-UI for the user interface, and Heroku for front-end hosting

## Future Plans

1. We had previously created a "Balance" feature, allowing administrators to limit user print usage (filament is expensive). It would've also allowed for reloading of their balance through Stripe and Paypal APIs. 

2. Build out a fully functional admin dashboard that allows admins to view each user's data, update balance, directly download print files and update print status

3. Create a containerized solution that allows other users to use our application for their own use. Would feature free, and paid plans. 

    a. Host our own backend servers with an open GraphQL API 

4. Use Big Data and ML to analyze all user prints and monitor their feedback on print quality to determine optimal print settings based on the end-use of their print or based on how fast a print needs to be completed

5. Develop more CI checks, and make full use of Travis CI and the Heroku pipeline to ensure application stability

## Licensing

The 3D Printing Online Management App does not allow reproduction of any kind for the purposes of commercial usage, non-educational use, or any sort of use outside of an educational facility.

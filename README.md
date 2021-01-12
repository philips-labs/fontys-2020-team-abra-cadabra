# Abra Cadabra - A Questions and Answers Web App
## Table of contents
  - [About the Project](#about-the-project)
  - [Features](#features)
      - [Landingpage](#landingpage)
      - [List of all subjects](#list-of-all-subjects)
      - [Subject page](#subject-page)
      - [Filter questions in a subject](#filter-questions-in-a-subject)
      - [Accounts](#accounts)
      - [Apply for expert](#apply-for-expert)
      - [Answer a question as an expert](#answer-a-question-as-an-expert)
      - [Answer a question as a user](#answer-a-question-as-a-user)
      - [Ask questions in different subjects](#ask-questions-in-different-subjects)
      - [Reporting](#reporting)
      - [Tags](#tags)
      - [Up and down voting](#up-and-down-voting)
      - [Admin dashboard](#admin-dashboard)
      - [Admin ban a user](#admin-ban-a-user)
      - [Admin verify expert requests](#admin-verify-expert-requests)
      - [Admin check out reports](#admin-check-out-reports)
      - [Admin manage subjects](#admin-manage-subjects)
  - [How to run it Locally](#how-to-run-it-locally)
    - [Dev / test accounts](#dev--test-accounts)
      - [Admin](#admin)
      - [Expert](#expert)
      - [Users](#users)
    - [Session](#session)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Set Up for developement](#set-up-for-developement)


## About the Project
This project is in collaboration with **Fontys** and **Phillips**. It's a school project, about making an "ethical" web application, with a question and answers in different subjects. When an user has a question, they can visit our website, create an account and ask their question. Alternatively, they could use the tools we provided to search and filter the questions already asked, in order to find an answer to their question, if it was laready asked. 

Additionally, users can become experts on a subject, if they provide credentials to prove their knowledge. Administrators, manage the approval process through an admin panel, where they can also review flagged questions and answers to determine if they are inappropriate and should be deleted, manage users, subjects and get graphical representation based on statistics of what's popular around the website.

## Features
#### Landingpage
![Landingpage example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/LandingPage.png)
#### List of all subjects
![Subject list example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/SubjectList.gif)
#### Subject page
![Subject page example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/SubjectPage.png)
#### Filter questions in a subject
![Filters example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/Filters.gif)
#### Accounts
![Accounts example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/Accounts.gif)
#### Apply for expert
![Apply for expert example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/ApplyForExpert.gif)
#### Answer a question as an expert
![Answer question expert example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/ExpertAnswer.gif)
#### Answer a question as a user
![Answer question example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AnswerQuestion.gif)
#### Ask questions in different subjects
![Ask question example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AskQuestion.gif)
#### Reporting
![Reporting example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/Reporting.gif)
#### Tags
![Tags example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/Tags.gif)
![Tags in list example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/TagInList.png)
#### Up and down voting
![Voting example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/Voting.gif)
#### Admin dashboard
![Admin dashboard example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AdminDashboardPage.png)
#### Admin ban a user
![Banning example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AdminBanUser.gif)
#### Admin verify expert requests
![Expert request example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AdminExpert.gif)
#### Admin check out reports
![Reports example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AdminReports.gif)
#### Admin manage subjects
![Subject management example](https://github.com/philips-labs/fontys-2020-team-abra-cadabra/blob/master/Abracadabra_Docs/images/AdminSubject.gif)
## How to run it Locally

1. Clone this git repository

2. Create a aspnet cert in the cert folder

```bash
cd Abracadabra
cd certs
dotnet dev-certs https -ep aspnetapp.pfx -p password
```
2. Run the docker compose file
```bash
cd ..
docker-compose build
docker-compose -f docker-compose.yml up -d
```

3. When the docker-compose is up.

>Admin dashboard: http://localhost:3001
>Website: http://localhost:3000
>API URL: https://localhost:5000

### Dev / test accounts
#### Admin
>Email: admin@gmail.com
>Password: Password@1
#### Expert
>Email: expert@gmail.com
>Password: Password@2
#### Users
>Email: user@gmail.com
>Password: Password@0

### Session
If you restart the back-end you should delete your browers local storage since the back-end uses a in memory database for Dev purposes.

## Development
This section is about how to set up the project locally to be ready for development

### Prerequisites
 * An IDE (Recommended Visual Studio and Visual Studio Code)

### Set Up for developement
1. Clone the repository
```bash
git clone https://github.com/philips-labs/fontys-2020-team-abra-cadabra
```
2. Insall dependencies for the Web App and run it
```bash
cd Abracadabra/abracadabra_web_app
npm install
npm run dev
```
3. Insall dependencies for the Admin Panel and run it
```bash
cd Abracadabra/abracadabra_admin_panel
npm install
npm run dev
```
4. Run the API
```bash
cd Abracadabra/AbracadabraAPI/AbracadabraAPI
dotnet run
```
*look at the localhost port presented during the start-up to find the API url*

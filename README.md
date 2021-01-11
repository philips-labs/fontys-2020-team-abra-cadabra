# Abra Cadabra - A Questions and Answers Web App

## About the Project
This project is in collaboration with **Fontys** and **Phillips**. It's a school project, about making an "ethical" web application, with a question and answers in different subjects. When an user has a question, they can visit our website, create an account and ask their question. Alternatively, they could use the tools we provided to search and filter the questions already asked, in order to find an answer to their question, if it was laready asked. 

Additionally, users can become experts on a subject, if they provide credentials to prove their knowledge. Administrators, manage the approval process through an admin panel, where they can also review flagged questions and answers to determine if they are inappropriate and should be deleted, manage users, subjects and get graphical representation based on statistics of what's popular around the website.

## Technologies


## How to Set Up Locally

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

### Set Up
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
# fontys-2020-team-abra-cadabra


## how to setup the project locally

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
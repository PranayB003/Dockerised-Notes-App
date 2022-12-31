# Notes App

This project is a REST API for a simple notes app. It allows users to login, and provides CRUD functionality for the user's notes. The API has been built using Node.js and Express, while MongoDB has been used as the database to store the users and notes. JSON Web Tokens (JWTs) are used to authorise users. The entire application has been containerised using docker.

For the API documentation, please go through [DOCUMENTATION.md](https://github.com/PranayB003/dockerised-rest-api/blob/main/DOCUMENTATION.md).

## Installation

#### Docker

To run this application on your local machine, you must first [install docker](https://docs.docker.com/get-docker/). If you already have docker installed, you can skip this section.

#### Cloning the repository

```bash
git clone https://github.com/PranayB003/dockerised-rest-api.git
```

## Usage

First, change the working directory to the one you just cloned.

```bash
cd dockerised-rest-api
```

Next, bring up the application using the following command (Omit the "-d" flag to view all logs).

```bash
docker-compose up -d
```

This should make the app accessible on your local machine at the port 3000 (localhost:3000).

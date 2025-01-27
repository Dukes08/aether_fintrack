# Aether Fintrack Application

This project consists of a front-end Angular app and a back-end Express app, both running within Docker containers. The following steps will guide you on how to set up and run the application.

## Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/products/docker-desktop) (including Docker Compose)
- [Git](https://git-scm.com/)

## Setup and Running the Application

Follow the steps below to get the application running using Docker:

### 1. Clone the Repository

First, clone the repository to your local machine:

git clone <your-repository-url>
cd <your-project-folder>


### 2. Build and Start the Application Using Docker Compose

Navigate to the root of the project where the docker-compose.yml file is located and run the following command to build and start both the front-end and back-end services:

docker-compose up --build

This command does the following:

Builds Docker images for both the Angular front-end app and the Express back-end app.
Starts the containers for both services.


### 3. Access the Application
Once the containers are up and running, you can access the applications as follows:

Angular Front-end App:
Open a browser and go to http://localhost:4200 to access the Angular application.
Express Back-end App:
The Express app should be running on http://localhost:3001 (or the configured port in the docker-compose.yml file).